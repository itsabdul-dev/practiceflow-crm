import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { StaffMember, StaffRole, AccountStatus } from '@/types/staff';

const initialStaff: StaffMember[] = [
  {
    id: 'd1111111-1111-1111-1111-111111111111',
    name: 'Dr. Sarah Smith',
    email: 's.smith@practiceflow.com',
    role: 'Doctor',
    department: 'Internal Medicine',
    status: 'Active',
    joinDate: 'Jan 15, 2023',
    lastActive: '2 mins ago',
  },
  {
    id: 'd2222222-2222-2222-2222-222222222222',
    name: 'Nurse Emily Davis',
    email: 'e.davis@practiceflow.com',
    role: 'Nurse',
    department: 'Pediatrics',
    status: 'Active',
    joinDate: 'Mar 20, 2023',
    lastActive: '15 mins ago',
  },
  {
    id: 'd3333333-3333-3333-3333-333333333333',
    name: 'James Wilson',
    email: 'j.wilson@practiceflow.com',
    role: 'Receptionist',
    department: 'Administration',
    status: 'Active',
    joinDate: 'Jun 10, 2023',
    lastActive: 'Just now',
  },
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    name: 'Dr. Robert Wilson',
    email: 'r.wilson@practiceflow.com',
    role: 'Doctor',
    department: 'Cardiology',
    status: 'Active',
    joinDate: 'Nov 1, 2022',
    lastActive: '1 hour ago',
  },
  {
    id: 'd5555555-5555-5555-5555-555555555555',
    name: 'Dr. Emily Blunt',
    email: 'e.blunt@practiceflow.com',
    role: 'Doctor',
    department: 'Dermatology',
    status: 'On Leave',
    joinDate: 'Feb 1, 2024',
    lastActive: '2 days ago',
  },
];

let localStaffMemory: StaffMember[] = [...initialStaff];

export async function fetchStaffMembers(): Promise<StaffMember[]> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching staff from Supabase:', error);
        return localStaffMemory;
      }

      if (data) {
        return data.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          role: item.role as StaffRole,
          department: item.department,
          status: item.status as AccountStatus,
          joinDate: item.join_date,
          lastActive: item.last_active || 'Just now',
        }));
      }
    } catch (e) {
      console.warn('Error fetching staff from Supabase:', e);
    }
  }
  return localStaffMemory;
}

export async function saveStaffMember(
  data: Omit<StaffMember, 'id' | 'joinDate' | 'lastActive'>,
  editingId?: string
): Promise<StaffMember> {
  if (editingId) {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data: updated, error } = await supabase
          .from('staff')
          .update({
            name: data.name,
            email: data.email,
            role: data.role,
            department: data.department,
            status: data.status,
          })
          .eq('id', editingId)
          .select()
          .single();

        if (error) {
          console.warn('Error updating staff in Supabase:', error.message || error);
        } else if (updated) {
          const result: StaffMember = {
            id: updated.id,
            name: updated.name,
            email: updated.email,
            role: updated.role as StaffRole,
            department: updated.department,
            status: updated.status as AccountStatus,
            joinDate: updated.join_date,
            lastActive: updated.last_active || 'Just now',
          };
          localStaffMemory = localStaffMemory.map((m) => (m.id === editingId ? result : m));
          return result;
        }
      } catch (e) {
        console.warn('Failed to update staff in Supabase, using local fallback:', e);
      }
    }

    // Fallback ONLY for demo mode without Supabase or on network error
    localStaffMemory = localStaffMemory.map((member) =>
      member.id === editingId ? { ...member, ...data } : member
    );
    return localStaffMemory.find((m) => m.id === editingId)!;
  }

  const todayStr = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  if (isSupabaseConfigured && supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from('staff')
        .insert({
          name: data.name,
          email: data.email,
          role: data.role,
          department: data.department,
          status: data.status,
        })
        .select()
        .single();

      if (error) {
        console.warn('Error creating staff in Supabase:', error.message || error);
      } else if (inserted) {
        const result: StaffMember = {
          id: inserted.id,
          name: inserted.name,
          email: inserted.email,
          role: inserted.role as StaffRole,
          department: inserted.department,
          status: inserted.status as AccountStatus,
          joinDate: todayStr,
          lastActive: 'Just now',
        };
        localStaffMemory = [result, ...localStaffMemory];
        return result;
      }
    } catch (e) {
      console.warn('Failed to create staff in Supabase, using local fallback:', e);
    }
  }

  // Fallback ONLY for demo mode without Supabase or on network error
  const newStaff: StaffMember = {
    ...data,
    id: crypto.randomUUID(),
    joinDate: todayStr,
    lastActive: 'Just now',
  };
  localStaffMemory = [newStaff, ...localStaffMemory];
  return newStaff;
}

export async function setStaffStatus(id: string, status: AccountStatus): Promise<void> {
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('staff').update({ status }).eq('id', id);
    } catch (e) {
      console.warn('Error updating staff status in Supabase:', e);
    }
  }

  localStaffMemory = localStaffMemory.map((member) =>
    member.id === id ? { ...member, status } : member
  );
}
