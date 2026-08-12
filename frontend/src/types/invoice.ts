import { Patient } from './patient';
import { Staff } from './staff';

export type InvoiceStatus = 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';

export interface Invoice {
  id: string;
  patient_id: string;
  doctor_id?: string;
  appointment_id?: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string; // ISO format date string
  notes?: string;
  created_at?: string;
  updated_at?: string;
  
  // Joined fields
  patients?: Pick<Patient, 'id' | 'name' | 'patient_code' | 'email'>;
  staff?: Pick<Staff, 'id' | 'name' | 'role' | 'department'>;
}

export interface CreateInvoiceData {
  patient_id: string;
  doctor_id?: string;
  appointment_id?: string;
  amount: number;
  status: InvoiceStatus;
  due_date: string;
  notes?: string;
}
