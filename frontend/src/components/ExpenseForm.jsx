import { useState } from "react";
import { addExpense } from "../api";

const ExpenseForm = ({ onExpenseAdded }) => {
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    category: "",
    date: "",
  });

  const categories = ['Food', 'Travel', 'Rent', 'House Items', 'Fees', 'EMI', 'Repair', 'Company', 'Miscellaneous', 'other']

  const handleChange = (e) => {
    setExpense({ ...expense, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('expense: ', expense);
    
    if (!expense.description || !expense.amount || !expense.category || !expense.date) {
      alert("All fields are required!");
      return;
    }

    await addExpense(expense);
    setExpense({ description: "", amount: "", category: "", date: "" });
    onExpenseAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form ">

        <div className="col-12 col-md-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
            <input type="text" name="description" value={expense.description} onChange={handleChange} placeholder="Description" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        </div>
        <div className="col-12 col-md-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount</label>
            <input type="number" name="amount" value={expense.amount} onChange={handleChange} placeholder="Amount" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
      </div>

      <div className="col-12 col-md-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select name="category" id="category" value={expense.category} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option value="">Select Category</option>
                {categories && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
        </div>
        <div className="col-12 col-md-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
            <input type="date" name="date" id="date" value={expense.date} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
        </div>
      <button type="submit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
