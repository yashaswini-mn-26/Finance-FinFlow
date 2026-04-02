export type TransactionType = 'income' | 'expense';

export type Category =
  | 'Salary'
  | 'Freelance'
  | 'Investment'
  | 'Food & Dining'
  | 'Transport'
  | 'Shopping'
  | 'Entertainment'
  | 'Healthcare'
  | 'Utilities'
  | 'Rent'
  | 'Education'
  | 'Travel'
  | 'Other';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: Category;
  type: TransactionType;
  merchant?: string;
  note?: string;
}

export type Role = 'admin' | 'viewer';

export type SortField = 'date' | 'amount' | 'category' | 'description';
export type SortDirection = 'asc' | 'desc';

export interface FilterState {
  search: string;
  type: TransactionType | 'all';
  category: Category | 'all';
  dateFrom: string;
  dateTo: string;
  amountMin: string;
  amountMax: string;
}

export interface SortState {
  field: SortField;
  direction: SortDirection;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface CategorySpend {
  category: Category;
  amount: number;
  percentage: number;
  color: string;
}