import { useState } from "react";
import { getTotalExpenses } from "../api";

const TotalExpenses = () => {
  const [dates, setDates] = useState({ start: "", end: "" });
  const [total, setTotal] = useState(0);

  const fetchTotal = async () => {
    if (!dates.start || !dates.end) {
      alert("Both start and end dates are required!");
      return;
    }

    const response = await getTotalExpenses(dates.start, dates.end);
    setTotal(response.data.total);
  };

  return (
    <div>
      <h2>Total Expenses</h2>
      <input type="date" onChange={(e) => setDates({ ...dates, start: e.target.value })} />
      <input type="date" onChange={(e) => setDates({ ...dates, end: e.target.value })} />
      <button onClick={fetchTotal}>Calculate</button>
      <h3>Total: ₹ {total}</h3>
    </div>
  );
};

export default TotalExpenses;
