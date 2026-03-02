import { StyleSheet, Text, View } from "react-native";
import { ExpensesOutput } from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import ExpensesContext from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import { Spinner } from "../components/ui/Spinner";
import { ErrorOverlay } from "../components/ui/ErrorOverlay";

export function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState();
  const expenseContext = useContext(ExpensesContext);
  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        expenseContext.setExpense(expenses);
      } catch (error) {
        setError("Could not fetch expenses!");
      } finally {
        setIsFetching(false);
      }
    }

    getExpenses();
  }, []);

  function errorHandler() {
    setError(null);
  }

  if (isFetching) {
    return <Spinner />;
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  }

  return (
    <ExpensesOutput expenses={recentExpenses} expensesPeriod={"Last 7 days"} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
