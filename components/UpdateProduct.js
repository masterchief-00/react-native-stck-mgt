import { Formik } from "formik";
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";
import { colours } from "../colours";
import CustomButton from "./CustomButton";

const UpdateProduct = () => {
  const [selected, setSelected] = useState("");
  const appTheme = useSelector((state) => state.theme.light);

  const data = [
    { key: "1", value: "Mobiles", disabled: true },
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "4", value: "Computers", disabled: true },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];
  return (
    <View style={{ marginBottom: "30%" }}>
      <Text
        style={{
          color: appTheme ? colours.primary_variant : colours.primary,
          textTransform: "uppercase",
          marginLeft: "15%",
          marginBottom: 10,
          fontWeight: "bold",
          fontSize: 25,
        }}
      >
        Product details
      </Text>
      <Formik initialValues={{}} onSubmit={() => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
              onChangeText={handleChange("sku")}
              onBlur={handleBlur("sku")}
              value={values.sku}
              placeholderTextColor={colours.primary_variant}
              style={{
                color: colours.primary_variant_x,
                textAlign: "left",
                backgroundColor: appTheme ? colours.bg : colours.black,
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
              setSelected={(val) => setSelected(val)}
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
                backgroundColor: appTheme ? colours.bg : colours.black,
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
                text="Update"
                width={110}
                onPress={handleSubmit}
                title="Submit"
              />
              <CustomButton
                text="Clear form"
                width={110}
                bg={colours.bg}
                color={colours.primary_variant}
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

export default UpdateProduct;
