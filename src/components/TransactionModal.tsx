import  { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/Appcontext';
import { Transaction, Category, TransactionType } from '../types/index';
import { allCategories } from '../data/mockData';
import { generateId } from '../utility/index';

interface Props {
  onClose: () => void;
  editing?: Transaction | null;
}

const defaultForm = {
  description: '',
  amount: '',
  category: 'Food & Dining' as Category,
  type: 'expense' as TransactionType,
  date: new Date().toISOString().split('T')[0],
  merchant: '',
  note: '',
};

export default function TransactionModal({ onClose, editing }: Props) {
  const { dispatch } = useApp();
  const [form, setForm] = useState(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (editing) {
      setForm({
        description: editing.description,
        amount: editing.amount.toString(),
        category: editing.category,
        type: editing.type,
        date: editing.date,
        merchant: editing.merchant || '',
        note: editing.note || '',
      });
    }
  }, [editing]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.description.trim()) e.description = 'Description is required';
    if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
      e.amount = 'Enter a valid amount';
    if (!form.date) e.date = 'Date is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSaving(true);
    setTimeout(() => {
      const tx: Transaction = {
        id: editing?.id || generateId(),
        description: form.description.trim(),
        amount: parseFloat(form.amount),
        category: form.category,
        type: form.type,
        date: form.date,
        merchant: form.merchant.trim() || undefined,
        note: form.note.trim() || undefined,
      };
      if (editing) {
        dispatch({ type: 'UPDATE_TRANSACTION', payload: tx });
      } else {
        dispatch({ type: 'ADD_TRANSACTION', payload: tx });
      }
      onClose();
    }, 400);
  };

  const field = (
    label: string,
    key: keyof typeof form,
    type = 'text',
    placeholder = ''
  ) => (
    <div>
      <label className="block text-xs font-body font-medium text-slate-400 mb-1.5">{label}</label>
      <input
        type={type}
        value={form[key]}
        onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className={`w-full bg-surface border rounded-xl px-3.5 py-2.5 text-sm font-body text-white placeholder-slate-600 outline-none focus:border-brand-500 transition-colors ${errors[key] ? 'border-red-500' : 'border-surface-border'}`}
      />
      {errors[key] && <p className="text-xs text-red-400 mt-1 font-body">{errors[key]}</p>}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-surface-card border border-surface-border rounded-2xl shadow-2xl animate-fade-up">

        <div className="flex items-center justify-between p-6 border-b border-surface-border">
          <div>
            <h2 className="font-display font-bold text-white text-lg">
              {editing ? 'Edit Transaction' : 'Add Transaction'}
            </h2>
            <p className="text-xs text-slate-500 font-body">
              {editing ? 'Update transaction details' : 'Record a new transaction'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-surface hover:bg-surface-hover border border-surface-border flex items-center justify-center text-slate-400 hover:text-white transition-all"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-body font-medium text-slate-400 mb-1.5">Type</label>
            <div className="flex bg-surface rounded-xl p-1 gap-1">
              {(['expense', 'income'] as TransactionType[]).map(t => (
                <button
                  key={t}
                  onClick={() => setForm(f => ({ ...f, type: t }))}
                  className={`flex-1 py-2 rounded-lg text-xs font-body font-semibold transition-all duration-200 capitalize ${
                    form.type === t
                      ? t === 'income'
                        ? 'bg-brand-500 text-white shadow-sm'
                        : 'bg-red-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {field('Description', 'description', 'text', 'e.g. Grocery shopping')}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-body font-medium text-slate-400 mb-1.5">Amount ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                placeholder="0.00"
                className={`w-full bg-surface border rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-600 outline-none focus:border-brand-500 transition-colors ${errors.amount ? 'border-red-500' : 'border-surface-border'}`}
              />
              {errors.amount && <p className="text-xs text-red-400 mt-1">{errors.amount}</p>}
            </div>
            {field('Date', 'date', 'date')}
          </div>

          <div>
            <label className="block text-xs font-body font-medium text-slate-400 mb-1.5">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(f => ({ ...f, category: e.target.value as Category }))}
              className="w-full bg-surface border border-surface-border rounded-xl px-3.5 py-2.5 text-sm font-body text-white outline-none focus:border-brand-500 transition-colors"
            >
              {allCategories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {field('Merchant / Source', 'merchant', 'text', 'e.g. Amazon')}
          {field('Note (optional)', 'note', 'text', 'Add a note...')}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-surface-border">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-surface-border text-slate-300 hover:text-white text-sm font-body font-medium hover:bg-surface-hover transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-body font-semibold transition-all shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Check size={15} strokeWidth={2.5} />
            )}
            {saving ? 'Saving…' : editing ? 'Save Changes' : 'Add Transaction'}
          </button>
        </div>
      </div>
    </div>
  );
}