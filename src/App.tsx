
import { useApp } from './context/Appcontext';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MobileNav from './components/MobileNav';
import DashboardView from './components/Dashboard';
import TransactionsView from './components/TransactionsView';
import InsightsView from './components/InsightsView';

function AppContent() {
  const { state } = useApp();

  return (
    <div className={`min-h-screen ${state.darkMode ? 'dark' : ''}`}>

      <div className="hidden md:block">
        <Sidebar />
      </div>

      <div className="md:ml-64 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {state.activeView === 'dashboard' && <DashboardView />}
          {state.activeView === 'transactions' && <TransactionsView />}
          {state.activeView === 'insights' && <InsightsView />}
        </main>
      </div>

      Mobile Nav
      <MobileNav />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}