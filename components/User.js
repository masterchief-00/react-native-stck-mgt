import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import avatar from "../assets/images/avatar.jpg";
import { colours } from "../colours";
import { useDispatch, useSelector } from "react-redux";
import { ThemeActions } from "../redux/appThemeSlice";
import { API_URL } from "@env";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const User = () => {
  const appTheme = useSelector((state) => state.theme.light);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();

  const handleTheme = (value) => {
    dispatch(ThemeActions.setTheme(value));
  };

  const userName = userData.name;
  const userType =
    userData.user_type === "DLV"
      ? "Shipping manager"
      : userData.user_type === "WHS"
      ? "Warehouse manager"
      : userData.user_type === "DRV"
      ? "Driver"
      : userData.user_type === "ADM"
      ? "Administrator"
      : "Customer";

  const handleLogout = async () => {
    await axios({
      method: "post",
      url: `${API_URL}/logout`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          navigation.navigate("Login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
        paddingHorizontal: 15,
      }}
    >
      <TouchableOpacity
        // onPress={() => navigation.navigate("User")}
        activeOpacity={0.8}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <Image
          source={avatar}
          style={{ borderRadius: 50, height: 40, width: 40 }}
          resizeMode="contain"
        />
        <View>
          <Text
            style={{
              color: colours.primary_variant,
              fontSize: 18,
              fontWeight: "bold",
              marginLeft: 10,
              textTransform: "capitalize",
            }}
          >
            {userName}
          </Text>
          <Text
            style={{
              color: colours.primary_variant,
              fontSize: 12,
              fontWeight: "400",
              marginLeft: 10,
            }}
          >
            {userType}
          </Text>
        </View>
      </TouchableOpacity>
      <View>
        {appTheme ? (
          <TouchableOpacity
            onPress={() => handleTheme(false)}
            activeOpacity={0.5}
          >
            <MaterialCommunityIcons
              name="weather-night"
              size={24}
              color={colours.primary}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => handleTheme(true)}
            activeOpacity={0.5}
          >
            <Feather name="sun" size={24} color={colours.primary} />
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        style={{ flexDirection: "row-reverse", alignItems: "center" }}
        onPress={handleLogout}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 10,
            color: colours.primary,
            marginHorizontal: 9,
          }}
        >
          LOG OUT
        </Text>
        <AntDesign name="logout" size={20} color={colours.primary_variant} />
      </TouchableOpacity>
    </View>
  );
};

export default User;
