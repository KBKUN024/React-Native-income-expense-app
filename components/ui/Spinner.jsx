import { View, ActivityIndicator } from "react-native";
import { GloablStyles } from "../../constants/styles";

export function Spinner() {
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
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
}
