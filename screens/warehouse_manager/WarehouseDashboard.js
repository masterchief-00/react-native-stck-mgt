import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { colours } from "../../colours";
import CategorySelector from "../../components/CategorySelector";
import ProductCard from "../../components/ProductCard";
import ServiceCard from "../../components/ServiceCard";
import User from "../../components/User";

const WarehouseDashboard = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View style={{ marginTop: "8%" }}>
        <User />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{ marginVertical: 5, padding: 5, height: 80 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
          endFillColor="transparent"
        >
          <ServiceCard text="Products" />
          <ServiceCard text="Shipping" />
          <ServiceCard text="Add products" />
          <ServiceCard text="Update products" />
        </ScrollView>
        <CategorySelector />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ paddingHorizontal: 15, marginTop: 10 }}
        >
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default WarehouseDashboard;
