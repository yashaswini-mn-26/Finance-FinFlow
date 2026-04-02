
import FilterBar from './FilterBar';
import TransactionTable from './TransactionTable';
import TransactionModal from './TransactionModal';
import { useApp } from '../context/Appcontext';

export default function TransactionsView() {
  const { state, dispatch } = useApp();

  const handleClose = () => {
    dispatch({ type: 'SET_ADD_MODAL', payload: false });
    dispatch({ type: 'SET_EDITING', payload: null });
  };

  return (
    <div className="space-y-4">
      <FilterBar />
      <TransactionTable />
      {state.isAddModalOpen && (
        <TransactionModal
          onClose={handleClose}
          editing={state.editingTransaction}
        />
      )}
    </div>
  );
}