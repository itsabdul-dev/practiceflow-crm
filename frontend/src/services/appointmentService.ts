import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Appointment, CreateAppointmentData, UpdateAppointmentData } from '@/types/appointment';

// Fallback initial appointments
let localAppointmentsMemory: Appointment[] = [];

export async function fetchAppointments(): Promise<Appointment[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          patients (id, name, patient_code),
          staff (id, name, role, department)
        `)
        .order('start_time', { ascending: true });

      if (error) {
        console.warn('Supabase fetch error, using local fallback:', error.message);
        return localAppointmentsMemory;
      }

      if (data) {
        return data as Appointment[];
      }
    } catch (e) {
      console.warn('Failed to query Supabase:', e);
    }
  }
  return localAppointmentsMemory;
}

export async function createAppointment(appointmentData: CreateAppointmentData): Promise<Appointment> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert({
          patient_id: appointmentData.patient_id,
          doctor_id: appointmentData.doctor_id,
          start_time: appointmentData.start_time,
          end_time: appointmentData.end_time,
          status: appointmentData.status,
          reason: appointmentData.reason,
        })
        .select(`
          *,
          patients (id, name, patient_code),
          staff (id, name, role, department)
        `)
        .single();

      if (error) {
        console.warn('Supabase insert error:', error.message || error);
      } else if (data) {
        const created = data as Appointment;
        localAppointmentsMemory = [created, ...localAppointmentsMemory];
        return created;
      }
    } catch (e) {
      console.warn('Failed to insert appointment into Supabase:', e);
    }
  }

  // Fallback
  const newAppointment: Appointment = {
    ...appointmentData,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  localAppointmentsMemory = [newAppointment, ...localAppointmentsMemory];
  return newAppointment;
}

export async function updateAppointment(id: string, updates: UpdateAppointmentData): Promise<Appointment | null> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)
        .select(`
          *,
          patients (id, name, patient_code),
          staff (id, name, role, department)
        `)
        .single();
        
      if (error) {
         console.warn('Error updating appointment in Supabase:', error);
      } else if (data) {
         const updated = data as Appointment;
         localAppointmentsMemory = localAppointmentsMemory.map((a) =>
            a.id === id ? updated : a
         );
         return updated;
      }
    } catch (e) {
      console.warn('Error updating appointment in Supabase:', e);
    }
  }

  localAppointmentsMemory = localAppointmentsMemory.map((a) =>
    a.id === id ? { ...a, ...updates, updated_at: new Date().toISOString() } : a
  );
  return localAppointmentsMemory.find((a) => a.id === id) || null;
}

export async function deleteAppointment(id: string): Promise<boolean> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('appointments').delete().eq('id', id);
    } catch (e) {
      console.warn('Error deleting appointment in Supabase:', e);
    }
  }

  localAppointmentsMemory = localAppointmentsMemory.filter((a) => a.id !== id);
  return true;
}
