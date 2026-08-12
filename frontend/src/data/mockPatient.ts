import { Patient } from '@/types/clinical';

export const mockPatient: Patient = {
  id: 'p1',
  name: 'Jonathan Richards',
  age: 48,
  gender: 'Male',
  patientId: 'PF-9921',
  allergies: ['Penicillin', 'Shellfish'],
  vitals: {
    bloodPressure: '128/84',
    heartRate: '72 bpm',
    temperature: '98.6 °F',
  },
  isActiveEncounter: true,
  medications: [
    { id: 'm1', name: 'Lisinopril 10mg', instructions: 'Once daily' },
    { id: 'm2', name: 'Atorvastatin 20mg', instructions: 'At bedtime' },
    { id: 'm3', name: 'Metformin 500mg', instructions: 'Twice daily with meals' },
  ],
  visitHistory: [
    {
      id: 'v1',
      date: 'Oct 12, 2023',
      type: 'Follow-up',
      diagnosis: 'Hypertension (Controlled)',
      note: 'Patient reports stable energy levels. Blood pressure within target range.',
      providerName: 'Dr. Sarah Smith',
    },
    {
      id: 'v2',
      date: 'Aug 05, 2023',
      type: 'Annual Wellness',
      diagnosis: 'Type 2 Diabetes Mellitus',
      note: 'Comprehensive lab work performed. Adjusted Metformin dosage.',
      providerName: 'Dr. Michael Chen',
    },
    {
      id: 'v3',
      date: 'May 20, 2023',
      type: 'Urgent Care',
      diagnosis: 'Acute Sinusitis',
      note: 'Started 7-day course of Amoxicillin. Symptoms resolved in 5 days.',
      providerName: 'Dr. Sarah Smith',
    },
  ],
};

// Same abstraction pattern as getStaffMembers() — the only function that
// "knows" where patient data comes from. Swap the inside for a real
// Supabase query later; every component that calls this keeps working.
export async function getActivePatient(): Promise<Patient> {
  return mockPatient;
}