import  { useState } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown, Edit2, Trash2, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { filterTransactions, sortTransactions, formatCurrency, formatDate } from '../utility/index';
import { categoryColors } from '../data/mockData';
import { SortField, Transaction } from '../types/index';

const PAGE_SIZE = 10;

export default function TransactionTable() {
  const { state, dispatch } = useApp();
  const [page, setPage] = useState(1);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = filterTransactions(state.transactions, state.filters);
  const sorted = sortTransactions(filtered, state.sort);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (field: SortField) => {
    dispatch({
      type: 'SET_SORT',
      payload: {
        field,
        direction: state.sort.field === field && state.sort.direction === 'asc' ? 'desc' : 'asc',
      },
    });
    setPage(1);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (state.sort.field !== field) return <ChevronsUpDown size={12} className="text-slate-600" />;
    return state.sort.direction === 'asc'
      ? <ChevronUp size={12} className="text-brand-400" />
      : <ChevronDown size={12} className="text-brand-400" />;
  };

  const handleDelete = (id: string) => {
    if (deleteConfirm === id) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id });
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  };

  const handleEdit = (tx: Transaction) => {
    dispatch({ type: 'SET_EDITING', payload: tx });
    dispatch({ type: 'SET_ADD_MODAL', payload: true });
  };

  const col = (label: string, field?: SortField, className = '') => (
    <th
      className={`text-left py-3 px-4 text-[10px] font-mono uppercase tracking-wider text-slate-500 ${field ? 'cursor-pointer select-none hover:text-slate-300 transition-colors' : ''} ${className}`}
      onClick={field ? () => handleSort(field) : undefined}
    >
      <div className="flex items-center gap-1.5">
        {label}
        {field && <SortIcon field={field} />}
      </div>
    </th>
  );

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card overflow-hidden animate-fade-up">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-surface-border bg-surface/50">
            <tr>
              {col('Date', 'date')}
              {col('Description', 'description')}
              {col('Category', 'category')}
              {col('Merchant')}
              {col('Type')}
              {col('Amount', 'amount', 'text-right')}
              {state.role === 'admin' && <th className="py-3 px-4 w-20" />}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-border">
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={state.role === 'admin' ? 7 : 6} className="text-center py-20">
                  <div className="text-4xl mb-3">🔍</div>
                  <p className="font-display font-semibold text-white mb-1">No transactions found</p>
                  <p className="text-sm text-slate-500 font-body">Try adjusting your filters</p>
                </td>
              </tr>
            ) : (
              paginated.map((tx, i) => (
                <tr
                  key={tx.id}
                  className="hover:bg-surface-hover transition-colors group"
                  style={{ animationDelay: `${i * 30}ms` }}
                >
                  <td className="py-3.5 px-4">
                    <span className="text-sm font-mono text-slate-400">{formatDate(tx.date, 'MMM dd, yy')}</span>
                  </td>
                  <td className="py-3.5 px-4 max-w-[200px]">
                    <p className="text-sm font-body font-medium text-white truncate">{tx.description}</p>
                    {tx.note && <p className="text-[11px] text-slate-600 truncate">{tx.note}</p>}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-body font-medium"
                      style={{
                        background: `${categoryColors[tx.category]}20`,
                        color: categoryColors[tx.category],
                        border: `1px solid ${categoryColors[tx.category]}30`,
                      }}
                    >
                      {tx.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="text-xs text-slate-500 font-body">{tx.merchant || '—'}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[11px] font-body font-medium px-2 py-0.5 rounded-md ${
                      tx.type === 'income'
                        ? 'text-brand-400 bg-brand-500/10'
                        : 'text-red-400 bg-red-500/10'
                    }`}>
                      {tx.type === 'income' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                      {tx.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className={`text-sm font-mono font-semibold ${tx.type === 'income' ? 'text-brand-400' : 'text-red-400'}`}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {state.role === 'admin' && (
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEdit(tx)}
                          className="w-7 h-7 rounded-lg bg-surface hover:bg-brand-500/20 flex items-center justify-center text-slate-400 hover:text-brand-400 transition-all"
                          title="Edit"
                        >
                          <Edit2 size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(tx.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                            deleteConfirm === tx.id
                              ? 'bg-red-500 text-white'
                              : 'bg-surface hover:bg-red-500/20 text-slate-400 hover:text-red-400'
                          }`}
                          title={deleteConfirm === tx.id ? 'Click to confirm' : 'Delete'}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-3.5 border-t border-surface-border bg-surface/30">
        <p className="text-xs font-body text-slate-500">
          Showing <span className="text-white font-medium">{paginated.length}</span> of{' '}
          <span className="text-white font-medium">{filtered.length}</span> transactions
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="w-8 h-8 rounded-lg border border-surface-border flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono"
          >
            ‹
          </button>
          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            const p = totalPages <= 5 ? i + 1 : page <= 3 ? i + 1 : page >= totalPages - 2 ? totalPages - 4 + i : page - 2 + i;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 rounded-lg text-xs font-mono transition-all ${
                  page === p
                    ? 'bg-brand-500 text-white shadow-sm shadow-brand-500/40'
                    : 'border border-surface-border text-slate-400 hover:text-white hover:border-slate-600'
                }`}
              >
                {p}
              </button>
            );
          })}
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="w-8 h-8 rounded-lg border border-surface-border flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all text-xs font-mono"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}