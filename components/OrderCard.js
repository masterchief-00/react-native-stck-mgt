import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import Modal_elite from "./Modal_elite";

const OrderCard = () => {
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
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          padding: 5,
          width: 330,
        }}
      >
        <View style={{ marginLeft: 10 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 22,
              color: colours.primary_variant,
            }}
          >
            #5676
          </Text>

          <Text
            style={{
              fontSize: 15,
              fontWeight: "800",
              opacity: 1,
              color: colours.primary_variant_x,
            }}
          >
            Jane Doe
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              opacity: 1,
              color: colours.primary_variant_x,
            }}
          >
            12/05/2022
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "800",
              opacity: 1,
              color: colours.primary_variant_x,
              marginBottom: 5,
            }}
          >
            12 item(s)
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "600",
              opacity: 1,
              color: colours.primary_variant_x,
              marginBottom: 5,
            }}
          >
            PayPal
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "800",
              opacity: 1,
              color: colours.primary_variant_x,
              marginBottom: 5,
            }}
          >
            Kigali, Rwanda
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
            $690
          </Text>

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <EvilIcons
              name="external-link"
              size={28}
              color={colours.primary_variant}
              style={{ marginTop: 15, marginLeft: 15 }}
            />
          </TouchableOpacity>
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
              Order #4534
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign
                name="closecircle"
                size={35}
                color={colours.primary_variant}
              />
            </TouchableOpacity>
          </View>
          <Modal_elite type="order" product_img={product_img} />
        </View>
      </Modal>
    </View>
  );
};

export default OrderCard;
