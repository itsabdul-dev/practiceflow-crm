interface SoapSectionProps {
  label: string;
  dotColorClass: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const labelColors: Record<string, string> = {
  'bg-blue-500': 'text-blue-600',
  'bg-green-500': 'text-emerald-600',
  'bg-purple-500': 'text-purple-600',
  'bg-orange-500': 'text-amber-600',
};

export default function SoapSection({
  label,
  dotColorClass,
  placeholder,
  value,
  onChange,
}: SoapSectionProps) {
  const charCount = value.length;
  const labelColor = labelColors[dotColorClass] || 'text-gray-500';

  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${dotColorClass}`} />
          <span className={`text-xs font-bold uppercase tracking-wider ${labelColor}`}>
            {label}
          </span>
        </div>
        {charCount > 0 && (
          <span className="text-[10px] text-gray-400 font-medium">{charCount} chars</span>
        )}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 p-3 text-sm text-gray-700 placeholder:text-gray-400 input-focus transition-colors hover:border-gray-300"
      />
    </div>
  );
}