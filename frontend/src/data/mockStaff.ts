import { StaffMember } from '@/types/staff';

export const mockStaff: StaffMember[] = [
  {
    id: '1',
    name: 'Dr. Michael Chen',
    email: 'm.chen@practiceflow.com',
    role: 'Doctor',
    status: 'Active',
    joinDate: 'Mar 15, 2022',
    lastActive: '2 mins ago',
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    email: 's.jenkins@practiceflow.com',
    role: 'Receptionist',
    status: 'Active',
    joinDate: 'Nov 2, 2021',
    lastActive: '1 hour ago',
  },
  {
    id: '3',
    name: 'Dr. Elena Rodriguez',
    email: 'e.rodriguez@practiceflow.com',
    role: 'Doctor',
    status: 'On Leave',
    joinDate: 'May 20, 2020',
    lastActive: '2 days ago',
  },
  {
    id: '4',
    name: 'James Wilson',
    email: 'j.wilson@practiceflow.com',
    role: 'Nurse',
    status: 'Active',
    joinDate: 'Jan 10, 2023',
    lastActive: '15 mins ago',
  },
  {
    id: '5',
    name: 'Linda Thompson',
    email: 'l.thompson@practiceflow.com',
    role: 'Admin',
    status: 'Inactive',
    joinDate: 'Aug 14, 2019',
    lastActive: '3 weeks ago',
  },
];

// This is the ONLY function that "knows" where staff data comes from.
// Right now it returns the mock array. When Supabase is ready, you rewrite
// the INSIDE of this function to run a real query — every component that
// calls getStaffMembers() keeps working with zero changes.
export async function getStaffMembers(): Promise<StaffMember[]> {
  return mockStaff;
}