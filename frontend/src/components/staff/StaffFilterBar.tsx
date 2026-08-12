'use client';

import { Search, SlidersHorizontal } from 'lucide-react';
import { StaffRole, AccountStatus } from '@/types/staff';

interface StaffFilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: StaffRole | 'All Roles';
  onRoleFilterChange: (value: StaffRole | 'All Roles') => void;
  statusFilter: AccountStatus | 'All Statuses';
  onStatusFilterChange: (value: AccountStatus | 'All Statuses') => void;
}

const roles: (StaffRole | 'All Roles')[] = [
  'All Roles',
  'Doctor',
  'Nurse',
  'Receptionist',
  'Admin',
];
const statuses: (AccountStatus | 'All Statuses')[] = [
  'All Statuses',
  'Active',
  'On Leave',
  'Inactive',
];

export default function StaffFilterBar({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
}: StaffFilterBarProps) {
  return (
    <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
      <div className="relative flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-10 pr-4 text-sm input-focus"
        />
      </div>

      <select
        value={roleFilter}
        onChange={(e) => onRoleFilterChange(e.target.value as StaffRole | 'All Roles')}
        className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm text-gray-700 input-focus"
      >
        {roles.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <select
        value={statusFilter}
        onChange={(e) =>
          onStatusFilterChange(e.target.value as AccountStatus | 'All Statuses')
        }
        className="rounded-xl border border-gray-200 bg-gray-50/50 px-3 py-2 text-sm text-gray-700 input-focus"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <button
        aria-label="More filters"
        className="rounded-xl border border-gray-200 p-2.5 text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors"
      >
        <SlidersHorizontal className="h-4 w-4" />
      </button>
    </div>
  );
}