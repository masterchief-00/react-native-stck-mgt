import React, { useState, useEffect } from "react";
import { Text, View, TextInput, Keyboard } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colours } from "../colours";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";

export default function SignupScreen({ navigation }) {
  const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisibility(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisibility(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="dark" backgroundColor={colours.bg} />
      <View style={{ marginTop: "8%", flex: 1 }}>
        {!isKeyBoardVisible && (
          <View
            style={{
              backgroundColor: colours.bg,
              alignItems: "center",
            }}
          >
            <LottieView
              style={{
                height: 160,
                width: 160,
                alignSelf: "center",
                marginVertical: 30,
              }}
              source={require("../assets/animations/registration.json")}
              autoPlay
              speed={0.8}
              loop={true}
              resizeMode="cover"
            />
            <Text
              style={{
                color: colours.primary,
                marginVertical: 20,
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              SIGN UP
            </Text>
          </View>
        )}

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            flex: 1,
            Bottom: 0,
            borderTopRightRadius: 70,
            borderTopRightWidth: 1,
            borderLeftColor: "transparent",
            backgroundColor: colours.primary,
          }}
        >
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values) => console.log(values)}
          >
            {({ handleChange, handleBlur, handleSubmit, values }) => (
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextInput
                  onChangeText={handleChange("names")}
                  onBlur={handleBlur("names")}
                  value={values.names}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Names"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <TextInput
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Email"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <TextInput
                  onChangeText={handleChange("address")}
                  onBlur={handleBlur("address")}
                  value={values.address}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Address"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <TextInput
                  onChangeText={handleChange("id_no")}
                  onBlur={handleBlur("id_no")}
                  value={values.id_no}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Identity card number"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                  keyboardType="numeric"
                />
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Password"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 20,
                  }}
                >
                  <CustomButton
                    text="Sign up"
                    onPress={handleSubmit}
                    title="Submit"
                  />
                  <CustomButton
                    text="Login"
                    onPress={() => navigation.navigate("Login")}
                    title="Submit"
                    bg={colours.bg}
                    color={colours.primary}
                  />
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </View>
  );
}
