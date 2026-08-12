import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { AccountStatus } from '@/types/staff';
import Badge from '@/components/ui/Badge';

interface Props {
  status: AccountStatus;
}

export default function AccountStatusIndicator({ status }: Props) {
  if (status === 'Inactive') {
    return (
      <Badge className="bg-red-500 text-white">
        <AlertCircle className="h-3 w-3" />
        Inactive
      </Badge>
    );
  }

  const isActive = status === 'Active';
  const Icon = isActive ? CheckCircle2 : Clock;

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-sm ${
        isActive ? 'text-green-600' : 'text-amber-600'
      }`}
    >
      <Icon className="h-4 w-4" />
      {status}
    </span>
  );
}