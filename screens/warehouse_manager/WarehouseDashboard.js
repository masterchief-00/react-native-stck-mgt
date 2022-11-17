import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { colours } from "../../colours";
import Products from "../../components/Products";
import ServiceCard from "../../components/ServiceCard";
import Shipping from "../../components/Shipping";
import User from "../../components/User";
import CategorySelector from "../../components/CategorySelector";
import { useSelector } from "react-redux";

const WarehouseDashboard = () => {
  const appTheme = useSelector((state) => state.theme.light);

  const [activeTab, setActiveTab] = useState("products");
  return (
    <View style={{ flex: 1, backgroundColor: appTheme ? colours.bg : "black" }}>
      <StatusBar
        style={appTheme ? "dark" : "light"}
        backgroundColor="transparent"
      />

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
            onPress={() => setActiveTab("orders")}
            active={activeTab === "orders" ? true : false}
            text="Orders"
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
        {activeTab === "products" && <CategorySelector />}
        {activeTab === "products" && <Products />}
        {activeTab === "orders" && <Shipping />}
      </View>
    </View>
  );
};

export default WarehouseDashboard;
