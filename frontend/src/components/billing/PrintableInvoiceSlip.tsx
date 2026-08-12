import { Invoice } from '@/types/invoice';

interface PrintableInvoiceSlipProps {
  invoice: Invoice;
}

export default function PrintableInvoiceSlip({ invoice }: PrintableInvoiceSlipProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const dueDate = new Date(invoice.due_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-12 text-slate-900 font-sans">
      {/* Header */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-8 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-teal-600 text-white p-2 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 2a2 2 0 0 0-2 2v5H4a2 2 0 0 0-2 2v7c0 1.1.9 2 2 2h4v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h4a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-5V4a2 2 0 0 0-2-2h-6z"/><path d="M15 2v5"/><path d="M9 2v5"/><path d="M9 22v-1"/><path d="M15 22v-1"/><path d="M12 10v4"/><path d="M10 12h4"/></svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">PracticeFlow Clinic</h1>
          </div>
          <p className="text-slate-500 text-sm">14 Medical Boulevard, 3rd Floor</p>
          <p className="text-slate-500 text-sm">Century City, Cape Town, 7441</p>
          <p className="text-slate-500 text-sm">+27 (0)21 555 1234 • billing@practiceflow.co.za</p>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black text-slate-200 tracking-wider uppercase mb-4">Invoice</h2>
          <p className="font-semibold text-slate-800">Invoice #: <span className="font-normal text-slate-600">{invoice.id.split('-')[0].toUpperCase()}</span></p>
          <p className="font-semibold text-slate-800">Date: <span className="font-normal text-slate-600">{currentDate}</span></p>
          <p className="font-semibold text-slate-800">Due Date: <span className="font-normal text-slate-600">{dueDate}</span></p>
        </div>
      </div>

      {/* Bill To */}
      <div className="flex justify-between items-start mb-12">
        <div className="w-1/2 pr-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</h3>
          <p className="text-lg font-bold text-slate-800">{invoice.patients?.name || 'Unknown Patient'}</p>
          <p className="text-slate-600">Patient ID: {invoice.patients?.patient_code}</p>
          <p className="text-slate-600">{invoice.patients?.email}</p>
        </div>
        <div className="w-1/2 pl-4 border-l border-slate-200">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Attending Doctor</h3>
          <p className="text-lg font-bold text-slate-800">{invoice.staff?.name ? `Dr. ${invoice.staff.name.split(' ').pop()}` : 'N/A'}</p>
          <p className="text-slate-600">{invoice.staff?.department || 'General Practice'}</p>
        </div>
      </div>

      {/* Invoice Details Table */}
      <table className="w-full mb-12 border-collapse">
        <thead>
          <tr className="bg-slate-100 text-slate-700 text-sm font-semibold text-left">
            <th className="p-4 border-b-2 border-slate-200 w-3/4 rounded-tl-lg">Description</th>
            <th className="p-4 border-b-2 border-slate-200 w-1/4 text-right rounded-tr-lg">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-4 border-b border-slate-100 text-slate-800">
              <p className="font-semibold">Medical Services Rendered</p>
              {invoice.notes && <p className="text-slate-500 text-sm mt-1">{invoice.notes}</p>}
            </td>
            <td className="p-4 border-b border-slate-100 text-slate-800 text-right font-medium">
              R{invoice.amount.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Totals */}
      <div className="flex justify-end mb-16">
        <div className="w-1/2 max-w-sm">
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Subtotal</span>
            <span className="text-slate-800 font-semibold">R{invoice.amount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-200">
            <span className="text-slate-500 font-medium">Tax</span>
            <span className="text-slate-800 font-semibold">R0.00</span>
          </div>
          <div className="flex justify-between items-center py-4 border-b-2 border-slate-900 mt-2">
            <span className="text-xl font-bold text-slate-900">Total Due</span>
            <span className="text-2xl font-black text-teal-600">R{invoice.amount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Footer / Payment Info */}
      <div className="border-t border-slate-200 pt-8 mt-16 text-center text-sm text-slate-500">
        <p className="font-semibold text-slate-700 mb-2">Thank you for trusting PracticeFlow Clinic with your health!</p>
        <p>Please make checks payable to PracticeFlow Clinic. To pay by credit card, visit our patient portal at portal.practiceflow.com.</p>
        <p className="mt-4 text-xs text-slate-400">If you have any questions concerning this invoice, please contact our billing department.</p>
      </div>
    </div>
  );
}
