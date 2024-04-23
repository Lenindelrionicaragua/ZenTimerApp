import React, { useState } from "react";
import { StatusBar } from "react-native";
import KeyboardAvoider from "../../component/KeyboardAvoider/KeyboardAvoider";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Formik } from "formik";
import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  FooterView,
  FooterText,
  FooterLink,
  FooterLinkContent,
} from "./SignupScreenStyles";
import { Colors } from "../../styles/AppStyles";
import TextInputSignupScreen from "../../component/TextInputSignupScreen/TextInputSignupScreen";

// Colors
const { lightGrey } = Colors;

const SignupScreen = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [userBirthDay, setUserBirthDay] = useState();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setUserBirthDay(currentDate);
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <KeyboardAvoider>
      <StyledContainer testID="styled-container">
        <StatusBar style="dark" />
        <InnerContainer testID="inner-container">
          <PageTitle testID="page-title">ZenTimer</PageTitle>
          <SubTitle testID="sub-title">Account Sign Up</SubTitle>

          {show && (
            <DateTimePicker
              testID="date-time-picker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

          <Formik
            initialValues={{
              fullName: "",
              email: "",
              dateOfBirth: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values) => {
              console.log(values);
              navigation.navigate("WelcomeScreen");
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <StyledFormArea>
                <TextInputSignupScreen
                  label="Full Name"
                  icon="person"
                  placeholder="Zen User"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("fullName")}
                  onblur={handleBlur("fullName")}
                  value={values.fullName}
                  testID="full-name"
                />

                <TextInputSignupScreen
                  label="Email Address"
                  icon="mail"
                  placeholder="serenity@gmail.com"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("email")}
                  onblur={handleBlur("email")}
                  value={values.email}
                  keyboardType="email-address"
                  testID="email-input"
                />

                <TextInputSignupScreen
                  label="Date of Birth"
                  icon="calendar"
                  placeholder="YYYY - MM - DD"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("dateOfBirth")}
                  onblur={handleBlur("dateOfBirth")}
                  value={userBirthDay ? userBirthDay.toDateString() : ""}
                  testID="date-of-birth"
                  isDate={true}
                  editable={false}
                  showDatePicker={showDatePicker}
                />

                <TextInputSignupScreen
                  label="Password"
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("password")}
                  onblur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  testID="password-input"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />

                <TextInputSignupScreen
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * *"
                  placeholderTextColor={lightGrey}
                  onChangeText={handleChange("confirmPassword")}
                  onblur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  testID="confirm-password-input"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox testID="msg-box">...</MsgBox>
                <StyledButton
                  testID="login-styled-button"
                  onPress={handleSubmit}
                >
                  <ButtonText testID="login-button-text">Sign Up</ButtonText>
                </StyledButton>
                <Line testID="line" />
                <FooterView testID="footer-view">
                  <FooterText testID="footer-text">
                    Already have an account?
                  </FooterText>
                  <FooterLink
                    onPress={() => navigation.navigate("LoginScreen")}
                    testID="footer-login-link"
                  >
                    <FooterLinkContent testID="footer-login-link-content">
                      Login
                    </FooterLinkContent>
                  </FooterLink>
                </FooterView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoider>
  );
};

export default SignupScreen;
