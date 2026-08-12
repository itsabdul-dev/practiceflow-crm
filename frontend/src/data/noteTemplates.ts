import { SoapNote } from '@/types/clinical';

export interface NoteTemplate {
  id: string;
  name: string;
  description: string;
  content: SoapNote;
}

export const noteTemplates: NoteTemplate[] = [
  {
    id: 't1',
    name: 'Annual Wellness Visit',
    description: 'Standard template for routine annual checkups',
    content: {
      subjective: 'Patient presents for annual wellness exam. No acute complaints reported.',
      objective: 'Vitals within normal limits. Physical exam unremarkable.',
      assessment: 'Patient in good general health.',
      plan: 'Continue current medications. Routine labs ordered. Follow up in 12 months.',
    },
  },
  {
    id: 't2',
    name: 'Hypertension Follow-up',
    description: 'Template for routine blood pressure management visits',
    content: {
      subjective: 'Patient reports adherence to antihypertensive medication. Denies headache, chest pain, or dizziness.',
      objective: 'Blood pressure measured and recorded. Cardiovascular exam unremarkable.',
      assessment: 'Hypertension, controlled on current regimen.',
      plan: 'Continue current antihypertensive therapy. Recheck blood pressure in 3 months.',
    },
  },
  {
    id: 't3',
    name: 'Acute Illness Visit',
    description: 'Template for cold, flu, or minor acute complaints',
    content: {
      subjective: 'Patient reports onset of symptoms within the last few days.',
      objective: 'Vitals reviewed. Focused exam performed based on presenting complaint.',
      assessment: 'Acute, self-limited illness likely.',
      plan: 'Symptomatic treatment recommended. Return if symptoms worsen or persist beyond 7-10 days.',
    },
  },
];