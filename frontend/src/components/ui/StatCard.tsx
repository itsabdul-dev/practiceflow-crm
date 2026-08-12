import { LucideIcon, TrendingUp } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subLabel: string;
  trend?: string;
  accentColor?: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  subLabel,
  trend,
  accentColor,
}: StatCardProps) {
  const accent = accentColor || 'teal';
  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    teal: { bg: 'bg-teal-50', text: 'text-teal-600', border: 'border-l-teal-500' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-l-indigo-500' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-l-amber-500' },
    rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-l-rose-500' },
    emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-l-emerald-500' },
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-l-blue-500' },
  };
  const colors = colorMap[accent] || colorMap['teal'];

  return (
    <div className={`card-hover rounded-xl border border-gray-200 border-l-4 ${colors.border} bg-white p-5`}>
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg}`}>
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>
        {trend && (
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-semibold text-emerald-700">
            <TrendingUp className="h-3 w-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900 tracking-tight">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{subLabel}</p>
    </div>
  );
}