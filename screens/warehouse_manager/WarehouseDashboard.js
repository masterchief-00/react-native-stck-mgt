import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { colours } from "../../colours";
import CategorySelector from "../../components/CategorySelector";
import ProductCard from "../../components/ProductCard";
import ServiceCard from "../../components/ServiceCard";
import User from "../../components/User";

const WarehouseDashboard = () => {
  const [activeTab, setActiveTab] = useState("products");
  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View style={{ marginTop: "8%", flex: 1 }}>
        <User />
        <ScrollView
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
          }}
          style={{ marginVertical: 5, padding: 5, height: 120 }}
          horizontal
          showsHorizontalScrollIndicator={false}
          fadingEdgeLength={100}
          endFillColor="transparent"
        >
          <ServiceCard
            onPress={() => setActiveTab("products")}
            active={activeTab === "products" ? true : false}
            text="Products"
          />
          <ServiceCard
            onPress={() => setActiveTab("shipping")}
            active={activeTab === "shipping" ? true : false}
            text="Shipping"
          />
          <ServiceCard
            onPress={() => setActiveTab("add_products")}
            active={activeTab === "add_products" ? true : false}
            text="Add products"
          />
          <ServiceCard
            onPress={() => setActiveTab("update_products")}
            active={activeTab === "update_products" ? true : false}
            text="Update products"
          />
        </ScrollView>
        <CategorySelector />
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
      </View>
    </View>
  );
};

export default WarehouseDashboard;
