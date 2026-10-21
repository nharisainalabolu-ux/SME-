import React from 'react';
import { ActiveModule } from '../types';
import { 
  Users, 
  Utensils, 
  Car, 
  GraduationCap, 
  Code2, 
  Layers
} from 'lucide-react';

interface NavigationProps {
  activeModule: ActiveModule;
  setActiveModule: (module: ActiveModule) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ activeModule, setActiveModule }) => {
  const navItems = [
    {
      id: 'peoplepulse' as ActiveModule,
      name: 'PeoplePulse',
      subtext: 'Workforce Intelligence',
      icon: Users,
      badge: 'Core App'
    },
    {
      id: 'canteen' as ActiveModule,
      name: 'Smart Canteen',
      subtext: 'Meal Planner & Budget',
      icon: Utensils,
      badge: 'Case Study'
    },
    {
      id: 'porsche' as ActiveModule,
      name: 'Porsche Luxury',
      subtext: 'Heritage & Performance',
      icon: Car,
      badge: 'Showcase'
    },
    {
      id: 'ltsu-portal' as ActiveModule,
      name: 'LTSU Portal',
      subtext: 'Auth & Grade Calculator',
      icon: GraduationCap,
      badge: 'University'
    },
    {
      id: 'js-lab' as ActiveModule,
      name: 'JS Algorithms',
      subtext: 'Math, Arrays & Effects',
      icon: Code2,
      badge: 'Lab'
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#1e2e25] text-white border-b border-[#2b4135] shadow-md backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand branding */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#347a56] flex items-center justify-center font-bold text-white shadow-inner">
              <Layers className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight flex items-center gap-2">
                <span>SME Project Suite</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-900/80 text-emerald-300 font-semibold border border-emerald-700/50">
                  Full Stack
                </span>
              </div>
              <p className="text-xs text-emerald-300/80 hidden sm:block">
                Lamrin Tech Skills University • Web Development
              </p>
            </div>
          </div>

          {/* Module Switcher Buttons */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveModule(item.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400/40'
                      : 'text-emerald-100/80 hover:bg-[#25392e] hover:text-white'
                  }`}
                  title={`${item.name} — ${item.subtext}`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-300'}`} />
                  <span className="hidden md:inline font-semibold">{item.name}</span>
                  <span className="md:hidden font-semibold">{item.name.split(' ')[0]}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded font-bold hidden lg:inline-block ${
                        isActive
                          ? 'bg-emerald-700 text-emerald-100'
                          : 'bg-[#18251e] text-emerald-400/90'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
