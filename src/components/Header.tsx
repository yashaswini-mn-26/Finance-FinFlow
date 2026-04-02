
import { Bell, Download, Plus, Search } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { exportToCSV } from '../utility/index';
import { filterTransactions, sortTransactions } from '../utility/index';

const viewTitles = {
  dashboard: { title: 'Dashboard', subtitle: 'Your financial overview at a glance' },
  transactions: { title: 'Transactions', subtitle: 'Manage and explore your activity' },
  insights: { title: 'Insights', subtitle: 'Understand your spending patterns' },
};

export default function Header() {
  const { state, dispatch } = useApp();
  const { title, subtitle } = viewTitles[state.activeView];

  const handleExport = () => {
    const filtered = filterTransactions(state.transactions, state.filters);
    const sorted = sortTransactions(filtered, state.sort);
    exportToCSV(sorted);
  };

  return (
    <header className="sticky top-0 z-10 h-16 flex items-center justify-between px-8 border-b border-surface-border bg-surface/80 backdrop-blur-xl">
      <div className="animate-fade-in">
        <h1 className="font-display text-xl font-bold text-white">{title}</h1>
        <p className="text-xs text-slate-500 font-body">{subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {state.activeView === 'transactions' && (
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-hover border border-surface-border text-slate-300 hover:text-white text-xs font-body font-medium transition-all duration-200 hover:border-slate-600"
          >
            <Download size={14} />
            Export CSV
          </button>
        )}

        {state.role === 'admin' && state.activeView === 'transactions' && (
          <button
            onClick={() => dispatch({ type: 'SET_ADD_MODAL', payload: true })}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-xs font-body font-semibold transition-all duration-200 shadow-lg shadow-brand-500/30 hover:shadow-brand-400/40"
          >
            <Plus size={14} strokeWidth={2.5} />
            Add Transaction
          </button>
        )}

        <div className="w-8 h-8 rounded-xl bg-surface-hover border border-surface-border flex items-center justify-center cursor-pointer hover:border-brand-500/50 transition-colors relative group">
          <Bell size={15} className="text-slate-400 group-hover:text-white transition-colors" />
          <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-brand-500" />
        </div>

        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white font-display font-bold text-xs cursor-pointer shadow-lg shadow-brand-500/30">
          {state.role === 'admin' ? 'ADMIN' : 'VIEWER'}
        </div>
      </div>
    </header>
  );
}