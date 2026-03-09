import React, { forwardRef } from "react";

interface ClinicInfo {
  name: string;
  address: string;
  city?: string;
  phone?: string;
}
interface DoctorInfo {
  name: string;
  qualification?: string;
  specialization?: string;
}
interface PatientInfo {
  name: string;
  age?: string | number;
  gender?: string;
  id?: string;
}
interface Medicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

interface PrescriptionPrintTemplateProps {
  clinic: ClinicInfo;
  doctor: DoctorInfo;
  patient: PatientInfo;
  date: string;
  medicines: Medicine[];
  advice?: string[];
}

const PrescriptionPrintTemplate = forwardRef<HTMLDivElement, PrescriptionPrintTemplateProps>(
  (
    { clinic, doctor, patient, date, medicines, advice = [] },
    ref
  ) => (
    <div
      ref={ref}
      className="prescription-print-template"
      style={{
        fontFamily: 'Inter, Arial, sans-serif',
        background: '#fff',
        color: '#222',
        width: '210mm',
        minHeight: '297mm',
        maxWidth: '210mm',
        margin: '0 auto',
        padding: '40px 40px 60px 40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        position: 'relative',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
        <div>
          <div style={{ fontWeight: 800, fontSize: 24, letterSpacing: '-1px', color: '#065f46', textTransform: 'uppercase' }}>{clinic.name}</div>
          <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>{clinic.address}</div>
          {clinic.city && <div style={{ fontSize: 14, color: '#555' }}>{clinic.city}</div>}
          {clinic.phone && <div style={{ fontSize: 14, color: '#555' }}>Phone: {clinic.phone}</div>}
        </div>
        <div style={{ textAlign: 'right', fontSize: 14, color: '#333', minWidth: 140 }}>
          Date: <span style={{ fontWeight: 600 }}>{date}</span>
        </div>
      </div>
      {/* Patient Info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 28 }}>
        <div style={{ fontSize: 15, fontWeight: 600, color: '#222', lineHeight: 1.7 }}>
          Patient Name: <span style={{ fontWeight: 700 }}>{patient.name}</span><br />
          {patient.age !== undefined && <>Age: <span style={{ fontWeight: 500 }}>{patient.age}</span><br /></>}
          {patient.gender && <>Gender: <span style={{ fontWeight: 500 }}>{patient.gender}</span><br /></>}
        </div>
        {patient.id && (
          <div style={{ fontSize: 14, color: '#666', textAlign: 'right', minWidth: 110 }}>
            Patient ID: <span style={{ fontWeight: 600 }}>{patient.id}</span>
          </div>
        )}
      </div>
      {/* Prescription Title */}
      <div style={{ textAlign: 'center', marginBottom: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.5px', color: '#03543f' }}>Prescription</div>
        <div style={{ height: 2, background: '#e5e7eb', margin: '14px auto 0', width: '60%' }} />
      </div>
      {/* Medicines */}
      <div style={{ margin: '32px 0 24px 0' }}>
        {medicines.map((med, idx) => (
          <div key={idx} style={{ marginBottom: 18, fontSize: 16, color: '#222', lineHeight: 1.7 }}>
            <span style={{ fontWeight: 700, marginRight: 8 }}>{idx + 1}.</span>
            <span style={{ fontWeight: 700 }}>{med.name}</span>
            {med.dosage && <span style={{ marginLeft: 8, color: '#444' }}>{med.dosage}</span>}
            <br />
            <span style={{ fontSize: 15, color: '#444' }}>
              {med.instructions ? med.instructions : `Take ${med.frequency} for ${med.duration}`}
            </span>
          </div>
        ))}
      </div>
      {/* Advice Section */}
      {advice.length > 0 && (
        <div style={{ marginBottom: 38 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: '#b45309', marginBottom: 6 }}>Advice:</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: '#b45309', fontSize: 15 }}>
            {advice.map((ad, idx) => (
              <li key={idx} style={{ marginBottom: 2 }}>{ad}</li>
            ))}
          </ul>
        </div>
      )}
      {/* Doctor Signature Section */}
      <div style={{ position: 'absolute', right: 40, bottom: 60, textAlign: 'right' }}>
        <div style={{ fontWeight: 700, fontSize: 16, color: '#065f46' }}>Dr. {doctor.name}</div>
        {doctor.qualification && <div style={{ fontSize: 14, color: '#333' }}>{doctor.qualification}</div>}
        {doctor.specialization && <div style={{ fontSize: 14, color: '#333' }}>{doctor.specialization}</div>}
        <div style={{ marginTop: 24, fontSize: 13, color: '#666', fontStyle: 'italic' }}>Signature</div>
      </div>
      {/* Print CSS */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          .prescription-print-template, .prescription-print-template * {
            visibility: visible !important;
          }
          .prescription-print-template {
            position: absolute !important;
            left: 0; top: 0; width: 210mm; min-height: 297mm; background: #fff;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 40px 40px 60px 40px !important;
            z-index: 999999 !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
);

export default PrescriptionPrintTemplate;
