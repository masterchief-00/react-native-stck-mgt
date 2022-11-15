import React, { useState } from "react";
import { View, Text } from "react-native";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { colours } from "../colours";

const CategorySelector = () => {
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
    <View style={{ paddingHorizontal: 12 }}>
      <MultipleSelectList
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
        }}
        inputStyles={{
          color: colours.primary_variant,
        }}
        dropdownTextStyles={{
          color: colours.primary_variant,
        }}
        checkBoxStyles={{
          color: colours.primary_variant,
          borderColor: colours.primary_variant,
        }}
        dropdownStyles={{
          borderColor: colours.primary_variant_x,
        }}
        badgeStyles={{
          backgroundColor: colours.primary_variant_x,
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
  );
};

export default CategorySelector;
