import { Users, ShieldCheck, UsersRound, Settings } from 'lucide-react';
import StatCard from '@/components/ui/StatCard';
import { StaffMember } from '@/types/staff';

interface StaffStatsGridProps {
  staff: StaffMember[];
}

export default function StaffStatsGrid({ staff }: StaffStatsGridProps) {
  const totalStaff = staff.length;
  const activeDoctors = staff.filter((s) => s.role === 'Doctor' && s.status === 'Active').length;
  const supportTeam = staff.filter(
    (s) => (s.role === 'Nurse' || s.role === 'Receptionist') && s.status === 'Active'
  ).length;
  const systemAdmins = staff.filter((s) => s.role === 'Admin' || s.department === 'Administration').length;


  const stats = [
    {
      icon: Users,
      label: 'Total Staff',
      value: totalStaff,
      subLabel: 'Current roster size',
      accentColor: 'teal',
    },
    {
      icon: ShieldCheck,
      label: 'Active Doctors',
      value: activeDoctors,
      subLabel: 'Full clinical capacity',
      accentColor: 'indigo',
    },
    {
      icon: UsersRound,
      label: 'Support Team',
      value: supportTeam,
      subLabel: 'Receptionists & Nurses',
      accentColor: 'emerald',
    },
    {
      icon: Settings,
      label: 'System Admins',
      value: systemAdmins,
      subLabel: 'Administrative access',
      accentColor: 'amber',
    },
  ];

  return (
    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}