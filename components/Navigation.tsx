import React from 'react';
import { Map, List, Heart, User } from 'lucide-react';

interface NavigationProps {
  currentView: 'map' | 'list' | 'saved';
  setView: (view: 'map' | 'list' | 'saved') => void;
  savedCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, savedCount }) => {
  const navItems: { id: 'map' | 'list' | 'saved'; icon: any; label: string; badge?: number }[] = [
    { id: 'map', icon: Map, label: 'Explore' },
    { id: 'list', icon: List, label: 'List' },
    { id: 'saved', icon: Heart, label: 'Saved', badge: savedCount },
  ];

  return (
    <>
      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-2 z-40 pb-safe">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center p-2 rounded-lg w-full transition-colors ${currentView === item.id ? 'text-blue-600 bg-blue-50' : 'text-slate-500'}`}
          >
            <div className="relative">
                <item.icon className="w-6 h-6 mb-1" />
                {item.badge ? (
                    <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {item.badge}
                    </span>
                ) : null}
            </div>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Desktop Sidebar (Optional - could be top bar in this layout, sticking to simple responsive checks in App) */}
    </>
  );
};

export default Navigation;