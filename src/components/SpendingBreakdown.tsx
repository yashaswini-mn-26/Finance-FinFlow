import { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { useApp } from '../context/Appcontext';
import { getCategorySpend, formatCurrency } from '../utility/index';
import { PieChart as PieIcon } from 'lucide-react';

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value } = props;
  return (
    <g>
      <text x={cx} y={cy - 12} textAnchor="middle" fill="#fff" className="text-base font-display font-bold" style={{ fontSize: 18, fontFamily: 'Syne' }}>
        {formatCurrency(value, true)}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" style={{ fontSize: 11, fontFamily: 'DM Sans' }}>
        {payload.category}
      </text>
      <Sector cx={cx} cy={cy} innerRadius={innerRadius} outerRadius={outerRadius + 6} startAngle={startAngle} endAngle={endAngle} fill={fill} />
      <Sector cx={cx} cy={cy} innerRadius={outerRadius + 10} outerRadius={outerRadius + 14} startAngle={startAngle} endAngle={endAngle} fill={fill} opacity={0.4} />
    </g>
  );
};

export default function SpendingBreakdown() {
  const { state } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const data = getCategorySpend(state.transactions).slice(0, 7);

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card p-6 animate-fade-up" style={{ animationDelay: '200ms' }}>
      <div className="flex items-center gap-2 mb-6">
        <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center">
          <PieIcon size={14} className="text-violet-400" />
        </div>
        <div>
          <h3 className="font-display font-semibold text-white">Spending Breakdown</h3>
          <p className="text-xs text-slate-500 font-body">By category</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        <div className="w-full lg:w-48 h-48 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.category} fill={entry.color} opacity={index === activeIndex ? 1 : 0.6} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 w-full space-y-2.5">
          {data.map((item, i) => (
            <div
              key={item.category}
              className={`flex items-center gap-3 cursor-pointer transition-all duration-200 ${i === activeIndex ? 'opacity-100' : 'opacity-60 hover:opacity-90'}`}
              onMouseEnter={() => setActiveIndex(i)}
            >
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: item.color }} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-body text-slate-300 truncate">{item.category}</span>
                  <span className="text-xs font-mono text-white ml-2">{formatCurrency(item.amount, true)}</span>
                </div>
                <div className="h-1 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${item.percentage}%`, background: item.color }}
                  />
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-500 w-9 text-right">{item.percentage.toFixed(0)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}