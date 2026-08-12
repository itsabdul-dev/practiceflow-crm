import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Patient, PatientStatus } from '@/types/patient';

// Fallback initial patient dataset
const initialPatients: Patient[] = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    patient_code: 'PT-10024',
    name: 'Jenkins, Sarah',
    dob: '1988-04-12',
    phone: '(555) 234-5678',
    email: 's.jenkins@example.com',
    assignedDoctor: 'Dr. Sarah Smith',
    lastVisit: '2026-04-28',
    status: 'Active',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    patient_code: 'PT-10025',
    name: 'Chen, Marcus',
    dob: '1975-09-23',
    phone: '(555) 876-5432',
    email: 'm.chen@example.com',
    assignedDoctor: 'Dr. Robert Wilson',
    lastVisit: '2026-04-15',
    status: 'Active',
  },
  {
    id: '33333333-3333-3333-3333-333333333333',
    patient_code: 'PT-10026',
    name: 'Rostova, Elena',
    dob: '1992-11-05',
    phone: '(555) 345-6789',
    email: 'e.rostova@example.com',
    assignedDoctor: 'Dr. Emily Blunt',
    lastVisit: '2026-03-10',
    status: 'Inactive',
  },
  {
    id: '44444444-4444-4444-4444-444444444444',
    patient_code: 'PT-10027',
    name: 'Miller, David',
    dob: '1961-02-18',
    phone: '(555) 901-2345',
    email: 'd.miller@example.com',
    assignedDoctor: 'Dr. Sarah Smith',
    lastVisit: '2026-04-20',
    status: 'Active',
  },
];

let localPatientsMemory: Patient[] = [...initialPatients];

export async function fetchPatients(): Promise<Patient[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('patients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Supabase fetch error, using local fallback:', error.message);
        return localPatientsMemory;
      }

      if (data) {
        return data.map((item) => ({
          id: item.id,
          patient_code: item.patient_code || item.id.slice(0, 8),
          name: item.name,
          dob: item.dob,
          phone: item.phone,
          email: item.email,
          assignedDoctor: item.assigned_doctor,
          lastVisit: item.last_visit,
          status: item.status as PatientStatus,
        }));
      }
    } catch (e) {
      console.warn('Failed to query Supabase:', e);
    }
  }
  return localPatientsMemory;
}

export async function createPatient(patientData: Omit<Patient, 'id' | 'patient_code'>): Promise<Patient> {
  if (isSupabaseConfigured && supabase) {
    try {
      // Generate a unique patient code by querying the highest existing numeric code from Supabase
      const { data: existingCodes } = await supabase
        .from('patients')
        .select('patient_code')
        .like('patient_code', 'PT-%')
        .order('patient_code', { ascending: false });

      let nextNum = 10001;
      if (existingCodes && existingCodes.length > 0) {
        const nums = existingCodes
          .map((r: { patient_code: string }) => parseInt(r.patient_code.replace('PT-', ''), 10))
          .filter((n: number) => !isNaN(n));
        if (nums.length > 0) {
          nextNum = Math.max(...nums) + 1;
        }
      }
      const patient_code = `PT-${nextNum}`;

      const { data, error } = await supabase
        .from('patients')
        .insert({
          patient_code,
          name: patientData.name,
          dob: patientData.dob,
          phone: patientData.phone,
          email: patientData.email,
          assigned_doctor: patientData.assignedDoctor,
          status: patientData.status,
          last_visit: patientData.lastVisit || new Date().toISOString().slice(0, 10),
        })
        .select()
        .single();

      if (error) {
        console.warn('Supabase insert error, using local fallback:', error.message || error);
      } else if (data) {
        const created: Patient = {
          id: data.id,
          patient_code: data.patient_code,
          name: data.name,
          dob: data.dob,
          phone: data.phone,
          email: data.email,
          assignedDoctor: data.assigned_doctor,
          lastVisit: data.last_visit,
          status: data.status as PatientStatus,
        };
        // Keep local memory in sync
        if (!localPatientsMemory.some((p) => p.id === created.id)) {
          localPatientsMemory = [created, ...localPatientsMemory];
        }
        return created;
      }
    } catch (e) {
      console.warn('Failed to insert patient into Supabase, using local fallback:', e);
    }
  }

  // Fallback for demo mode (no Supabase) or network failure
  const fallbackNum = 10028 + localPatientsMemory.length;
  const patient_code = `PT-${fallbackNum}`;
  const newPatient: Patient = {
    ...patientData,
    id: crypto.randomUUID(),
    patient_code,
  };
  localPatientsMemory = [newPatient, ...localPatientsMemory];
  return newPatient;
}

export async function updatePatient(id: string, updates: Partial<Patient>): Promise<Patient | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const payload: Record<string, unknown> = {};
      if (updates.name) payload.name = updates.name;
      if (updates.dob) payload.dob = updates.dob;
      if (updates.phone) payload.phone = updates.phone;
      if (updates.email) payload.email = updates.email;
      if (updates.assignedDoctor) payload.assigned_doctor = updates.assignedDoctor;
      if (updates.status) payload.status = updates.status;

      await supabase.from('patients').update(payload).eq('id', id);
    } catch (e) {
      console.warn('Error updating patient in Supabase:', e);
    }
  }

  localPatientsMemory = localPatientsMemory.map((p) =>
    p.id === id ? { ...p, ...updates } : p
  );
  return localPatientsMemory.find((p) => p.id === id) || null;
}

export async function deletePatient(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('patients').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting patient in Supabase:', e);
    }
  }

  localPatientsMemory = localPatientsMemory.filter((p) => p.id !== id);
  return true;
}
