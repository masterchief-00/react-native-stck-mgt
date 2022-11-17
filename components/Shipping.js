import React from "react";
import { ScrollView } from "react-native";
import OrderCard from "./OrderCard";

const Shipping = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 15, marginTop: 10 }}
      fadingEdgeLength={100}
      endFillColor="transparent"
    >
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
      <OrderCard />
    </ScrollView>
  );
};

export default Shipping;
