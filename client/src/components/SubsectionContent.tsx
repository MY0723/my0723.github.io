import { type Subsection } from '@/lib/kvmData';
import CodeBlock from './CodeBlock';

interface SubsectionContentProps {
  subsection: Subsection;
  activeOS: string;
  installMode: 'online' | 'offline';
}

export default function SubsectionContent({
  subsection,
  activeOS,
  installMode,
}: SubsectionContentProps) {
  const osContent = subsection.osVariants[activeOS];

  if (!osContent) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <p className="text-amber-800">
          ⚠️ 该操作系统暂无相关内容。
        </p>
      </div>
    );
  }

  const steps = installMode === 'online' ? osContent.online : osContent.offline;

  if (!steps) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
        <p className="text-amber-800">
          ⚠️ 该安装方式暂无相关内容。
        </p>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-900">
          {subsection.title}
        </h3>
        <p className="mt-2 text-slate-600">{subsection.description}</p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        {steps.map((step) => (
          <div
            key={step.stepNumber}
            className="rounded-lg border border-slate-200 bg-slate-50 p-6"
          >
            {/* Step Header */}
            <div className="mb-6 flex items-start gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold">
                {step.stepNumber}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-semibold text-slate-900">
                  {step.title}
                </h4>
                <p className="mt-1 text-slate-600">{step.description}</p>
              </div>
            </div>

            {/* Code Blocks */}
            <div className="space-y-4">
              {step.codeBlocks.map((codeBlock, idx) => (
                <CodeBlock
                  key={idx}
                  codeBlock={codeBlock}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      {osContent.notes && osContent.notes.length > 0 && (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h4 className="mb-3 font-semibold text-blue-900">📝 注意事项</h4>
          <ul className="space-y-2">
            {osContent.notes.map((note, idx) => (
              <li key={idx} className="text-blue-800">
                • {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
