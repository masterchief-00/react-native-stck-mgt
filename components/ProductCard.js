import React from "react";
import { View, Text, Image } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";

const ProductCard = () => {
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
      }}
    >
      <Image
        source={product_img}
        resizeMode="stretch"
        style={{ height: 80, width: 120, borderRadius: 5 }}
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          backgroundColor: "red",
          width: 210,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text style={{ fontWeight: "bold", color: colours.primary_variant }}>
            HP Printer
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "300",
              opacity: 1,
              color: colours.primary_variant_x,
              fontStyle: "italic",
            }}
          >
            Electronics
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              opacity: 1,
              color: colours.primary_variant_x,
            }}
          >
            157 in stock
          </Text>
        </View>
        <View>
          <Text>$690</Text>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
