import axios from "axios";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Keyboard,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colours } from "../colours";
import CustomButton from "./CustomButton";
import OrderItemCard from "./OrderItemCard";
import { API_URL } from "@env";
import { CartActions } from "../redux/CartSlice";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const Modal_elite = ({ product_img, type = "product", order_id }) => {
  const data = {
    productName: "HP Printer",
    productCategory: "Electronics",
    productQty: 157,
    productPrice: "$690",
    productSKU: "EL-PR-123",
  };

  const orderItems = useSelector((state) => state.order.orderItems);
  const [filtered_items, setItems] = useState([]);
  const appTheme = useSelector((state) => state.theme.light);
  const userData = useSelector((state) => state.user.userData);
  const total = useSelector((state) => state.cart.total);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [error, setError] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState("password");
  const navigation = useNavigation();

  const loadItems = async (id) => {
    await axios({
      method: "get",
      url: `${API_URL}/orderItems/findById/${id}`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {

          for (let item of response.data.items) {
            if (!filtered_items.find((ele) => ele.id === item.id)) {
              filtered_items.push(item);
            }
          }
          // console.log(filtered_items);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const countItems = (id) => {
    let i = 0;
    for (let item of orderItems) {
      if (item.order_id === id) {
        filtered_items.push(item);
        i++;
      } else {
        continue;
      }
    }
    return i;
  };

  const handleError = () => {
    setActiveModal("error");
    setError("Please report this error to the devs");
    setmodalVisible(true);
    setIndicatorVisibility(false);
  };

  const sendCartItems = async (id) => {
    await axios({
      method: "post",
      url: `${API_URL}/checkout`,
      data: {
        cartItems: JSON.stringify(cartItems),
        order_id: id,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data.message);
          setIndicatorVisibility(false);

          dispatch(CartActions.clearCart());
          navigation.navigate("Dashboard");
        }
      })
      .catch((error) => {
        console.log(error);
        handleError();
        setIndicatorVisibility(false);
      });
  };

  useEffect(() => {
    if (isFocused) {
      loadItems(order_id);
      dispatch(CartActions.findTotal());
    }
  }, [isFocused]);

  return (
    <View
      style={{
        backgroundColor: colours.primary,
        width: "100%",
        maxHeight: "80%",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        paddingBottom: 30,
      }}
    >
      {type === "order-details" && (
        <View>
          <View style={{ marginTop: "10%" }}>
            <Formik
              initialValues={{
                name: userData.name,
                email: userData.email,
                province: "",
                district: "",
                phone: userData.phone,
              }}
              onSubmit={async (values, handleReset) => {
                setIndicatorVisibility(true);
                Keyboard.dismiss();

                await axios({
                  method: "post",
                  url: `${API_URL}/orders`,
                  data: {
                    email: values.email,
                    names: values.name,
                    province: values.province,
                    district: values.district,
                    phone: values.phone,
                    total: total,
                  },
                  headers: { Authorization: `Bearer ${token}` },
                })
                  .then((response) => {
                    if (response.status === 200) {
                      console.log(response.data.order);
                      sendCartItems(response.data.order.id);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                    handleError();
                    setIndicatorVisibility(false);
                  });
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                handleReset,
                values,
              }) => (
                <View style={{ alignItems: "center" }}>
                  {/* -----------------NAMES----------------- */}
                  <TextInput
                    placeholder="Names"
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                    placeholderTextColor={colours.bg_variant}
                    style={{
                      color: colours.bg,
                      textAlign: "left",
                      backgroundColor: appTheme
                        ? colours.primary_variant
                        : colours.black,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: colours.bg,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  />
                  {/* -----------------EMAIL----------------- */}
                  <TextInput
                    placeholder="email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    placeholderTextColor={colours.bg_variant}
                    style={{
                      color: colours.bg,
                      textAlign: "left",
                      backgroundColor: appTheme
                        ? colours.primary_variant
                        : colours.black,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: colours.bg,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  />
                  {/* -----------------PROVINCE----------------- */}
                  <TextInput
                    placeholder="Province"
                    onChangeText={handleChange("province")}
                    onBlur={handleBlur("province")}
                    value={values.province}
                    placeholderTextColor={colours.bg_variant}
                    keyboardType="default"
                    style={{
                      color: colours.bg,
                      textAlign: "left",
                      backgroundColor: appTheme
                        ? colours.primary_variant
                        : colours.black,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: colours.bg,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  />
                  {/* -----------------DISTRICT----------------- */}
                  <TextInput
                    placeholder="District"
                    onChangeText={handleChange("district")}
                    onBlur={handleBlur("district")}
                    value={values.district}
                    placeholderTextColor={colours.bg_variant}
                    keyboardType="default"
                    style={{
                      color: colours.bg,
                      textAlign: "left",
                      backgroundColor: appTheme
                        ? colours.primary_variant
                        : colours.black,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: colours.bg,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  />
                  {/* -----------------PHONE----------------- */}
                  <TextInput
                    placeholder="phone"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    placeholderTextColor={colours.bg_variant}
                    keyboardType="default"
                    style={{
                      color: colours.bg,
                      textAlign: "left",
                      backgroundColor: appTheme
                        ? colours.primary_variant
                        : colours.black,
                      fontSize: 15,
                      width: 250,
                      height: 40,
                      borderBottomWidth: 1,
                      borderColor: colours.bg,
                      marginBottom: 8,
                      textAlign: "center",
                    }}
                  />

                  <View style={{ flexDirection: "row" }}>
                    <CustomButton
                      disabled={indicatorVisible}
                      text="Place order"
                      width={110}
                      onPress={handleSubmit}
                      title="Submit"
                    />
                    <CustomButton
                      disabled={indicatorVisible}
                      text="Clear form"
                      width={110}
                      bg={colours.bg}
                      color={colours.primary_variant}
                      onPress={handleReset}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    {indicatorVisible && (
                      <ActivityIndicator
                        size="large"
                        color={colours.bg}
                        style={{ marginBottom: 10 }}
                      />
                    )}
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      )}
      {type === "product" && (
        <View>
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
      )}

      {type === "order" && (
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              marginTop: "15%",
              marginLeft: 25,
              alignSelf: "flex-start",
              fontWeight: "bold",
              fontSize: 17,
              color: colours.bg,
            }}
          >
            {countItems(order_id)} item(s)
          </Text>
          <ScrollView
            endFillColor="transparent"
            fadingEdgeLength={100}
            style={{ padding: 10 }}
          >
            {filtered_items.map((element) => (
              <OrderItemCard data={element} key={element.id} />
            ))}
          </ScrollView>
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
      )}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View
          style={{
            backgroundColor: colours.black_a,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {activeModal === "error" && (
            <View
              style={{
                width: "90%",
                height: "10%",
                borderWidth: 1,
                borderRadius: 10,
                borderColor: colours.primary,
                backgroundColor: colours.bg,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: colours.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                Something went wrong!
              </Text>
              <Text
                style={{
                  color: colours.primary,
                  fontWeight: "300",
                  fontSize: 12,
                }}
              >
                {error}
              </Text>
              <View
                style={{
                  position: "absolute",
                  top: -25,
                  right: 15,
                  backgroundColor: colours.bg,
                  borderWidth: 1,
                  borderRadius: 7,
                  borderBottomWidth: 0,
                  borderColor: colours.primary_variant_x,
                }}
              >
                <TouchableOpacity onPress={() => setmodalVisible(false)}>
                  <Entypo name="cross" size={30} color={colours.primary} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default Modal_elite;
