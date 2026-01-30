import { type OSVariant } from '@/lib/kvmData';
import { cn } from '@/lib/utils';

interface OSSelectorProps {
  osVariants: OSVariant[];
  activeOS: string;
  onOSChange: (os: string) => void;
}

export default function OSSelector({
  osVariants,
  activeOS,
  onOSChange,
}: OSSelectorProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        选择操作系统
      </h3>
      <div className="flex flex-wrap gap-3">
        {osVariants.map((os) => (
          <button
            key={os.id}
            onClick={() => onOSChange(os.id)}
            className={cn(
              'rounded-lg px-6 py-3 font-medium transition-all duration-200',
              activeOS === os.id
                ? 'bg-blue-600 text-white shadow-lg'
                : 'border border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50'
            )}
          >
            <span className="mr-2">{os.icon}</span>
            {os.name}
          </button>
        ))}
      </div>
    </div>
  );
}
