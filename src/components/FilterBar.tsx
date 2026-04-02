import { useState } from 'react';
import { Search, Filter, X, ChevronDown } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { allCategories } from '../data/mockData';
import { Category, TransactionType } from '../types/index';

export default function FilterBar() {
    const { state, dispatch } = useApp();
    const { filters } = state;
    const [showAdvanced, setShowAdvanced] = useState(false);

    const update = (patch: Partial<typeof filters>) =>
        dispatch({ type: 'UPDATE_FILTERS', payload: patch });

    const hasActiveFilters =
        filters.type !== 'all' ||
        filters.category !== 'all' ||
        filters.dateFrom ||
        filters.dateTo ||
        filters.amountMin ||
        filters.amountMax;

    return (
        <div className="rounded-2xl border border-surface-border bg-surface-card p-4 space-y-3">
            <div className="flex gap-3">
                {/* Search */}
                <div className="relative flex-1">
                    <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input
                        type="text"
                        value={filters.search}
                        onChange={e => update({ search: e.target.value })}
                        placeholder="Search transactions, categories, merchants…"
                        className="w-full bg-surface border border-surface-border rounded-xl pl-9 pr-4 py-2.5 text-sm font-body text-white placeholder-slate-600 outline-none focus:border-brand-500 transition-colors"
                    />
                    {filters.search && (
                        <button onClick={() => update({ search: '' })} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                            <X size={13} />
                        </button>
                    )}
                </div>

                {/* Type Filter */}
                <div className="relative">
                    <select
                        value={filters.type}
                        onChange={e => update({ type: e.target.value as TransactionType | 'all' })}
                        className="appearance-none bg-surface border border-surface-border rounded-xl pl-3.5 pr-8 py-2.5 text-sm font-body text-white outline-none focus:border-brand-500 transition-colors cursor-pointer"
                    >
                        <option value="all" className="text-black bg-white">All Types</option>
                        <option value="income" className="text-black bg-white">Income</option>
                        <option value="expense" className="text-black bg-white">Expense</option>
                    </select>
                    <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                </div>

                {/* Advanced toggle */}
                <button
                    onClick={() => setShowAdvanced(s => !s)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-body font-medium transition-all ${showAdvanced || hasActiveFilters
                            ? 'border-brand-500/50 bg-brand-500/10 text-brand-400 bg-surface'
                            : 'border-surface-border text-slate-400 hover:text-white hover:border-slate-600 bg-surface'
                        }`}
                >
                    <Filter size={14} />
                    Filters
                    {hasActiveFilters && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-400" />
                    )}
                </button>

                {hasActiveFilters && (
                    <button
                        onClick={() => dispatch({ type: 'RESET_FILTERS' })}
                        className="px-3 py-2.5 rounded-xl border border-surface-border text-slate-400 hover:text-red-400 hover:border-red-500/30 text-xs font-body transition-all"
                    >
                        Reset
                    </button>
                )}
            </div>

            {showAdvanced && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1 border-t border-surface-border animate-fade-in">
                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">Category</label>
                        <div className="relative">
                            <select
                                value={filters.category}
                                onChange={e => update({ category: e.target.value as Category | 'all' })}
                                className="appearance-none w-full bg-surface border border-surface-border rounded-xl pl-3 pr-7 py-2 text-xs font-body text-white outline-none focus:border-brand-500 transition-colors cursor-pointer"
                            >
                                <option value="all" className="text-black bg-white">
                                    All Categories
                                </option>
                                {allCategories.map(c => (
                                    <option key={c} value={c} className="text-black bg-white">
                                        {c}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">From Date</label>
                        <input
                            type="date"
                            value={filters.dateFrom}
                            onChange={e => update({ dateFrom: e.target.value })}
                            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-body text-white outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">To Date</label>
                        <input
                            type="date"
                            value={filters.dateTo}
                            onChange={e => update({ dateTo: e.target.value })}
                            className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-body text-white outline-none focus:border-brand-500 transition-colors"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">Min $</label>
                            <input
                                type="number"
                                value={filters.amountMin}
                                onChange={e => update({ amountMin: e.target.value })}
                                placeholder="0"
                                className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-brand-500 transition-colors placeholder-slate-600"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1.5">Max $</label>
                            <input
                                type="number"
                                value={filters.amountMax}
                                onChange={e => update({ amountMax: e.target.value })}
                                placeholder="∞"
                                className="w-full bg-surface border border-surface-border rounded-xl px-3 py-2 text-xs font-mono text-white outline-none focus:border-brand-500 transition-colors placeholder-slate-600"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}