import { Transaction, Category } from '../types/index';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const mockTransactions: Transaction[] = [

  { id: generateId(), date: '2024-01-03', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-01-05', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-01-08', description: 'Whole Foods Market', amount: 127.50, category: 'Food & Dining', type: 'expense', merchant: 'Whole Foods' },
  { id: generateId(), date: '2024-01-10', description: 'Uber Ride', amount: 18.40, category: 'Transport', type: 'expense', merchant: 'Uber' },
  { id: generateId(), date: '2024-01-12', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'expense', merchant: 'Netflix' },
  { id: generateId(), date: '2024-01-15', description: 'Freelance Project', amount: 2200, category: 'Freelance', type: 'income', merchant: 'Design Studio' },
  { id: generateId(), date: '2024-01-18', description: 'Amazon Shopping', amount: 89.99, category: 'Shopping', type: 'expense', merchant: 'Amazon' },
  { id: generateId(), date: '2024-01-20', description: 'Electricity Bill', amount: 95.00, category: 'Utilities', type: 'expense', merchant: 'City Power' },
  { id: generateId(), date: '2024-01-22', description: 'Investment Dividend', amount: 340, category: 'Investment', type: 'income', merchant: 'Fidelity' },
  { id: generateId(), date: '2024-01-25', description: 'Gym Membership', amount: 49.99, category: 'Healthcare', type: 'expense', merchant: 'FitLife Gym' },
  { id: generateId(), date: '2024-01-28', description: 'Restaurant - Date Night', amount: 76.50, category: 'Food & Dining', type: 'expense', merchant: 'La Maison' },

  { id: generateId(), date: '2024-02-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-02-03', description: 'Spotify Premium', amount: 9.99, category: 'Entertainment', type: 'expense', merchant: 'Spotify' },
  { id: generateId(), date: '2024-02-05', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-02-08', description: 'Grocery Store', amount: 152.30, category: 'Food & Dining', type: 'expense', merchant: 'Trader Joes' },
  { id: generateId(), date: '2024-02-10', description: 'Metro Pass', amount: 55.00, category: 'Transport', type: 'expense', merchant: 'City Transit' },
  { id: generateId(), date: '2024-02-14', description: "Valentine's Shopping", amount: 145.00, category: 'Shopping', type: 'expense', merchant: 'Nordstrom' },
  { id: generateId(), date: '2024-02-16', description: 'Online Course', amount: 199.00, category: 'Education', type: 'expense', merchant: 'Udemy' },
  { id: generateId(), date: '2024-02-20', description: 'Freelance Project', amount: 1800, category: 'Freelance', type: 'income', merchant: 'Tech Startup' },
  { id: generateId(), date: '2024-02-22', description: 'Internet Bill', amount: 79.99, category: 'Utilities', type: 'expense', merchant: 'Comcast' },
  { id: generateId(), date: '2024-02-25', description: 'Doctor Visit', amount: 40.00, category: 'Healthcare', type: 'expense', merchant: 'City Health Clinic' },
  { id: generateId(), date: '2024-02-28', description: 'Investment Return', amount: 520, category: 'Investment', type: 'income', merchant: 'Robinhood' },

  { id: generateId(), date: '2024-03-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-03-04', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-03-07', description: 'Whole Foods Market', amount: 183.20, category: 'Food & Dining', type: 'expense', merchant: 'Whole Foods' },
  { id: generateId(), date: '2024-03-10', description: 'Gas Station', amount: 62.00, category: 'Transport', type: 'expense', merchant: 'Shell' },
  { id: generateId(), date: '2024-03-12', description: 'Spring Wardrobe', amount: 340.00, category: 'Shopping', type: 'expense', merchant: 'Zara' },
  { id: generateId(), date: '2024-03-15', description: 'Bonus Payment', amount: 3000, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-03-18', description: 'Weekend Trip', amount: 480.00, category: 'Travel', type: 'expense', merchant: 'Airbnb' },
  { id: generateId(), date: '2024-03-20', description: 'Apple Store', amount: 129.00, category: 'Shopping', type: 'expense', merchant: 'Apple' },
  { id: generateId(), date: '2024-03-22', description: 'Pharmacy', amount: 34.50, category: 'Healthcare', type: 'expense', merchant: 'CVS Pharmacy' },
  { id: generateId(), date: '2024-03-25', description: 'Freelance Project', amount: 2800, category: 'Freelance', type: 'income', merchant: 'Creative Agency' },
  { id: generateId(), date: '2024-03-28', description: 'Water & Gas Bill', amount: 110.00, category: 'Utilities', type: 'expense', merchant: 'City Utilities' },


  { id: generateId(), date: '2024-04-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-04-03', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-04-06', description: 'Sushi Restaurant', amount: 92.00, category: 'Food & Dining', type: 'expense', merchant: 'Sakura Sushi' },
  { id: generateId(), date: '2024-04-09', description: 'Uber Eats', amount: 38.75, category: 'Food & Dining', type: 'expense', merchant: 'Uber Eats' },
  { id: generateId(), date: '2024-04-12', description: 'Concert Tickets', amount: 210.00, category: 'Entertainment', type: 'expense', merchant: 'Ticketmaster' },
  { id: generateId(), date: '2024-04-15', description: 'Investment Dividend', amount: 275, category: 'Investment', type: 'income', merchant: 'Vanguard' },
  { id: generateId(), date: '2024-04-18', description: 'Online Shopping', amount: 67.99, category: 'Shopping', type: 'expense', merchant: 'eBay' },
  { id: generateId(), date: '2024-04-20', description: 'Phone Bill', amount: 85.00, category: 'Utilities', type: 'expense', merchant: 'AT&T' },
  { id: generateId(), date: '2024-04-23', description: 'Freelance Design', amount: 1500, category: 'Freelance', type: 'income', merchant: 'StartupXYZ' },
  { id: generateId(), date: '2024-04-27', description: 'Book Store', amount: 45.50, category: 'Education', type: 'expense', merchant: 'Barnes & Noble' },

  { id: generateId(), date: '2024-05-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-05-03', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-05-06', description: 'Farmers Market', amount: 68.00, category: 'Food & Dining', type: 'expense', merchant: 'Local Market' },
  { id: generateId(), date: '2024-05-10', description: 'Bike Rental', amount: 25.00, category: 'Transport', type: 'expense', merchant: 'CityBike' },
  { id: generateId(), date: '2024-05-13', description: 'Summer Clothes', amount: 280.00, category: 'Shopping', type: 'expense', merchant: 'H&M' },
  { id: generateId(), date: '2024-05-16', description: 'Museum Tickets', amount: 38.00, category: 'Entertainment', type: 'expense', merchant: 'MoMA' },
  { id: generateId(), date: '2024-05-19', description: 'Freelance Project', amount: 3200, category: 'Freelance', type: 'income', merchant: 'Enterprise Client' },
  { id: generateId(), date: '2024-05-22', description: 'Dental Checkup', amount: 120.00, category: 'Healthcare', type: 'expense', merchant: 'Downtown Dental' },
  { id: generateId(), date: '2024-05-25', description: 'Electric Bill', amount: 88.00, category: 'Utilities', type: 'expense', merchant: 'City Power' },
  { id: generateId(), date: '2024-05-28', description: 'Investment Gains', amount: 890, category: 'Investment', type: 'income', merchant: 'Charles Schwab' },

  { id: generateId(), date: '2024-06-01', description: 'Monthly Salary', amount: 8500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-06-03', description: 'Rent Payment', amount: 1800, category: 'Rent', type: 'expense', merchant: 'Skyline Properties' },
  { id: generateId(), date: '2024-06-06', description: 'Beach Vacation', amount: 1250.00, category: 'Travel', type: 'expense', merchant: 'Marriott Hotels' },
  { id: generateId(), date: '2024-06-10', description: 'Rooftop Dinner', amount: 145.00, category: 'Food & Dining', type: 'expense', merchant: 'Sky Bar & Grill' },
  { id: generateId(), date: '2024-06-13', description: 'Car Rental', amount: 320.00, category: 'Transport', type: 'expense', merchant: 'Hertz' },
  { id: generateId(), date: '2024-06-16', description: 'Streaming Bundle', amount: 24.99, category: 'Entertainment', type: 'expense', merchant: 'Disney+' },
  { id: generateId(), date: '2024-06-19', description: 'Summer Bonus', amount: 2500, category: 'Salary', type: 'income', merchant: 'Acme Corp' },
  { id: generateId(), date: '2024-06-22', description: 'Sunglasses & Gear', amount: 195.00, category: 'Shopping', type: 'expense', merchant: 'REI' },
  { id: generateId(), date: '2024-06-25', description: 'Freelance Web Dev', amount: 2100, category: 'Freelance', type: 'income', merchant: 'Local Business' },
  { id: generateId(), date: '2024-06-28', description: 'Investment Portfolio', amount: 1100, category: 'Investment', type: 'income', merchant: 'Fidelity' },
];

export const categoryColors: Record<string, string> = {
  'Salary': '#22c55e',
  'Freelance': '#10b981',
  'Investment': '#6ee7b7',
  'Food & Dining': '#f59e0b',
  'Transport': '#3b82f6',
  'Shopping': '#ec4899',
  'Entertainment': '#8b5cf6',
  'Healthcare': '#06b6d4',
  'Utilities': '#64748b',
  'Rent': '#ef4444',
  'Education': '#f97316',
  'Travel': '#14b8a6',
  'Other': '#94a3b8',
};

export const allCategories: Category[] = [
  'Salary', 'Freelance', 'Investment', 'Food & Dining', 'Transport',
  'Shopping', 'Entertainment', 'Healthcare', 'Utilities', 'Rent',
  'Education', 'Travel', 'Other'
];