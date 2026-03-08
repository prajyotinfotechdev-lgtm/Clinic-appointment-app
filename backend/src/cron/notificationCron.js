const cron = require('node-cron');
const notificationService = require('../modules/notifications/service');
const pushService = require('../modules/push/service');
const prisma = require('../config/database');
const logger = require('../config/logger');

/**
 * Format time slot for display (e.g., "14:30" -> "2:30 PM")
 */
function formatTime(timeSlot) {
    const [hours, minutes] = timeSlot.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
}

/**
 * Runs every minute to check for upcoming appointments and send push notifications.
 *
 * Sends push notifications at:
 * - T-1 hour before appointment
 * - T-10 minutes before appointment
 *
 * Also sends SMS reminders at T-1 hour (legacy behavior).
 */
const startNotificationCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const now = new Date();
            const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);
            const tenMinutesLater = new Date(now.getTime() + 10 * 60 * 1000);
            
            const dateStr = now.toISOString().split('T')[0];
            const timeStr1h = oneHourLater.toTimeString().substring(0, 5);
            const timeStr10m = tenMinutesLater.toTimeString().substring(0, 5);

            // ─── 1 Hour Reminder ─────────────────────────────────
            const appointments1h = await prisma.appointment.findMany({
                where: {
                    appointmentDate: new Date(dateStr),
                    timeSlot: timeStr1h,
                    status: 'BOOKED',
                },
                include: {
                    doctor: {
                        select: { name: true },
                    },
                    patient: {
                        select: { id: true, name: true },
                    },
                },
            });

            for (const appt of appointments1h) {
                try {
                    // Send push notification
                    await pushService.sendAppointmentReminder({
                        patientId: appt.patientId,
                        doctorName: appt.doctor.name,
                        appointmentTime: `${formatTime(appt.timeSlot)} today`,
                        appointmentId: appt.id,
                    });

                    // Send SMS if no SMS notification exists (legacy)
                    const hasSms = await prisma.notification.findFirst({
                        where: {
                            appointmentId: appt.id,
                            type: 'SMS',
                        },
                    });

                    if (!hasSms) {
                        await notificationService.sendSmsReminder({
                            patientId: appt.patientId,
                            appointmentId: appt.id,
                        });
                    }

                    logger.info(
                        { appointmentId: appt.id, patientId: appt.patientId },
                        '1-hour reminder sent'
                    );
                } catch (err) {
                    logger.error(
                        { err, appointmentId: appt.id },
                        'Failed to send 1-hour reminder'
                    );
                }
            }

            // ─── 10 Minute Reminder ──────────────────────────────
            const appointments10m = await prisma.appointment.findMany({
                where: {
                    appointmentDate: new Date(dateStr),
                    timeSlot: timeStr10m,
                    status: 'BOOKED',
                },
                include: {
                    doctor: {
                        select: { name: true },
                    },
                    patient: {
                        select: { id: true, name: true },
                    },
                },
            });

            for (const appt of appointments10m) {
                try {
                    await pushService.sendNotification(appt.patientId, {
                        title: 'Upcoming Visit',
                        body: `Your consultation with Dr ${appt.doctor.name} begins in 10 minutes`,
                        icon: '/icon-192x192.png',
                        badge: '/badge-72x72.png',
                        tag: `appointment-${appt.id}-10m`,
                        data: {
                            url: '/patient/appointments',
                            appointmentId: appt.id,
                        },
                        actions: [
                            {
                                action: 'open',
                                title: 'Open App',
                            },
                        ],
                    });

                    logger.info(
                        { appointmentId: appt.id, patientId: appt.patientId },
                        '10-minute reminder sent'
                    );
                } catch (err) {
                    logger.error(
                        { err, appointmentId: appt.id },
                        'Failed to send 10-minute reminder'
                    );
                }
            }

            const totalReminders = appointments1h.length + appointments10m.length;
            if (totalReminders > 0) {
                logger.info(
                    { oneHour: appointments1h.length, tenMinutes: appointments10m.length },
                    'Appointment reminders sent'
                );
            }
        } catch (err) {
            logger.error({ err }, 'Notification cron error');
        }
    });

    logger.info('Notification cron started (every 1 minute)');
};

module.exports = { startNotificationCron };
