import { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar,
  LineChart, Line, ReferenceLine
} from 'recharts';
import { useApp } from '../context/Appcontext';
import { getMonthlyData, getCategorySpend, getTotals, formatCurrency } from '../utility/index';
import { TrendingUp, TrendingDown, Zap, Target, Award, AlertCircle } from 'lucide-react';


const CustomBar = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-black border border-surface-border rounded-xl p-3 shadow-2xl">
        <p className="text-xs font-mono text-slate-400 mb-2">{label}</p>
        {payload.map((p: any) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4 text-xs">
            <span className="text-slate-300 font-body capitalize">{p.dataKey}</span>
            <span className="font-mono text-white">{formatCurrency(p.value)}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function InsightsView() {
  const { state } = useApp();
  const monthly = getMonthlyData(state.transactions);
  const categorySpend = getCategorySpend(state.transactions);
  const { income, expenses } = getTotals(state.transactions);

  const insights = useMemo(() => {
    const topCategory = categorySpend[0];
    const months = monthly.length;
    const avgIncome = months > 0 ? income / months : 0;
    const avgExpenses = months > 0 ? expenses / months : 0;
    const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

    const bestMonth = monthly.reduce((best, m) =>
      m.balance > (best?.balance ?? -Infinity) ? m : best, monthly[0]);
    const worstMonth = monthly.reduce((worst, m) =>
      m.balance < (worst?.balance ?? Infinity) ? m : worst, monthly[0]);

    return { topCategory, avgIncome, avgExpenses, savingsRate, bestMonth, worstMonth };
  }, [state.transactions]);

  const radarData = categorySpend.slice(0, 6).map(c => ({
    category: c.category.split(' ')[0],
    value: c.percentage,
  }));

  const savingsRateData = monthly.map(m => ({
    month: m.month,
    rate: m.income > 0 ? ((m.income - m.expenses) / m.income) * 100 : 0,
  }));

  const insightCards = [
    {
      icon: Award,
      label: 'Top Spending',
      value: insights.topCategory?.category || '—',
      sub: insights.topCategory ? formatCurrency(insights.topCategory.amount) : '—',
      color: 'amber',
      bg: 'from-amber-500/20 to-amber-600/5',
      border: 'border-amber-500/30',
    },
    {
      icon: TrendingUp,
      label: 'Avg Monthly Income',
      value: formatCurrency(insights.avgIncome, true),
      sub: `over ${monthly.length} months`,
      color: 'emerald',
      bg: 'from-emerald-500/20 to-emerald-600/5',
      border: 'border-emerald-500/30',
    },
    {
      icon: TrendingDown,
      label: 'Avg Monthly Spend',
      value: formatCurrency(insights.avgExpenses, true),
      sub: `per month`,
      color: 'red',
      bg: 'from-red-500/20 to-red-600/5',
      border: 'border-red-500/30',
    },
    {
      icon: Target,
      label: 'Savings Rate',
      value: `${insights.savingsRate.toFixed(1)}%`,
      sub: insights.savingsRate >= 20 ? '✓ Above 20% goal' : '↑ Aim for 20%',
      color: insights.savingsRate >= 20 ? 'blue' : 'blue',
      bg: insights.savingsRate >= 20 ? 'from-blue-500/20 to-blue-600/5' : 'from-blue-500/20 to-blue-600/5',
      border: insights.savingsRate >= 20 ? 'border-blue-500/30' : 'border-blue-500/30',
    },
  ];

  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {insightCards.map(({ icon: Icon, label, value, sub, bg, border }, i) => (
          <div
            key={label}
            style={{ animationDelay: `${i * 80}ms` }}
            className={`animate-fade-up rounded-2xl border ${border} bg-gradient-to-br ${bg} p-5`}
          >
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center mb-4">
              <Icon size={17} className="text-white" strokeWidth={1.5} />
            </div>
            <div className="font-display text-xl font-bold text-white mb-1">{value}</div>
            <div className="text-xs text-slate-400 font-body mb-1">{label}</div>
            <div className="text-[11px] text-slate-500 font-mono">{sub}</div>
          </div>
        ))}
      </div>


      <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '100ms' }}>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Zap size={14} className="text-blue-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-white">Monthly Comparison</h3>
            <p className="text-xs text-slate-500 font-body">Income vs expenses by month</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={monthly} barGap={4} barCategoryGap="30%">
            <CartesianGrid strokeDasharray="3 3" stroke="#303a4e" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomBar />} cursor={{ fill: 'oklch(0.28 0.06 260.24)' }} />
            <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} opacity={0.9} />
            <Bar dataKey="expenses" fill="#ef4444" radius={[6, 6, 0, 0]} opacity={0.9} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '150ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-brand-500/20 flex items-center justify-center">
              <Target size={14} className="text-brand-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">Savings Rate Trend</h3>
              <p className="text-xs text-slate-500 font-body">Monthly savings as % of income</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={savingsRateData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#252d3d" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'DM Sans' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11, fontFamily: 'JetBrains Mono' }} axisLine={false} tickLine={false} tickFormatter={v => `${v.toFixed(0)}%`} />
              <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, 'Savings Rate']} contentStyle={{ background: '#7e8188', border: '1px solid #252d3d', borderRadius: 12, fontFamily: 'DM Sans', fontSize: 12 }} labelStyle={{ color: '#94a3b8' }} itemStyle={{ color: '#22c55e' }} />
              <ReferenceLine y={20} stroke="#22c55e" strokeDasharray="4 4" opacity={0.5} label={{ value: '20% goal', fill: '#22c55e', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
              <Line type="monotone" dataKey="rate" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: '#22c55e', strokeWidth: 0, r: 4 }} activeDot={{ r: 6, fill: '#22c55e', strokeWidth: 0 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
              <AlertCircle size={14} className="text-violet-400" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-white">Spending Distribution</h3>
              <p className="text-xs text-slate-500 font-body">Top 6 categories radar</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#252d3d" />
              <PolarAngleAxis dataKey="category" tick={{ fill: '#64748b', fontSize: 10, fontFamily: 'DM Sans' }} />
              <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.2} strokeWidth={2} dot={{ fill: '#6366f1', r: 3, strokeWidth: 0 }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {monthly.length >= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up" style={{ animationDelay: '250ms' }}>
          <div className="rounded-2xl border border-brand-500/30 bg-gradient-to-br from-brand-500/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-brand-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-brand-400">Best Month</span>
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{insights.bestMonth?.month}</div>
            <div className="text-sm text-slate-400 font-body">Net: <span className="text-brand-400 font-mono font-semibold">{formatCurrency(insights.bestMonth?.balance ?? 0)}</span></div>
            <div className="text-xs text-slate-500 font-body mt-1">Income: {formatCurrency(insights.bestMonth?.income ?? 0)} · Spent: {formatCurrency(insights.bestMonth?.expenses ?? 0)}</div>
          </div>
          <div className="rounded-2xl border border-red-500/30 bg-gradient-to-br from-red-500/10 to-transparent p-5">
            <div className="flex items-center gap-2 mb-3">
              <TrendingDown size={16} className="text-red-400" />
              <span className="text-xs font-mono uppercase tracking-wider text-red-400">Toughest Month</span>
            </div>
            <div className="font-display text-3xl font-bold text-white mb-1">{insights.worstMonth?.month}</div>
            <div className="text-sm text-slate-400 font-body">Net: <span className="text-red-400 font-mono font-semibold">{formatCurrency(insights.worstMonth?.balance ?? 0)}</span></div>
            <div className="text-xs text-slate-500 font-body mt-1">Income: {formatCurrency(insights.worstMonth?.income ?? 0)} · Spent: {formatCurrency(insights.worstMonth?.expenses ?? 0)}</div>
          </div>
        </div>
      )}

      <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '300ms' }}>
        <h3 className="font-display font-semibold text-white mb-5">Full Category Breakdown</h3>
        <div className="space-y-3">
          {categorySpend.map((c, i) => (
            <div key={c.category} className="flex items-center gap-4 group">
              <span className="text-[10px] font-mono text-slate-600 w-4">{i + 1}</span>
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.color }} />
              <span className="text-sm font-body text-slate-300 w-32 flex-shrink-0">{c.category}</span>
              <div className="flex-1 h-2 bg-surface rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${c.percentage}%`, background: c.color }}
                />
              </div>
              <span className="text-xs font-mono text-slate-400 w-10 text-right">{c.percentage.toFixed(1)}%</span>
              <span className="text-sm font-mono font-semibold text-white w-24 text-right">{formatCurrency(c.amount)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}