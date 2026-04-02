import React from 'react';
import { ArrowUpRight, ArrowDownRight, ChevronRight } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { formatCurrency, formatDate } from '../utility/index';
import { categoryColors } from '../data/mockData';

export default function RecentTransactions() {
  const { state, dispatch } = useApp();
  const recent = [...state.transactions]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-display font-semibold text-white">Recent Activity</h3>
          <p className="text-xs text-slate-500 font-body">Latest transactions</p>
        </div>
        <button
          onClick={() => dispatch({ type: 'SET_ACTIVE_VIEW', payload: 'transactions' })}
          className="flex items-center gap-1 text-xs text-brand-400 hover:text-brand-300 font-body font-medium transition-colors"
        >
          View all <ChevronRight size={12} />
        </button>
      </div>

      <div className="space-y-1">
        {recent.map((tx, i) => (
          <div
            key={tx.id}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-surface-hover transition-all duration-200 group cursor-default"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-xs font-display font-bold"
              style={{ background: `${categoryColors[tx.category]}25`, border: `1px solid ${categoryColors[tx.category]}40` }}
            >
              <span style={{ color: categoryColors[tx.category] }}>
                {tx.category.charAt(0)}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-body font-medium text-slate-200 truncate leading-none mb-0.5">{tx.description}</p>
              <p className="text-[11px] text-slate-500 font-body">{tx.category} · {formatDate(tx.date, 'MMM dd')}</p>
            </div>

            <div className="text-right flex-shrink-0">
              <div className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-brand-400' : 'text-red-400'}`}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount, true)}
              </div>
              <div className={`flex items-center justify-end gap-0.5 text-[10px] ${tx.type === 'income' ? 'text-brand-500' : 'text-red-500'}`}>
                {tx.type === 'income' ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />}
                {tx.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      {recent.length === 0 && (
        <div className="text-center py-12 text-slate-600">
          <p className="font-body text-sm">No transactions yet</p>
        </div>
      )}
    </div>
  );
}