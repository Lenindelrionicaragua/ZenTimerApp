import React from "react";
import { View } from "react-native";
import { Octicons, Feather } from "@expo/vector-icons";
import {
  StyledInputLabel,
  StyledTextInput,
} from "../../screens/LoginScreen/LoginScreenStyles";

const TextInputLoginScreen = (props) => {
  const {
    label,
    icon,
    isPassword,
    hidePassword,
    setHidePassword,
    ...textInputProps
  } = props;

  return (
    <View testID="text-input-login-screen">
      <Octicons name={icon} size={30} color="black" testID="octicons-icon" />
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput
        testID="styled-text-input-login-screen"
        {...textInputProps}
      />
      {isPassword && (
        <Feather
          name={hidePassword ? "eye" : "eye-off"}
          size={25}
          color="lightgrey"
          onPress={() => setHidePassword(!hidePassword)}
          testID="feather-icon"
        />
      )}
    </View>
  );
};

export default TextInputLoginScreen;
