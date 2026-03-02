import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import { GloablStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";

export function ExpensesItem({ id, description, amount, date }) {
  const navigation = useNavigation();

  function pressHandler() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={pressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View style={[styles.amountContainer, styles.dateContainer]}>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={[styles.textBase, styles.amount]}>
            {amount.toFixed(2)}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GloablStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GloablStyles.colors.gray500,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  textBase: {
    color: GloablStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minWidth: 80,
  },
  dateContainer: {
    backgroundColor: "transparent",
    alignItems: "flex-start",
  },
  amount: {
    color: GloablStyles.colors.primary500,
    fontWeight: "bold",
  },
  pressed: {
    opacity: 0.75,
  },
});
