import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function IconButton({ icon, size = 20, onPress, color }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        pressed && styles.pressed,
        styles.pressableContainer,
      ]}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  pressableContainer: {
    borderRadius: 18,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
