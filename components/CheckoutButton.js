import React, { useState } from "react";
import { TouchableOpacity, Text, View, Modal } from "react-native";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { colours } from "../colours";
import Modal_elite from "./Modal_elite";

const CheckoutButton = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 240,
      }}
    >
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={{
          backgroundColor: colours.primary,
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            color: colours.bg,
            fontSize: 15,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          Checkout
        </Text>
      </TouchableOpacity>

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
              Order details
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign
                name="closecircle"
                size={35}
                color={colours.primary_variant}
              />
            </TouchableOpacity>
          </View>
          <Modal_elite product_img={null} type="order-details" />
        </View>
      </Modal>
    </View>
  );
};

export default CheckoutButton;
