import { View, Text, StyleSheet } from "react-native";
import { ExpensesSummary } from "./ExpensesSummary";
import { ExpensesList } from "./ExpensesList";
import { GloablStyles } from "../../constants/styles";

export function ExpensesOutput({ expenses, expensesPeriod }) {
  let content = (
    <View style={styles.container}>
      <Text style={styles.infoText}>No expenses found for this period.</Text>
    </View>
  );
  if (expenses.length > 0) {
    content = (
      <View style={styles.container}>
        <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
        <ExpensesList expenses={expenses} />
      </View>
    );
  }
  return content;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    backgroundColor: GloablStyles.colors.primary700,
  },
  infoText: {
    color: GloablStyles.colors.primary200,
    fontSize: 16,
    textAlign: "center",
  },
});
