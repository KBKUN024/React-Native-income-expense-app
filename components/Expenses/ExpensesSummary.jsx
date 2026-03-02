import { View, Text, StyleSheet } from "react-native";
import { GloablStyles } from "../../constants/styles";

export function ExpensesSummary({ expenses, periodName }) {
  const expensesSum = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GloablStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GloablStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GloablStyles.colors.primary500,
  },
});
