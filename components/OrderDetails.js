import { Formik } from "formik";
import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useSelector } from "react-redux";
import { colours } from "../colours";
import CustomButton from "./CustomButton";

const OrderDetails = () => {
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
        Order details
      </Text>
      <Formik initialValues={{
          name:'',
          email:'',
          province:'',
          district:'',
          phone:''
      }} onSubmit={() => console.log(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={{ alignItems: "center" }}>
            {/* -----------------NAMES----------------- */}
            <TextInput
              placeholder="Names"
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
            {/* -----------------EMAIL----------------- */}
            <TextInput
              placeholder="email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
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
            {/* -----------------PROVINCE----------------- */}
            <TextInput
              placeholder="Province"
              onChangeText={handleChange("province")}
              onBlur={handleBlur("province")}
              value={values.province}
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
            {/* -----------------DISTRICT----------------- */}
            <TextInput
              placeholder="District"
              onChangeText={handleChange("district")}
              onBlur={handleBlur("district")}
              value={values.district}
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
              placeholder="phone"
              onChangeText={handleChange("phone")}
              onBlur={handleBlur("phone")}
              value={values.phone}
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

export default OrderDetails;
