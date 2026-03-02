import { StyleSheet, Text, View, TextInput } from "react-native";
import { useLayoutEffect } from "react";
import { IconButton } from "../components/ui/IconButton";
import { GloablStyles } from "../constants/styles";
import ExpensesContext from "../store/expenses-context";
import { useContext } from "react";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";

export function ManageExpenses({ route, navigation }) {
  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const expenseCtx = useContext(ExpensesContext);
  const selectedExpense = expenseCtx.expenses.find(
    (expense) => expense.id === expenseId,
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expenseCtx.deleteExpense(expenseId);
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  function confirmHandler(expenseData) {
    if (isEditing) {
      expenseCtx.updateExpense(expenseId, expenseData);
    } else {
      expenseCtx.addExpense(expenseData);
    }
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={32}
            color={GloablStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GloablStyles.colors.primary800,
  },

  deleteContainer: {
    alignItems: "center",
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GloablStyles.colors.primary200,
  },
  input: {
    backgroundColor: GloablStyles.colors.primary50,
    color: GloablStyles.colors.primary700,
    padding: 8,
    borderRadius: 6,
    marginVertical: 8,
  },
});
