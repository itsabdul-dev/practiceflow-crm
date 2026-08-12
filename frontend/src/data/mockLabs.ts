export interface LabResult {
  id: string;
  name: string;
  date: string;
}

export const availableLabs: LabResult[] = [
  { id: 'l1', name: 'Comprehensive Metabolic Panel', date: 'Oct 10, 2023' },
  { id: 'l2', name: 'Lipid Panel', date: 'Oct 10, 2023' },
  { id: 'l3', name: 'HbA1c', date: 'Aug 02, 2023' },
  { id: 'l4', name: 'Complete Blood Count', date: 'Aug 02, 2023' },
];