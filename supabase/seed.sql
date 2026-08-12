-- Seed initial staff members
INSERT INTO public.staff (id, name, email, role, department, status, join_date, last_active) VALUES
('d1111111-1111-1111-1111-111111111111', 'Dr. Sarah Smith', 's.smith@practiceflow.com', 'Physician', 'Internal Medicine', 'Active', '2023-01-15', '2 mins ago'),
('d2222222-2222-2222-2222-222222222222', 'Nurse Emily Davis', 'e.davis@practiceflow.com', 'Nurse', 'Pediatrics', 'Active', '2023-03-20', '15 mins ago'),
('d3333333-3333-3333-3333-333333333333', 'James Wilson', 'j.wilson@practiceflow.com', 'Receptionist', 'Administration', 'Active', '2023-06-10', 'Just now'),
('d4444444-4444-4444-4444-444444444444', 'Dr. Robert Wilson', 'r.wilson@practiceflow.com', 'Physician', 'Cardiology', 'Active', '2022-11-01', '1 hour ago'),
('d5555555-5555-5555-5555-555555555555', 'Dr. Emily Blunt', 'e.blunt@practiceflow.com', 'Physician', 'Dermatology', 'On Leave', '2024-02-01', '2 days ago')
ON CONFLICT (email) DO NOTHING;

-- Seed initial patients (using valid hexadecimal 36-char UUIDs)
INSERT INTO public.patients (id, patient_code, name, dob, phone, email, assigned_doctor, status, last_visit) VALUES
('11111111-1111-1111-1111-111111111111', 'PT-10024', 'Sarah Jenkins', '1988-04-12', '(555) 234-5678', 's.jenkins@example.com', 'Dr. Sarah Smith', 'Active', '2026-04-28'),
('22222222-2222-2222-2222-222222222222', 'PT-10025', 'Marcus Chen', '1975-09-23', '(555) 876-5432', 'm.chen@example.com', 'Dr. Robert Wilson', 'Active', '2026-04-15'),
('33333333-3333-3333-3333-333333333333', 'PT-10026', 'Elena Rostova', '1992-11-05', '(555) 345-6789', 'e.rostova@example.com', 'Dr. Emily Blunt', 'Inactive', '2026-03-10'),
('44444444-4444-4444-4444-444444444444', 'PT-10027', 'David Miller', '1961-02-18', '(555) 901-2345', 'd.miller@example.com', 'Dr. Sarah Smith', 'Active', '2026-04-20')
ON CONFLICT (patient_code) DO NOTHING;

-- Seed sample medications for Sarah Jenkins
INSERT INTO public.medications (patient_id, name, dosage, frequency, status) VALUES
('11111111-1111-1111-1111-111111111111', 'Lisinopril', '10mg', 'Once daily', 'Active'),
('11111111-1111-1111-1111-111111111111', 'Metformin', '500mg', 'Twice daily with meals', 'Active'),
('11111111-1111-1111-1111-111111111111', 'Atorvastatin', '20mg', 'Once daily at bedtime', 'Active');

-- Seed visit history for Sarah Jenkins
INSERT INTO public.visit_history (patient_id, visit_date, reason, provider, status) VALUES
('11111111-1111-1111-1111-111111111111', '2026-04-28', 'Routine Hypertension Follow-up', 'Dr. Sarah Smith', 'Completed'),
('11111111-1111-1111-1111-111111111111', '2026-01-14', 'Annual Wellness Exam & Bloodwork', 'Dr. Sarah Smith', 'Completed'),
('11111111-1111-1111-1111-111111111111', '2025-10-02', 'Medication Refill Consultation', 'Nurse Emily Davis', 'Completed');

-- Seed clinical SOAP note for Sarah Jenkins
INSERT INTO public.clinical_notes (patient_id, session_date, subjective, objective, assessment, plan) VALUES
('11111111-1111-1111-1111-111111111111', '2026-04-28',
'Patient presents for 3-month follow-up of essential hypertension. Reports feeling well without headache, dizziness, or chest pain. Adhering to Lisinopril 10mg daily.',
'BP: 124/82 mmHg, HR: 72 bpm, Temp: 98.4 F, SpO2: 99% on room air. Heart: RRR, no murmurs. Lungs: Clear to auscultation bilaterally.',
'1. Essential hypertension - well controlled on current regimen. 2. Type 2 Diabetes - stable.',
'1. Continue Lisinopril 10mg PO daily. 2. Continue Metformin 500mg PO BID. 3. Recheck BMP and HbA1c in 3 months. 4. Follow-up visit in 3 months.');
