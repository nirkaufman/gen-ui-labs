import { Brain } from 'lucide-react';

interface ThinkingStepProps {
  content: string;
}

export function ThinkingStep({ content }: ThinkingStepProps) {
  return (
    <div className="my-3 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400 shadow-sm">
      <div className="flex items-start gap-3">
        <Brain className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="font-semibold text-blue-800 text-sm mb-1">Thinking</div>
          <p className="text-blue-700 text-sm leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}