import { CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface TaskResultProps {
  title: string;
  status: 'completed' | 'in_progress' | 'failed';
  description: string;
  duration?: string;
}

export function TaskResult({ title, status, description, duration }: TaskResultProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'in_progress':
        return <Clock className="w-6 h-6 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'from-green-50 to-green-100 border-green-200';
      case 'in_progress':
        return 'from-yellow-50 to-yellow-100 border-yellow-200';
      case 'failed':
        return 'from-red-50 to-red-100 border-red-200';
    }
  };

  return (
    <div className={`bg-gradient-to-br ${getStatusColor()} border p-4 rounded-lg shadow-sm`}>
      <div className="flex items-center gap-3">
        {getStatusIcon()}
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
          {duration && (
            <p className="text-gray-500 text-xs mt-2">Duration: {duration}</p>
          )}
        </div>
      </div>
    </div>
  );
}