import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getExpenses = (category, date) => {
  let url = `${API_URL}/expenses`;
  const params = new URLSearchParams();
  if (category) params.append("category", category);
  if (date) params.append("date", date);
  if (params.toString()) url += `?${params.toString()}`;

  console.log('url: ', url);
  
  return axios.get(url);
};

export const addExpense = (expense) => axios.post(`${API_URL}/expenses`, expense);

export const getTotalExpenses = (start, end) =>
  axios.get(`${API_URL}/expenses/total?start=${start}&end=${end}`);
