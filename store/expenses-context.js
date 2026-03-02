import { createContext, useReducer } from "react";
import { DUMMY_EXPENSES } from "../data/dummy-expense";

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expenseReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      //   const id = new Date().toString() + Math.random().toString(); firebase会自动生成id，所以这里不需要自己生成了
      return [{ ...action.payload }, ...state];
    case "SET":
      const inverted = action.payload.reverse(); // 这里要反转一下，因为从数据库获取的顺序是旧的在前面，新的在后面
      return inverted;
    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expenseReducer, []);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }
  function setExpense(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }
  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    setExpense: setExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export { ExpensesContextProvider };

export default ExpensesContext;
