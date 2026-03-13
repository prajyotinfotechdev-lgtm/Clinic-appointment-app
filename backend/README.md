# Backend - Clinic Appointment System

## Overview
Complete Node.js backend API for the clinic appointment management system with authentication, appointments, prescriptions, and notifications.

## Features
- JWT-based authentication system
- Multi-role support (Doctor, Patient, Receptionist)
- Appointment booking and management
- Prescription management
- Push notifications
- Database with Prisma ORM
- API rate limiting and security

## Setup
```bash
npm install
cp .env.example .env
# Configure .env with your database and other settings
npx prisma migrate dev
npx prisma generate
npm run dev
```

## API Endpoints
- `/auth` - Authentication routes
- `/appointments` - Appointment management
- `/patients` - Patient management
- `/doctors` - Doctor management
- `/prescriptions` - Prescription management
- `/notifications` - Notification system

## Database
- Uses PostgreSQL with Prisma ORM
- Includes migrations for all tables
- Seed data available for testing

## Security
- JWT authentication
- Role-based access control
- Input validation and sanitization
- Rate limiting
- CORS configuration
