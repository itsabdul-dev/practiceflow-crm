import { History } from 'lucide-react';
import { Visit, VisitType } from '@/types/clinical';

interface VisitHistoryTimelineProps {
  visits: Visit[];
  onViewFullRecord: () => void;
}

const visitTypeStyles: Record<VisitType, { dot: string; badge: string }> = {
  'Follow-up': { dot: 'bg-teal-500', badge: 'bg-teal-50 text-teal-700 border-teal-200' },
  'Annual Wellness': { dot: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700 border-blue-200' },
  'Urgent Care': { dot: 'bg-rose-500', badge: 'bg-rose-50 text-rose-700 border-rose-200' },
};

export default function VisitHistoryTimeline({ visits, onViewFullRecord }: VisitHistoryTimelineProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50">
          <History className="h-3.5 w-3.5 text-blue-600" />
        </div>
        <h2 className="text-sm font-semibold text-gray-800">Visit History</h2>
      </div>

      <div className="flex flex-col">
        {visits.length === 0 ? (
          <p className="py-4 text-center text-xs text-gray-400 italic">No visit history on file</p>
        ) : (
          visits.map((visit, index) => {
            const styles = visitTypeStyles[visit.type] || visitTypeStyles['Follow-up'];
            return (
              <div key={visit.id} className="relative pb-5 pl-6 last:pb-0">
                {index !== visits.length - 1 && (
                  <span className="absolute left-[5px] top-3 h-full w-px bg-gray-200" />
                )}
                <span className={`absolute left-0 top-1.5 h-3 w-3 rounded-full border-2 border-white shadow-sm ${styles.dot}`} />

                <div className="mb-0.5 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500">{visit.date}</span>
                  <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${styles.badge}`}>
                    {visit.type}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-800">{visit.diagnosis}</p>
                <p className="mt-0.5 text-xs text-gray-500 leading-relaxed">{visit.note}</p>
                <p className="mt-1 text-[11px] text-gray-400">By {visit.providerName}</p>
              </div>
            );
          })
        )}
      </div>

      <button
        onClick={onViewFullRecord}
        className="mt-3 w-full rounded-lg bg-slate-50 py-2 text-xs font-semibold text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition-colors"
      >
        View Full Medical Record →
      </button>
    </div>
  );
}