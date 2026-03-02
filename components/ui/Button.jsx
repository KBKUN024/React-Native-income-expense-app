import { GloablStyles } from "../../constants/styles";
import { Pressable, Text, View, StyleSheet } from "react-native";
export function Button({ children, mode, onPress, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 4,
    overflow: "hidden",
  },
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GloablStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent",
    padding: 6,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GloablStyles.colors.primary200,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GloablStyles.colors.primary100,
    borderRadius: 4,
  },
});
