import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { colours } from "../colours";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { CartActions } from "../redux/CartSlice";
import axios from "axios";
import { API_URL } from "@env";
import { ProductActions } from "../redux/ProductSlice";

const ProductCard = ({ product, cart = true }) => {
  const categories = useSelector((state) => state.category.categories);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const userRole = useSelector((state) => state.user.userData.user_type);
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const token = useSelector((state) => state.user.token);

  const findCategories = (category_id) => {
    let category = categories.find((item) => item.id === category_id);

    return category.name;
  };

  const deleteProduct = async (id) => {
    if (!cart && isAdmin) {
      setIndicatorVisibility(true);

      await axios({
        method: "delete",
        url: `${API_URL}/products/${id}`,
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          if (response.status === 200) {

            dispatch(ProductActions.deleteProduct(response.data.product.id));
            setIndicatorVisibility(false);
          }
        })
        .catch((error) => {
          console.log(error);
          setIndicatorVisibility(false);
        });
    } else if (!cart) {
      dispatch(CartActions.removeItemFromCart({ id: product.id }));
    }
  };

  const addItemToCart = (item) => {
    dispatch(CartActions.addToCart({ product: item }));
  };

  const findCartPicks = (id) => {
    let item = cartItems.find((ele) => ele.id === id);

    return item ? item.picks : 0;
  };

  const productImage =
    product.image !== null
      ? { uri: product.image }
      : require("../assets/images/product-package.jpg");

  const isAdmin = userRole === "ADM" || userRole === "WHS";
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
        source={productImage}
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
          {cart ||
            (isAdmin && (
              <TouchableOpacity
                disabled={indicatorVisible}
                onPress={() => deleteProduct(product.id)}
                style={{
                  marginTop: 10,
                  justifyContent: "center",
                }}
              >
                <FontAwesome name="trash" size={24} color={colours.primary} />
              </TouchableOpacity>
            ))}
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
