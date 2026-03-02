import { Alert, StyleSheet, Text, View } from "react-native";
import { GloablStyles } from "../../constants/styles";
import { Input } from "./Input";
import { useState } from "react";
import { Button } from "../ui/Button";
import { getFormattedDate } from "../../utils/date";

export function ExpenseForm({
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? String(defaultValues.amount) : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((currentInputs) => ({
      ...currentInputs,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //   Alert.alert("Invalid input", "Please check your input values");
      setInputs((currentInputs) => ({
        amount: { value: currentInputs.amount.value, isValid: amountIsValid },
        date: { value: currentInputs.date.value, isValid: dateIsValid },
        description: {
          value: currentInputs.description.value,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("amount", value),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (value) => inputChangedHandler("date", value),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCorrect: false,
          onChangeText: (value) => inputChangedHandler("description", value),
          value: inputs.description.value,
        }}
      />
      {!inputs.amount.isValid && (
        <Text style={styles.errorText}>Please enter a valid amount.</Text>
      )}
      {!inputs.date.isValid && (
        <Text style={styles.errorText}>Please enter a valid date.</Text>
      )}
      {!inputs.description.isValid && (
        <Text style={styles.errorText}>Please enter a valid description.</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode={"flat"} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: GloablStyles.colors.primary50,
    marginBottom: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GloablStyles.colors.primary200,
    alignItems: "center",
  },
  errorText: {
    color: GloablStyles.colors.error500,
    fontSize: 14,
    marginTop: 4,
    textAlign: "center",
  },
});
