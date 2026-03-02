import { Text, TextInput, View, StyleSheet } from "react-native";
import { GloablStyles } from "../../constants/styles";

export function Input({ label, style, textInputConfig, invalid }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={[
          styles.input,
          textInputConfig?.multiline && styles.inputMultiline,
          invalid && styles.invalidInput,
        ]}
        {...textInputConfig}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 4,
  },
  label: {
    fontSize: 12,
    color: GloablStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GloablStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GloablStyles.colors.primary700,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidInput: {
    backgroundColor: GloablStyles.colors.error100,
    borderColor: GloablStyles.colors.error500,
    borderWidth: 1,
  },
  invalidLabel: {
    color: GloablStyles.colors.error500,
  },
});
