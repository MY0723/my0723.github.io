import { useState } from 'react';
import { kvmGuideData, osVariants, type Section } from '@/lib/kvmData';
import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>(kvmGuideData[0].id);
  const [activeOS, setActiveOS] = useState<string>('ubuntu');
  const [installMode, setInstallMode] = useState<'online' | 'offline'>('online');

  const currentSection = kvmGuideData.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              🖥️ KVM 虚拟化系统安装指南
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              详细的多系统 KVM 安装步骤、网络配置和调试方案
            </p>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          sections={kvmGuideData}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {currentSection && (
            <MainContent
              section={currentSection}
              activeOS={activeOS}
              onOSChange={setActiveOS}
              installMode={installMode}
              onInstallModeChange={setInstallMode}
            />
          )}
        </main>
      </div>
    </div>
  );
}
