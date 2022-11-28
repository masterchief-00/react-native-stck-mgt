import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";
import { AntDesign } from "@expo/vector-icons";
import Modal_elite from "./Modal_elite";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = useSelector((state) => state.category.categories);

  const findCategories = (category_id) => {
    let category = categories.find((item) => item.id === category_id);

    return category.name;
  };
  return (
    <View
      style={{
        marginBottom: 10,
        flexDirection: "row",
        borderBottomColor: colours.bg_variant,
        borderBottomWidth: 1,
        paddingBottom: 8,
      }}
    >
      <Image
        source={product_img}
        resizeMode="stretch"
        style={{
          height: 80,
          width: 120,
          borderRadius: 5,
        }}
      />
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 5,
          width: 210,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: colours.primary_variant,
            }}
          >
            {product.name}
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
            {findCategories(product.category_id)}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "500",
              opacity: 1,
              color: colours.primary_variant_x,
            }}
          >
            {product.quantity} in stock
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: colours.primary_variant,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            ${product.unit_price}
          </Text>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            backgroundColor: colours.bg,
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginBottom: 40,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              paddingHorizontal: 30,
              zIndex: 3,
            }}
          >
            <Text
              style={{
                color: colours.primary_variant,
                fontWeight: "bold",
                fontSize: 25,
                textTransform: "uppercase",
              }}
            >
              Product details
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign
                name="closecircle"
                size={35}
                color={colours.primary_variant}
              />
            </TouchableOpacity>
          </View>
          <Modal_elite product_img={product_img} />
        </View>
      </Modal>
    </View>
  );
};

export default ProductCard;
