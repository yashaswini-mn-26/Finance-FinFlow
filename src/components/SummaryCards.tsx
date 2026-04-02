import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { getTotals, formatCurrency } from '../utility/index';

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 1200;
    const start = Date.now();
    const startVal = 0;
    const raf = (timestamp: number) => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(startVal + (value - startVal) * eased);
      if (progress < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [value]);

  return <>{prefix}{formatCurrency(display)}</>;
}

export default function SummaryCards() {
  const { state } = useApp();
  const { income, expenses, balance } = getTotals(state.transactions);
  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const cards = [
    {
      label: 'Total Balance',
      value: balance,
      icon: Wallet,
      color: 'blue',
      trend: '+12.5%',
      trendUp: true,
      gradient: 'from-blue-500/20 to-blue-600/5',
      border: 'border-blue-500/30',
      glow: 'shadow-blue-500/10',
      delay: '0ms',
    },
    {
      label: 'Total Income',
      value: income,
      icon: TrendingUp,
      color: 'emerald',
      trend: '+8.2%',
      trendUp: true,
      gradient: 'from-emerald-500/20 to-emerald-600/5',
      border: 'border-emerald-500/30',
      glow: 'shadow-emerald-500/10',
      delay: '80ms',
    },
    {
      label: 'Total Expenses',
      value: expenses,
      icon: TrendingDown,
      color: 'red',
      trend: '+4.1%',
      trendUp: false,
      gradient: 'from-red-500/20 to-red-600/5',
      border: 'border-red-500/30',
      glow: 'shadow-red-500/10',
      delay: '160ms',
    },
    {
      label: 'Savings Rate',
      value: savingsRate,
      icon: ArrowUpRight,
      color: 'violet',
      trend: 'vs last month',
      trendUp: true,
      gradient: 'from-violet-500/20 to-violet-600/5',
      border: 'border-violet-500/30',
      glow: 'shadow-violet-500/10',
      isPercent: true,
      delay: '240ms',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, gradient, border, glow, trend, trendUp, isPercent, delay }) => (
        <div
          key={label}
          style={{ animationDelay: delay }}
          className={`animate-fade-up relative rounded-2xl border ${border} bg-gradient-to-br ${gradient} p-5 overflow-hidden group cursor-default shadow-xl ${glow} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-white/5 blur-2xl group-hover:scale-150 transition-transform duration-700" />

          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
              <Icon size={18} className="text-white" strokeWidth={1.5} />
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-lg ${trendUp ? 'bg-brand-500/20 text-brand-300' : 'bg-red-500/20 text-red-300'}`}>
              {trendUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
              {trend}
            </div>
          </div>

          <div className="font-display text-2xl font-bold text-white mb-1 tracking-tight">
            {isPercent
              ? `${value.toFixed(1)}%`
              : <AnimatedNumber value={value} />
            }
          </div>
          <div className="text-xs text-slate-400 font-body">{label}</div>
        </div>
      ))}
    </div>
  );
}