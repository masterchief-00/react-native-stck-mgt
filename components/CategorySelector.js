import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch, useSelector } from "react-redux";
import { colours } from "../colours";
import { ProductActions } from "../redux/ProductSlice";

const CategorySelector = () => {
  const [selected, setSelected] = useState("");
  const categories = useSelector((state) => state.category.categories);
  const dispatch = useDispatch();

  let data = [];

  const filterProducts = (id) => {
    dispatch(ProductActions.filterProductsByCategory(id));
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
    <View style={{ paddingHorizontal: 12 }}>
      <SelectList
        setSelected={(val) => {
          setSelected(val);
          filterProducts(val);
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
