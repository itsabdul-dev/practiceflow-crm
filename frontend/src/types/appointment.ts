import { Patient } from './patient';
import { Staff } from './staff';

export type AppointmentStatus = 'Scheduled' | 'Completed' | 'Cancelled' | 'No Show';

export interface Appointment {
  id: string;
  patient_id: string;
  doctor_id: string;
  start_time: string;
  end_time: string;
  status: AppointmentStatus;
  reason?: string;
  created_at: string;
  updated_at: string;
  
  // Joined fields
  patients?: Pick<Patient, 'id' | 'name' | 'patient_code'>;
  staff?: Pick<Staff, 'id' | 'name' | 'role' | 'department'>;
}

export type CreateAppointmentData = Omit<Appointment, 'id' | 'created_at' | 'updated_at' | 'patients' | 'staff'>;
export type UpdateAppointmentData = Partial<CreateAppointmentData>;
