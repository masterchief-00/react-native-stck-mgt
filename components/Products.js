import React from "react";
import { ScrollView } from "react-native";
import ProductCard from "./ProductCard";

const Products = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 15, marginTop: 10 }}
      fadingEdgeLength={100}
      endFillColor="transparent"
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </ScrollView>
  );
};

export default Products;
