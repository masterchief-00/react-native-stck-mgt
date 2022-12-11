import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Keyboard,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colours } from "../colours";
import LottieView from "lottie-react-native";
import { Formik } from "formik";
import CustomButton from "../components/CustomButton";
import { useDispatch } from "react-redux";
import { UserActions } from "../redux/UserSlice";
import { CategoryActions } from "../redux/CategorySlice";
import axios from "axios";
import { API_URL } from "@env";
import { Feather, Entypo } from "@expo/vector-icons";

export default function SignupScreen({ navigation }) {
  const [isKeyBoardVisible, setKeyboardVisibility] = useState(false);
  const dispatch = useDispatch();
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [activeModal, setActiveModal] = useState("password");
  const [loginError, setLoginError] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);

  const handleSignupError = () => {
    setActiveModal("error");
    setLoginError("The data provided might be invalid!");
    setmodalVisible(true);
    setIndicatorVisibility(false);
  };

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
            initialValues={{
              names: "",
              email: "",
              phone: "",
              id_no: "",
              password: "",
              password_confirmation: "",
            }}
            onSubmit={async (values) => {
              setIndicatorVisibility(true);

              await axios({
                method: "post",
                url: `${API_URL}/signup`,
                data: {
                  name: values.names,
                  phone: values.phone,
                  ID_NO: values.id_no,
                  email: values.email,
                  password: values.password,
                  password_confirmation: values.password_confirmation,
                  user_type: null,
                  image: null,
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    dispatch(
                      UserActions.setUserData({
                        name: response.data.user.name,
                        email: response.data.user.email,
                        user_type: response.data.user.user_type,
                        ID_NO: response.data.user.ID_NO,
                        phone: response.data.user.phone,
                        image: response.data.user.image,
                      })
                    );
                    dispatch(UserActions.setToken(response.data.token));
                    dispatch(
                      UserActions.setPermissions({
                        list: response.data.permissions,
                      })
                    );
                    dispatch(
                      CategoryActions.setCategories({
                        list: response.data.categories,
                      })
                    );
                    navigation.navigate("Dashboard");
                  }
                })
                .catch((error) => {
                  console.log(error);
                  handleSignupError();
                });
            }}
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
                    color: colours.bg,
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
                    color: colours.bg,
                    marginBottom: 10,
                  }}
                  placeholder="Email"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <TextInput
                  onChangeText={handleChange("phone")}
                  onBlur={handleBlur("phone")}
                  value={values.phone}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.bg,
                    marginBottom: 10,
                  }}
                  placeholder="Phone"
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
                    color: colours.bg,
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
                    color: colours.bg,
                    marginBottom: 10,
                  }}
                  placeholder="Password"
                  textAlign="center"
                  placeholderTextColor={colours.bg_variant}
                />
                <TextInput
                  secureTextEntry
                  onChangeText={handleChange("password_confirmation")}
                  onBlur={handleBlur("password_confirmation")}
                  value={values.password_confirmation}
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: colours.bg_variant,
                    width: "70%",
                    color: colours.bg,
                    marginBottom: 10,
                  }}
                  placeholder="Confirm password"
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
                    disabled={indicatorVisible}
                  />
                  <CustomButton
                    text="Login"
                    onPress={() => navigation.navigate("Login")}
                    title="Submit"
                    bg={colours.bg}
                    color={colours.primary}
                    disabled={indicatorVisible}
                  />
                </View>
                <View
                  style={{
                    alignItems: "center",
                  }}
                >
                  {indicatorVisible && (
                    <ActivityIndicator
                      size="large"
                      color={colours.bg}
                      style={{ marginBottom: 10 }}
                    />
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>

        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View
            style={{
              backgroundColor: colours.black_a,
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {activeModal === "error" && (
              <View
                style={{
                  width: "90%",
                  height: "10%",
                  borderWidth: 1,
                  borderRadius: 10,
                  borderColor: colours.primary,
                  backgroundColor: colours.bg,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    color: colours.primary,
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Something went wrong!
                </Text>
                <Text
                  style={{
                    color: colours.primary,
                    fontWeight: "300",
                    fontSize: 12,
                  }}
                >
                  {loginError}
                </Text>
                <View
                  style={{
                    position: "absolute",
                    top: -25,
                    right: 15,
                    backgroundColor: colours.bg,
                    borderWidth: 1,
                    borderRadius: 7,
                    borderBottomWidth: 0,
                    borderColor: colours.primary_variant_x,
                  }}
                >
                  <TouchableOpacity onPress={() => setmodalVisible(false)}>
                    <Entypo name="cross" size={30} color={colours.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </Modal>
      </View>
    </View>
  );
}
