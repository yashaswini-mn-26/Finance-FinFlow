
import { LayoutDashboard, ArrowLeftRight, Lightbulb } from 'lucide-react';
import { useApp } from '../context/Appcontext';

const items = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'transactions', label: 'Activity', icon: ArrowLeftRight },
  { id: 'insights', label: 'Insights', icon: Lightbulb },
] as const;

export default function MobileNav() {
  const { state, dispatch } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 md:hidden border-t border-surface-border bg-surface-card/95 backdrop-blur-xl">
      <div className="flex items-center justify-around px-4 py-2 pb-safe">
        {items.map(({ id, label, icon: Icon }) => {
          const active = state.activeView === id;
          return (
            <button
              key={id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_VIEW', payload: id })}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${
                active ? 'text-brand-400' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] font-body font-medium">{label}</span>
              {active && <div className="w-1 h-1 rounded-full bg-brand-400" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}