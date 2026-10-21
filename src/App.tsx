import React, { useState } from 'react';
import { ActiveModule } from './types';
import { Navigation } from './components/Navigation';
import { PeoplePulseDashboard } from './components/PeoplePulse/PeoplePulseDashboard';
import { CanteenPlanner } from './components/Canteen/CanteenPlanner';
import { PorscheShowcase } from './components/Porsche/PorscheShowcase';
import { LtsuPortal } from './components/LtsuPortal/LtsuPortal';
import { JsLabWorkbench } from './components/JsLab/JsLabWorkbench';

export default function App() {
  const [activeModule, setActiveModule] = useState<ActiveModule>('peoplepulse');

  return (
    <div className="min-h-screen bg-[#fafaf8] flex flex-col font-['DM_Sans',sans-serif]">
      {/* Top Unified Header Navigation */}
      <Navigation 
        activeModule={activeModule} 
        setActiveModule={setActiveModule} 
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeModule === 'peoplepulse' && <PeoplePulseDashboard />}
        {activeModule === 'canteen' && <CanteenPlanner />}
        {activeModule === 'porsche' && <PorscheShowcase />}
        {activeModule === 'ltsu-portal' && <LtsuPortal />}
        {activeModule === 'js-lab' && <JsLabWorkbench />}
      </main>
    </div>
  );
}
