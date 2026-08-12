import { StaffMember } from '@/types/staff';
import StaffTableRow from './StaffTableRow';

interface StaffTableProps {
  staff: StaffMember[];
  onEdit: (staff: StaffMember) => void;
  onDeactivate: (staff: StaffMember) => void;
}

const headers = ['Staff Member', 'Role', 'Account Status', 'Join Date', 'Last Active', 'Actions'];

export default function StaffTable({ staff, onEdit, onDeactivate }: StaffTableProps) {
  if (staff.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-gray-400">
        No staff members match your filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-left text-xs font-medium uppercase tracking-wide text-gray-400">
            {headers.map((header) => (
              <th key={header} className="pb-3 pr-4 font-medium last:text-right">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <StaffTableRow
              key={member.id}
              staff={member}
              onEdit={onEdit}
              onDeactivate={onDeactivate}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}