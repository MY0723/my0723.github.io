import { useState } from 'react';
import { type CodeBlock as CodeBlockType } from '@/lib/kvmData';
import { Check, Copy } from 'lucide-react';

interface CodeBlockProps {
  codeBlock: CodeBlockType;
}

export default function CodeBlock({ codeBlock }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeBlock.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-2">
      {/* Title and Description */}
      <div>
        <h5 className="font-semibold text-slate-900">{codeBlock.title}</h5>
        {codeBlock.description && (
          <p className="text-sm text-slate-600">{codeBlock.description}</p>
        )}
      </div>

      {/* Code Block */}
      <div className="relative rounded-lg bg-slate-900 p-4">
        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute right-3 top-3 rounded-md bg-slate-700 p-2 text-slate-300 transition-all hover:bg-slate-600"
          title="复制代码"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>

        {/* Code */}
        <pre className="overflow-x-auto pr-12">
          <code className="font-mono text-sm text-slate-100">
            {codeBlock.code}
          </code>
        </pre>
      </div>

      {/* Note */}
      {codeBlock.note && (
        <div className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">
          <span className="font-semibold">💡 提示：</span> {codeBlock.note}
        </div>
      )}
    </div>
  );
}
