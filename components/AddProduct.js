import { Formik } from "formik";
import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { colours } from "../colours";

const AddProduct = () => {
  const [selected, setSelected] = useState("");

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
    <View style={{ backgroundColor:'red'}}>
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
                backgroundColor: colours.bg,
              }}
              disabledTextStyles={{
                color: colours.bg_variant,
              }}
              disabledCheckBoxStyles={{
                backgroundColor: colours.bg_variant,
              }}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddProduct;
