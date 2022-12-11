import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { colours } from "../colours";
import LottieView from "lottie-react-native";
import { Formik, setIn } from "formik";
import CustomButton from "../components/CustomButton";
import { API_URL } from "@env";
import axios from "axios";
import { useDispatch } from "react-redux";
import { UserActions } from "../redux/UserSlice";
import { CategoryActions } from "../redux/CategorySlice";
import { Feather, Entypo } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [activeModal, setActiveModal] = useState("password");
  const [loginError, setLoginError] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const isFocused = useIsFocused();

  const handleLoginError = () => {
    setActiveModal("error");
    setLoginError("The credentials entered are invalid!");
    setmodalVisible(true);
    setIndicatorVisibility(false);
  };

  useEffect(() => {
    if (isFocused) {
      setIndicatorVisibility(false);
      dispatch(UserActions.clearUserData());
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="light" backgroundColor={colours.primary} />
      <View style={{ marginTop: "8%" }}>
        <View
          style={{
            backgroundColor: colours.primary,
            height: indicatorVisible ? "40%" : "55%",
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
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              setIndicatorVisibility(true);

              await axios({
                method: "post",
                url: `${API_URL}/login`,
                data: {
                  email: values.email,
                  password: values.password,
                },
              })
                .then((response) => {
                  if (response.status === 200) {
                    // console.log(response.data.permissions);
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
                  handleLoginError();
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
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <CustomButton
                    text="Login"
                    onPress={handleSubmit}
                    title="Submit"
                    disabled={indicatorVisible}
                  />
                  <CustomButton
                    text="Sign up"
                    onPress={() => navigation.navigate("Signup")}
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
                      color={colours.primary}
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
