interface PaginationFooterProps {
  rangeStart: number;
  rangeEnd: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

export default function PaginationFooter({
  rangeStart,
  rangeEnd,
  total,
  onPrevious,
  onNext,
  canGoPrevious,
  canGoNext,
}: PaginationFooterProps) {
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-gray-500">
        Showing <span className="font-medium text-gray-700">{rangeStart}-{rangeEnd}</span> of{' '}
        <span className="font-medium text-gray-700">{total}</span> staff
      </p>
      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}