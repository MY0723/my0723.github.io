import { cn } from '@/lib/utils';

interface InstallModeSelectorProps {
  mode: 'online' | 'offline';
  onModeChange: (mode: 'online' | 'offline') => void;
}

export default function InstallModeSelector({
  mode,
  onModeChange,
}: InstallModeSelectorProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
      <h3 className="mb-4 text-lg font-semibold text-slate-900">
        安装方式
      </h3>
      <div className="flex gap-4">
        <button
          onClick={() => onModeChange('online')}
          className={cn(
            'flex-1 rounded-lg px-6 py-3 font-medium transition-all duration-200',
            mode === 'online'
              ? 'bg-green-600 text-white shadow-lg'
              : 'border border-slate-300 bg-white text-slate-700 hover:border-green-400 hover:bg-green-50'
          )}
        >
          🌐 联网安装
        </button>
        <button
          onClick={() => onModeChange('offline')}
          className={cn(
            'flex-1 rounded-lg px-6 py-3 font-medium transition-all duration-200',
            mode === 'offline'
              ? 'bg-amber-600 text-white shadow-lg'
              : 'border border-slate-300 bg-white text-slate-700 hover:border-amber-400 hover:bg-amber-50'
          )}
        >
          💾 离线安装
        </button>
      </div>
    </div>
  );
}
