import { type Section } from '@/lib/kvmData';
import { cn } from '@/lib/utils';

interface SidebarProps {
  sections: Section[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

export default function Sidebar({
  sections,
  activeSection,
  onSectionChange,
}: SidebarProps) {
  return (
    <aside className="sticky top-20 h-[calc(100vh-80px)] w-64 overflow-y-auto border-r border-slate-200 bg-slate-50 px-4 py-6">
      <nav className="space-y-2">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              'w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-all duration-200',
              activeSection === section.id
                ? 'bg-teal-500 text-white shadow-md'
                : 'text-slate-700 hover:bg-slate-200'
            )}
          >
            <span className="mr-2">{section.icon}</span>
            {section.title}
          </button>
        ))}
      </nav>
    </aside>
  );
}
