import { Transaction, MonthlyData, CategorySpend, FilterState, SortState } from '../types';
import { categoryColors } from '../data/mockData';
import { format, parseISO, parse } from 'date-fns';

export function formatCurrency(amount: number, compact = false): string {
  if (compact && amount >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatDate(dateStr: string, fmt = 'MMM dd, yyyy'): string {
  return format(parseISO(dateStr), fmt);
}

export function getTotals(transactions: Transaction[]) {
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { income, expenses, balance: income - expenses };
}

export function getMonthlyData(transactions: Transaction[]): MonthlyData[] {
  const map = new Map<string, { income: number; expenses: number }>();

  transactions.forEach(t => {
    const key = format(parseISO(t.date), 'yyyy-MM');
    const existing = map.get(key) || { income: 0, expenses: 0 };
    if (t.type === 'income') existing.income += t.amount;
    else existing.expenses += t.amount;
    map.set(key, existing);
  });

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, data]) => ({
      month: format(parse(key, 'yyyy-MM', new Date()), 'MMM'),
      income: data.income,
      expenses: data.expenses,
      balance: data.income - data.expenses,
    }));
}

export function getCategorySpend(transactions: Transaction[]): CategorySpend[] {
  const expenses = transactions.filter(t => t.type === 'expense');
  const total = expenses.reduce((s, t) => s + t.amount, 0);
  const map = new Map<string, number>();

  expenses.forEach(t => {
    map.set(t.category, (map.get(t.category) || 0) + t.amount);
  });

  return Array.from(map.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([category, amount]) => ({
      category: category as CategorySpend['category'],
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: categoryColors[category] || '#94a3b8',
    }));
}

export function filterTransactions(
  transactions: Transaction[],
  filters: FilterState
): Transaction[] {
  return transactions.filter(t => {
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !t.description.toLowerCase().includes(q) &&
        !t.category.toLowerCase().includes(q) &&
        !(t.merchant?.toLowerCase().includes(q))
      ) return false;
    }
    if (filters.type !== 'all' && t.type !== filters.type) return false;
    if (filters.category !== 'all' && t.category !== filters.category) return false;
    if (filters.dateFrom && t.date < filters.dateFrom) return false;
    if (filters.dateTo && t.date > filters.dateTo) return false;
    if (filters.amountMin && t.amount < parseFloat(filters.amountMin)) return false;
    if (filters.amountMax && t.amount > parseFloat(filters.amountMax)) return false;
    return true;
  });
}

export function sortTransactions(
  transactions: Transaction[],
  sort: SortState
): Transaction[] {
  return [...transactions].sort((a, b) => {
    let cmp = 0;
    switch (sort.field) {
      case 'date': cmp = a.date.localeCompare(b.date); break;
      case 'amount': cmp = a.amount - b.amount; break;
      case 'category': cmp = a.category.localeCompare(b.category); break;
      case 'description': cmp = a.description.localeCompare(b.description); break;
    }
    return sort.direction === 'asc' ? cmp : -cmp;
  });
}

export function exportToCSV(transactions: Transaction[]): void {
  const headers = ['Date', 'Description', 'Merchant', 'Category', 'Type', 'Amount'];
  const rows = transactions.map(t => [
    t.date,
    `"${t.description}"`,
    `"${t.merchant || ''}"`,
    t.category,
    t.type,
    t.type === 'expense' ? `-${t.amount}` : t.amount,
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `finflow-transactions-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}