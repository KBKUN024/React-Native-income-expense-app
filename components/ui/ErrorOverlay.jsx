import { View, Text, StyleSheet } from "react-native";
import { GloablStyles } from "../../constants/styles";
import { Button } from "./Button";

export function ErrorOverlay({ message, onConfirm }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        backgroundColor: GloablStyles.colors.primary700,
      }}
    >
      <Text style={styles.title}>An error occurred!</Text>
      <Text style={styles.message}>{message}</Text>
      <Button onPress={onConfirm} style={{ marginTop: 8 }}>
        Try again
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    color: GloablStyles.colors.primary200,
    fontSize: 16,
    textAlign: "center",
  },
  title:{
    fontSize: 20,
    fontWeight: "bold",
    color: GloablStyles.colors.error500,
    marginBottom: 8,
  },
  message: {
    color: GloablStyles.colors.primary200,
    fontSize: 14,
    textAlign: "center",
  },
});
