import { StyleSheet, Text, View, TextInput } from "react-native";
import { useLayoutEffect } from "react";
import { IconButton } from "../components/ui/IconButton";
import { GloablStyles } from "../constants/styles";
import ExpensesContext from "../store/expenses-context";
import { useContext } from "react";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { storeExpense, deleteExpense, updateExpense } from "../utils/http";
import { useState } from "react";
import { Spinner } from "../components/ui/Spinner";
import { ErrorOverlay } from "../components/ui/ErrorOverlay";

export function ManageExpenses({ route, navigation }) {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();
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

  async function deleteExpenseHandler() {
    setIsFetching(true);
    try {
      await deleteExpense(expenseId);
      expenseCtx.deleteExpense(expenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense!");
    } finally {
      setIsFetching(false);
    }
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsFetching(true);
    try {
      if (isEditing) {
        await updateExpense(expenseId, expenseData);
        expenseCtx.updateExpense(expenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        expenseCtx.addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save expense!");
    } finally {
      setIsFetching(false);
    }
  }

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
