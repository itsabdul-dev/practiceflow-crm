import { UserPlus, Download } from 'lucide-react';

interface StaffPageHeaderProps {
  onAddClick: () => void;
  onExportClick?: () => void;
}

export default function StaffPageHeader({ onAddClick, onExportClick }: StaffPageHeaderProps) {
  return (
    <div className="mb-6 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Staff Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Oversee your medical team, manage roles, and track account activity.
        </p>
      </div>
      <div className="flex items-center gap-3">
        {onExportClick && (
          <button
            onClick={onExportClick}
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-all card-hover"
          >
            <Download className="h-4 w-4" />
            Export Data
          </button>
        )}
        <button
          onClick={onAddClick}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-teal-700 hover:to-emerald-700 transition-all"
        >
          <UserPlus className="h-4 w-4" />
          Add Staff Member
        </button>
      </div>
    </div>
  );
}