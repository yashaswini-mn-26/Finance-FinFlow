
import { LayoutDashboard, ArrowLeftRight, Lightbulb, Shield, Eye, TrendingUp } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { Role } from '../types/index';

export default function Sidebar() {
  const { state, dispatch } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight },
    { id: 'insights', label: 'Insights', icon: Lightbulb },
  ] as const;

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 flex flex-col z-20 border-r border-surface-border bg-surface-card">

      <div className="p-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <TrendingUp size={18} className="text-white" strokeWidth={2.5} />
          </div>
          <div>
            <span className="font-display text-xl font-bold text-white tracking-tight">FinFlow</span>
            <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">Finance OS</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 px-3 mb-3">Navigation</div>
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = state.activeView === id;
          return (
            <button
              key={id}
              onClick={() => dispatch({ type: 'SET_ACTIVE_VIEW', payload: id })}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body font-medium transition-all duration-200 ${
                active
                  ? 'bg-brand-500/15 text-brand-400 shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-surface-hover'
              }`}
            >
              <Icon size={18} strokeWidth={active ? 2 : 1.5} className={active ? 'text-brand-400' : ''} />
              {label}
              {active && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-400" />
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-surface-border">
        <div className="text-[10px] font-mono uppercase tracking-widest text-slate-300 px-1 mb-2">Role</div>
        <div className="flex bg-surface rounded-xl p-1 gap-1">
          {(['admin', 'viewer'] as Role[]).map(role => (
            <button
              key={role}
              onClick={() => dispatch({ type: 'SET_ROLE', payload: role })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-body font-medium transition-all duration-200 ${
                state.role === role
                  ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/40'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {role === 'admin' ? <Shield size={12} /> : <Eye size={12} />}
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-2 font-mono">
          {state.role === 'admin' ? '✓ Full edit access' : '◎ Read-only mode'}
        </p>
      </div>

      {/* Dark Mode Toggle
      <div className="p-4 border-t border-surface-border">
        <button
          onClick={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-surface-hover transition-all duration-200"
        >
          <span className="font-body">Appearance</span>
          <div className="flex items-center gap-2">
            {state.darkMode ? <Moon size={15} /> : <Sun size={15} />}
            <div className={`w-8 h-4 rounded-full transition-colors ${state.darkMode ? 'bg-brand-600' : 'bg-slate-600'} relative`}>
              <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform shadow ${state.darkMode ? 'translate-x-4' : 'translate-x-0.5'}`} />
            </div>
          </div>
        </button>
      </div> */}
    </aside>
  );
}