export type PatientStatus = 'Active' | 'Inactive';

export interface Patient {
  id: string;
  patient_code: string;
  name: string;
  dob: string;
  phone: string;
  email?: string;
  assignedDoctor: string;
  lastVisit: string;
  status: PatientStatus;
}

export interface PatientStats {
  totalPatients: number;
  newRegistrationsLast30Days: number;
  activeProfilesPercent: number;
}
