import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import Modal_elite from "./Modal_elite";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "@env";
import axios from "axios";
import { OrdersActions } from "../redux/OrderSlice";

const OrderCard = ({ order }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemsCount, setItemsCount] = useState(0);
  const dispatch = useDispatch();
  const orderItems = useSelector((state) => state.order.orderItems);
  const token = useSelector((state) => state.user.token);

  let filtered_items = [];

  const countItems = (id) => {
    let i = 0;
    for (let item of orderItems) {
      if (item.order_id === id) {
        // if (!filtered_items.find((element) => element.id === id)) {
        //   filtered_items.push(item);
        // }
        filtered_items.push(item);

        i++;
      } else {
        continue;
      }
    }
    setItemsCount(i);
    console.log(filtered_items.length);
  };

  const fetchItems = async () => {
    await axios({
      method: "get",
      url: `${API_URL}/orderItems/find/${order.id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(
            OrdersActions.setOrderItems({ list: response.data.orderItems })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchItems();
    countItems(order.id);
  }, []);

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
            #{order.id}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              fontSize: 15,
              fontWeight: "800",
              opacity: 1,
              color: colours.primary_variant,
              textTransform: "capitalize",
              maxWidth: 80,
            }}
          >
            {order.names}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 13,
              fontWeight: "600",
              opacity: 1,
              color: colours.primary_variant_x,
              width: 80,
            }}
          >
            {order.created_at}
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
            {itemsCount} item(s)
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
            {order.phone}
          </Text>
          <Text
            style={{
              fontSize: 13,
              fontWeight: "800",
              opacity: 1,
              color: colours.primary_variant_x,
              marginBottom: 5,
              textTransform: "capitalize",
            }}
          >
            {order.province}, {order.district}
          </Text>
        </View>
        <View style={{ alignItems: "flex-start" }}>
          <Text
            numberOfLines={1}
            style={{
              color: colours.primary_variant,
              fontWeight: "bold",
              fontSize: 13,
              textAlign: "left",
            }}
          >
            ${order.total}
          </Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <EvilIcons
              name="external-link"
              size={28}
              color={colours.primary_variant}
              style={{ marginTop: 15, marginLeft: "5%" }}
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
              Order #{order.id}
            </Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <AntDesign
                name="closecircle"
                size={35}
                color={colours.primary_variant}
              />
            </TouchableOpacity>
          </View>
          <Modal_elite
            items={filtered_items}
            type="order"
            product_img={product_img}
          />
        </View>
      </Modal>
    </View>
  );
};

export default OrderCard;
