import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import product_img from "../assets/images/product-package.jpg";
import { colours } from "../colours";
import { AntDesign, Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import Modal_elite from "./Modal_elite";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../redux/CartSlice";

const ProductCard = ({ product, cart = true }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const categories = useSelector((state) => state.category.categories);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const findCategories = (category_id) => {
    let category = categories.find((item) => item.id === category_id);

    return category.name;
  };

  const addItemToCart = (item) => {
    dispatch(CartActions.addToCart({ product: item }));
  };

  const findCartPicks = (id) => {
    let item = cartItems.find((ele) => ele.id === id);

    return item ? item.picks : 0;
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
        source={{ uri: product.image }}
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
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => addItemToCart(product)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                width: 40,
                padding: 3,
                borderWidth: 1,
                borderColor: colours.primary,
                borderRadius: 10,
                marginTop: 10,
              }}
            >
              <Entypo name="shopping-cart" size={20} color={colours.primary} />
              <Text
                style={{
                  position: "absolute",
                  bottom: 15,
                  left: 30,
                  borderWidth: 1.5,
                  borderColor: colours.primary,
                  borderRadius: 40,
                  backgroundColor: colours.primary,
                  padding: 3,
                  textAlign: "center",
                  height: 22,
                  color: colours.bg,
                  fontWeight: "bold",
                }}
              >
                {findCartPicks(product.id)}
              </Text>
            </TouchableOpacity>
            {findCartPicks(product.id) > 0 && (
              <TouchableOpacity
                onPress={() =>
                  dispatch(CartActions.decreasePick({ item: product }))
                }
                style={{
                  marginHorizontal: 15,
                  marginTop: 5,
                }}
              >
                <Ionicons
                  name="remove-circle-sharp"
                  size={24}
                  color={colours.primary}
                />
              </TouchableOpacity>
            )}
          </View>

          {findCartPicks(product.id) > 0 && (
            <Text
              style={{
                color: colours.primary_variant,
                fontSize: 13,
                marginTop: 5,
                fontWeight: "bold",
              }}
            >
              Sub-total: ${findCartPicks(product.id) * product.unit_price}
            </Text>
          )}
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
          {cart && (
            <TouchableOpacity
              onPress={() =>
                dispatch(CartActions.removeItemFromCart({ id: product.id }))
              }
              style={{
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <FontAwesome name="trash" size={24} color={colours.primary} />
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
