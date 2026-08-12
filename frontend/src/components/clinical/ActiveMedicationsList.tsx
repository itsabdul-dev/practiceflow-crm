import { Pill } from 'lucide-react';
import { Medication } from '@/types/clinical';

interface ActiveMedicationsListProps {
  medications: Medication[];
}

const pillColors = [
  'bg-teal-50 border-teal-200 text-teal-700',
  'bg-blue-50 border-blue-200 text-blue-700',
  'bg-violet-50 border-violet-200 text-violet-700',
  'bg-amber-50 border-amber-200 text-amber-700',
  'bg-rose-50 border-rose-200 text-rose-700',
];

export default function ActiveMedicationsList({ medications }: ActiveMedicationsListProps) {
  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-50">
            <Pill className="h-3.5 w-3.5 text-teal-600" />
          </div>
          <h2 className="text-sm font-semibold text-gray-800">Active Medications</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 uppercase tracking-wider">
          {medications.length} Active
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {medications.map((med, i) => (
          <div
            key={med.id}
            className={`rounded-lg border px-3 py-2.5 transition-colors hover:shadow-sm ${pillColors[i % pillColors.length]}`}
          >
            <p className="text-sm font-semibold">{med.name}</p>
            <p className="text-xs opacity-70 mt-0.5">{med.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}