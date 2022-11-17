import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import Modal_elite from "./Modal_elite";

const ProductCard = ({ type = "product" }) => {
  const [modalVisible, setModalVisible] = useState(false);

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
          height: type === "order" ? 60 : 80,
          width: type === "order" ? 100 : 120,
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
              color: type === "order" ? colours.bg : colours.primary_variant,
            }}
          >
            HP Printer
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "300",
              opacity: 1,
              color: type === "order" ? colours.bg : colours.primary_variant_x,
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
              color: type === "order" ? colours.bg : colours.primary_variant_x,
            }}
          >
            157 in stock
          </Text>
        </View>
        <View>
          <Text
            style={{
              color: type === "order" ? colours.bg : colours.primary_variant,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            $690
          </Text>
          {!type === "order" && (
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <EvilIcons
                name="external-link"
                size={28}
                color={colours.primary_variant}
                style={{ marginTop: 15, marginLeft: 15 }}
              />
            </TouchableOpacity>
          )}
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
