import { useState } from "react";
import { getExpenses } from "../api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });

  const categories = ['Food', 'Travel', 'Rent', 'House Items', 'Fees', 'EMI', 'Repair', 'Company', 'Miscellaneous', 'other']

  const fetchExpenses = async () => {
    const response = await getExpenses(filters.category, filters.date);
    console.log('expenses response: ', response);
    
    setExpenses(response.data);
  };

//   useEffect(() => {
//     fetchExpenses();
//   }, [filters]);

  return (
    <div>
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Expenses</h2>
        <div className="filters">
            <select name="category" id="category" onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
                <option value="">Select Category</option>
                {categories && categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                ))}
            </select>
            <input type="date" id="date" onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
            <button type="button" onClick={fetchExpenses}>Filter</button>
        </div>
        
        <ul>
            {expenses && expenses.map((exp) => (
                <li key={exp.id}>
                    {exp.description} - ₹{exp.amount} ({exp.category}) on {exp.date}
                </li>
            ))}
        </ul>
    </div>
  );
};

export default ExpenseList;
