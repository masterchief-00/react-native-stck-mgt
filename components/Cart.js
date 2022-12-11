import React from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 15, marginTop: 10 }}
      fadingEdgeLength={100}
      endFillColor="transparent"
    >
      {cartItems.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ScrollView>
  );
};

export default Cart;
