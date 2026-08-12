import { StaffRole } from '@/types/staff';

export const roleStyles: Record<StaffRole, string> = {
  Doctor: 'bg-blue-50 text-blue-700',
  Receptionist: 'bg-purple-50 text-purple-700',
  Nurse: 'bg-green-50 text-green-700',
  Admin: 'bg-amber-50 text-amber-700',
};