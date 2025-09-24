import { Play } from 'lucide-react';

interface ActionStepProps {
  content: string;
}

export function ActionStep({ content }: ActionStepProps) {
  return (
    <div className="my-3 bg-green-50 p-4 rounded-lg border-l-4 border-green-400 shadow-sm">
      <div className="flex items-start gap-3">
        <Play className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-semibold text-green-800 text-sm mb-1">Action</div>
          <p className="text-green-700 text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}