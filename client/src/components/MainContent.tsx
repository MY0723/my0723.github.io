import { type Section, osVariants } from '@/lib/kvmData';
import SubsectionContent from './SubsectionContent';
import OSSelector from './OSSelector';
import InstallModeSelector from './InstallModeSelector';

interface MainContentProps {
  section: Section;
  activeOS: string;
  onOSChange: (os: string) => void;
  installMode: 'online' | 'offline';
  onInstallModeChange: (mode: 'online' | 'offline') => void;
}

export default function MainContent({
  section,
  activeOS,
  onOSChange,
  installMode,
  onInstallModeChange,
}: MainContentProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Section Header */}
      <div className="border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-8">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold text-slate-900">
            {section.icon} {section.title}
          </h2>
          <p className="mt-2 text-lg text-slate-600">{section.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl px-8 py-12">
        {/* OS Selector */}
        <div className="mb-8">
          <OSSelector
            osVariants={osVariants}
            activeOS={activeOS}
            onOSChange={onOSChange}
          />
        </div>

        {/* Install Mode Selector (only for system-installation section) */}
        {section.id === 'system-installation' && (
          <div className="mb-8">
            <InstallModeSelector
              mode={installMode}
              onModeChange={onInstallModeChange}
            />
          </div>
        )}

        {/* Subsections */}
        <div className="space-y-12">
          {section.subsections.map((subsection) => (
            <SubsectionContent
              key={subsection.id}
              subsection={subsection}
              activeOS={activeOS}
              installMode={installMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
