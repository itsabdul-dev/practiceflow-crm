import NoteHeader from './NoteHeader';
import SoapSection from './SoapSection';
import { SoapNote } from '@/types/clinical';

interface ClinicalNoteEditorProps {
  sessionDate: string;
  note: SoapNote;
  onChange: (key: keyof SoapNote, value: string) => void;
  attachedLabCount: number;
  onAttachLabsClick: () => void;
  onTemplatesClick: () => void;
}

const soapSections: {
  key: keyof SoapNote;
  label: string;
  dotColorClass: string;
  placeholder: string;
}[] = [
  {
    key: 'subjective',
    label: 'Subjective',
    dotColorClass: 'bg-blue-500',
    placeholder: "Patient's reported symptoms and concerns...",
  },
  {
    key: 'objective',
    label: 'Objective',
    dotColorClass: 'bg-green-500',
    placeholder: 'Physical exam findings, observation, vitals results...',
  },
  {
    key: 'assessment',
    label: 'Assessment',
    dotColorClass: 'bg-purple-500',
    placeholder: 'Clinical diagnosis and interpretation of findings...',
  },
  {
    key: 'plan',
    label: 'Plan',
    dotColorClass: 'bg-orange-500',
    placeholder: 'Next steps, follow-up instructions, and patient education...',
  },
];

export default function ClinicalNoteEditor({
  sessionDate,
  note,
  onChange,
  attachedLabCount,
  onAttachLabsClick,
  onTemplatesClick,
}: ClinicalNoteEditorProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <NoteHeader
        sessionDate={sessionDate}
        attachedLabCount={attachedLabCount}
        onAttachLabsClick={onAttachLabsClick}
        onTemplatesClick={onTemplatesClick}
      />
      {soapSections.map((section) => (
        <SoapSection
          key={section.key}
          label={section.label}
          dotColorClass={section.dotColorClass}
          placeholder={section.placeholder}
          value={note[section.key]}
          onChange={(value) => onChange(section.key, value)}
        />
      ))}
    </div>
  );
}