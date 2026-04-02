import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Transaction, Role, FilterState, SortState } from '../types/index';
import { mockTransactions } from '../data/mockData';

interface AppState {
  transactions: Transaction[];
  role: Role;
  darkMode: boolean;
  filters: FilterState;
  sort: SortState;
  activeView: 'dashboard' | 'transactions' | 'insights';
  isAddModalOpen: boolean;
  editingTransaction: Transaction | null;
}

type Action =
  | { type: 'SET_ROLE'; payload: Role }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'SET_ACTIVE_VIEW'; payload: AppState['activeView'] }
  | { type: 'UPDATE_FILTERS'; payload: Partial<FilterState> }
  | { type: 'RESET_FILTERS' }
  | { type: 'SET_SORT'; payload: SortState }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_TRANSACTION'; payload: Transaction }
  | { type: 'DELETE_TRANSACTION'; payload: string }
  | { type: 'SET_ADD_MODAL'; payload: boolean }
  | { type: 'SET_EDITING'; payload: Transaction | null }
  | { type: 'LOAD_TRANSACTIONS'; payload: Transaction[] };

const defaultFilters: FilterState = {
  search: '',
  type: 'all',
  category: 'all',
  dateFrom: '',
  dateTo: '',
  amountMin: '',
  amountMax: '',
};

const initialState: AppState = {
  transactions: [],
  role: 'viewer',
  darkMode: true,
  filters: defaultFilters,
  sort: { field: 'date', direction: 'desc' },
  activeView: 'dashboard',
  isAddModalOpen: false,
  editingTransaction: null,
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'SET_ACTIVE_VIEW':
      return { ...state, activeView: action.payload };
    case 'UPDATE_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'RESET_FILTERS':
      return { ...state, filters: defaultFilters };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    case 'ADD_TRANSACTION': {
      const updated = [action.payload, ...state.transactions];
      localStorage.setItem('ff_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'UPDATE_TRANSACTION': {
      const updated = state.transactions.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      localStorage.setItem('ff_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'DELETE_TRANSACTION': {
      const updated = state.transactions.filter(t => t.id !== action.payload);
      localStorage.setItem('ff_transactions', JSON.stringify(updated));
      return { ...state, transactions: updated };
    }
    case 'SET_ADD_MODAL':
      return { ...state, isAddModalOpen: action.payload };
    case 'SET_EDITING':
      return { ...state, editingTransaction: action.payload };
    case 'LOAD_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem('ff_transactions');
    if (saved) {
      try {
        dispatch({ type: 'LOAD_TRANSACTIONS', payload: JSON.parse(saved) });
      } catch {
        dispatch({ type: 'LOAD_TRANSACTIONS', payload: mockTransactions });
      }
    } else {
      dispatch({ type: 'LOAD_TRANSACTIONS', payload: mockTransactions });
    }
  }, []);

  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.darkMode]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}