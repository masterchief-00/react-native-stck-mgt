import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AntDesign, MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import avatar from "../assets/images/avatar.jpg";
import { colours } from "../colours";
import { useDispatch, useSelector } from "react-redux";
import { ThemeActions } from "../redux/appThemeSlice";

const User = () => {
  const appTheme = useSelector((state) => state.theme.light);
  const dispatch = useDispatch();

  const handleTheme = (value) => {
    dispatch(ThemeActions.setTheme(value));
  };

  const userName = "John Doe";
  const userType = "Warehouse manager";

  // useEffect(() => {
  //   console.log(appTheme);
  // }, []);
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
