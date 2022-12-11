import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colours } from "../colours";

const CustomButton = ({
  onPress,
  text,
  bg = colours.primary,
  color = colours.bg,
  width = 80,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: disabled ? colours.bg_variant : bg,
        width: width,
        padding: 10,
        height: 45,
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 0.6,
        borderColor: color,
        marginTop: 15,
        marginHorizontal: "4%",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: color, fontWeight: "bold", fontSize: 15 }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
