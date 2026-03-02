import axios from "axios";

const BACKEND_URL =
  "https://react-native-income-expense-default-rtdb.asia-southeast1.firebasedatabase.app/expenses";

export async function storeExpense(expenseData) {
  const response = await axios.post(`${BACKEND_URL}.json`, expenseData);
  return response.data.name; // name就是firebase自动生成的id字段
}

export async function fetchExpenses() {
  const response = await axios.get(`${BACKEND_URL}.json`);
  const expenses = [];
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export async function updateExpense(id, expenseData) {
  return axios.put(`${BACKEND_URL}/${id}.json`, expenseData);
}

export async function deleteExpense(id) {
  return axios.delete(`${BACKEND_URL}/${id}.json`);
}
