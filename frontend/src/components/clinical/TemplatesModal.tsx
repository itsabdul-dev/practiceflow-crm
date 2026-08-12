import Modal from '@/components/ui/Modal';
import { noteTemplates } from '@/data/noteTemplates';
import { SoapNote } from '@/types/clinical';

interface TemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (content: SoapNote) => void;
}

export default function TemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: TemplatesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Choose a Template">
      <div className="flex flex-col gap-2">
        {noteTemplates.map((template) => (
          <button
            key={template.id}
            onClick={() => {
              onSelectTemplate(template.content);
              onClose();
            }}
            className="rounded-lg border border-gray-200 p-3 text-left hover:border-blue-300 hover:bg-blue-50"
          >
            <p className="text-sm font-semibold text-gray-800">{template.name}</p>
            <p className="text-xs text-gray-500">{template.description}</p>
          </button>
        ))}
      </div>
    </Modal>
  );
}