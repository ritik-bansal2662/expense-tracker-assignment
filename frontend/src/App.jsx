import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalExpenses from "./components/TotalExpenses";

function App() {

  return (
    <div className="app-container p-5">
        <h1>Expense Tracker</h1>
        <ExpenseForm onExpenseAdded={() => window.location.reload()} />
        <ExpenseList />
        <TotalExpenses />
    </div>
  )
}

export default App
