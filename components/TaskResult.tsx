import { CheckCircle } from 'lucide-react';

interface TaskResultProps {
  content: string;
}

export function TaskResult({ content}: TaskResultProps) {
  return (
    <div className={`bg-gradient-to-br from-green-50 to-green-100 border-green-200 border p-4 rounded-lg shadow-sm`}>
      <div className="flex items-center gap-3">
        <CheckCircle className="w-6 h-6 text-green-500" />;
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">Task Completed</h3>
          <p className="text-gray-600 text-sm mt-1">{content}</p>
        </div>
      </div>
    </div>
  );
}
