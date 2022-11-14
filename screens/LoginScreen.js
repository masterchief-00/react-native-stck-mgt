import React from "react";
import { Text, View, TextInput, Button } from "react-native";
import { StatusBar } from "expo-status-bar";
import { colours } from "../colours";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="light" backgroundColor={colours.primary} />
      <View style={{ marginTop: "8%" }}>
        <View
          style={{
            backgroundColor: colours.primary,
            height: "55%",
            borderBottomLeftRadius: 70,
            borderBottomLeftWidth: 1,
            borderLeftColor: "transparent",
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
            source={require("../assets/animations/login.json")}
            autoPlay
            speed={0.8}
            loop={true}
            resizeMode="cover"
          />
          <Text
            style={{
              color: colours.bg,
              marginTop: 30,
              fontWeight: "bold",
              fontSize: 25,
            }}
          >
            LOGIN
          </Text>
        </View>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 50,
            width: "100%",
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
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.primary_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Email"
                  textAlign="center"
                  placeholderTextColor={colours.primary_variant}
                />
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.primary_variant,
                    width: "70%",
                    color: colours.primary_variant,
                    marginBottom: 10,
                  }}
                  placeholder="Password"
                  textAlign="center"
                  placeholderTextColor={colours.primary_variant}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    marginTop: 20,
                  }}
                >
                  <CustomButton
                    text="Login"
                    onPress={handleSubmit}
                    title="Submit"
                  />
                  <CustomButton
                    text="Sign up"
                    onPress={() => navigation.navigate("Signup")}
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
