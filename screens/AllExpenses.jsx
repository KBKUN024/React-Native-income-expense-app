import { StyleSheet, Text, View } from "react-native";
import { ExpensesOutput } from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import ExpensesContext from "../store/expenses-context";

export function AllExpenses() {
  const expenseContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput
      expenses={expenseContext.expenses}
      expensesPeriod={"Total"}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
