import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";
import { colours } from "../colours";
import CustomButton from "./CustomButton";
import { Entypo } from "@expo/vector-icons";
import axios from "axios";
import { API_URL } from "@env";
import { useNavigation } from "@react-navigation/native";

const AddProduct = () => {
  const [selected, setSelected] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const [indicatorVisible, setIndicatorVisibility] = useState(false);
  const [activeModal, setActiveModal] = useState("password");
  const [error, setError] = useState("");
  const [modalVisible, setmodalVisible] = useState(false);
  const token = useSelector((state) => state.user.token);
  const navigation = useNavigation();

  const data = [];

  const handleError = () => {
    setActiveModal("error");
    setError("The information entered are invalid!");
    setmodalVisible(true);
    setIndicatorVisibility(false);
  };

  useEffect(() => {
    for (let item of categories) {
      let existing = data.find((ele) => ele.key === item.id);
      if (!existing) {
        let obj = { key: item.id, value: item.name };
        data.push(obj);
      }
    }
  }, [selected]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
        }}
        style={{
          padding: 5,
        }}
        fadingEdgeLength={100}
        endFillColor="transparent"
      >
        <Text
          style={{
            color: colours.primary_variant,
            textTransform: "uppercase",
            marginLeft: "15%",
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 25,
          }}
        >
          Product details
        </Text>
        <Formik
          initialValues={{
            name: "",
            SKU: "",
            quantity: 0,
            price: 0,
            exp_date: "",
            arriv_date: "",
          }}
          onSubmit={async (values) => {
            setIndicatorVisibility(true);

            console.log(values);
            await axios({
              method: "post",
              url: `${API_URL}/products`,
              data: {
                name: values.name,
                SKU: values.SKU,
                quantity: values.quantity,
                unit_price: values.price,
                exp_date: values.exp_date,
                arriv_date: values.arriv_date,
                category_id: selected,
                image: null,
              },
              headers: { Authorization: `Bearer ${token}` },
            })
              .then((response) => {
                if (response.status === 200) {
                  setIndicatorVisibility(false);
                  navigation.navigate("Dashboard");
                }
              })
              .catch((e) => {
                console.log(e);
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
              {/* -----------------PRODUCT NAME----------------- */}
              <TextInput
                placeholder="Product name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                placeholderTextColor={colours.primary_variant}
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------PRODUCT SKU----------------- */}
              <TextInput
                placeholder="Product SKU"
                onChangeText={handleChange("SKU")}
                onBlur={handleBlur("SKU")}
                value={values.SKU}
                placeholderTextColor={colours.primary_variant}
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------PRODUCT QUANTITY----------------- */}
              <TextInput
                placeholder="Product quantity"
                onChangeText={handleChange("quantity")}
                onBlur={handleBlur("quantity")}
                value={values.quantity}
                placeholderTextColor={colours.primary_variant}
                keyboardType="numeric"
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------PRODUCT PRICE----------------- */}
              <TextInput
                placeholder="Product price"
                onChangeText={handleChange("price")}
                onBlur={handleBlur("price")}
                value={values.price}
                placeholderTextColor={colours.primary_variant}
                keyboardType="numeric"
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------ARRIVAL DATE----------------- */}
              <TextInput
                placeholder="Arrival date"
                onChangeText={handleChange("arriv_date")}
                onBlur={handleBlur("arriv_date")}
                value={values.arriv_date}
                placeholderTextColor={colours.primary_variant}
                keyboardType="default"
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------ARRIVAL DATE----------------- */}
              <TextInput
                placeholder="Expiry date"
                onChangeText={handleChange("exp_date")}
                onBlur={handleBlur("exp_date")}
                value={values.exp_date}
                placeholderTextColor={colours.primary_variant}
                keyboardType="default"
                style={{
                  color: colours.primary_variant_x,
                  textAlign: "left",
                  backgroundColor: colours.bg,
                  fontSize: 15,
                  width: 250,
                  height: 40,
                  borderBottomWidth: 1,
                  borderColor: colours.primary,
                  marginBottom: 8,
                }}
              />
              {/* -----------------PRODUCT CATEGORY----------------- */}
              <SelectList
                setSelected={(val) => {
                  setSelected(val);
                }}
                data={data}
                save="key"
                label="Categories"
                placeholder="Category"
                labelStyles={{
                  color: colours.primary_variant,
                }}
                boxStyles={{
                  borderColor: colours.primary_variant_x,
                  borderRadius: 5,
                  width: 250,
                  marginBottom: 8,
                }}
                inputStyles={{
                  color: colours.primary_variant,
                }}
                dropdownTextStyles={{
                  color: colours.primary_variant,
                }}
                dropdownStyles={{
                  borderColor: colours.primary_variant_x,
                }}
                badgeTextStyles={{
                  color: colours.bg,
                }}
                disabledItemStyles={{
                  backgroundColor: colours.bg,
                }}
                disabledTextStyles={{
                  color: colours.bg_variant,
                }}
                disabledCheckBoxStyles={{
                  backgroundColor: colours.bg_variant,
                }}
              />
              <View style={{ flexDirection: "row" }}>
                <CustomButton
                  text="Submit"
                  onPress={handleSubmit}
                  title="Submit"
                  disabled={indicatorVisible}
                />
                <CustomButton
                  text="Clear form"
                  width={125}
                  bg={colours.bg}
                  color={colours.primary_variant}
                  onPress={handleReset}
                  title="Submit"
                  disabled={indicatorVisible}
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
                    color={colours.primary}
                    style={{ marginBottom: 10 }}
                  />
                )}
              </View>
            </View>
          )}
        </Formik>
        <View
          style={{
            height: 60,
          }}
        />
      </ScrollView>

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

export default AddProduct;
