import React from "react";
import { View, Text, Image } from "react-native";
import { colours } from "../colours";

const Modal_elite = ({ product_img }) => {
  const data = {
    productName: "HP Printer",
    productCategory: "Electronics",
    productQty: 157,
    productPrice: "$690",
    productSKU: "EL-PR-123",
  };

  return (
    <View
      style={{
        backgroundColor: colours.primary,
        width: "100%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingBottom: 30,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20%",
        }}
      >
        <Text
          style={{
            color: colours.bg,
            fontWeight: "300",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          {data.productName}
        </Text>
        <Text
          style={{
            color: colours.bg,
            fontWeight: "300",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          {data.productCategory}
        </Text>
        <Text
          style={{
            color: colours.bg,
            fontWeight: "300",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          {data.productQty} available
        </Text>
        <Text
          style={{
            color: colours.bg,
            fontWeight: "300",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          {data.productSKU}
        </Text>
        <Text
          style={{
            color: colours.bg,
            fontWeight: "300",
            fontSize: 20,
            marginBottom: 5,
          }}
        >
          {data.productPrice} per unit
        </Text>
        <Image
          source={product_img}
          resizeMode="stretch"
          style={{ height: 80, width: 120, borderRadius: 5 }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          backgroundColor: colours.bg,
          height: 100,
          width: 140,
          marginLeft: 110,
          marginTop: -80,
          borderRadius: 25,
        }}
      >
        <View
          style={{
            backgroundColor: colours.bg_variant,
            height: 8,
            width: 100,
            position: "absolute",
            top: 80,
            left: "14%",
            borderRadius: 50,
          }}
        />
      </View>
    </View>
  );
};

export default Modal_elite;
