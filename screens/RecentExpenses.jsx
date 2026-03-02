import { StyleSheet, Text, View } from "react-native";
import { ExpensesOutput } from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import ExpensesContext from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

export function RecentExpenses() {
  const expenseContext = useContext(ExpensesContext);
  const recentExpenses = expenseContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });
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
