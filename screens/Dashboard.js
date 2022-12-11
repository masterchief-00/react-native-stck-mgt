import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";

import { colours } from "../colours";
import Products from "../components/Products";
import ServiceCard from "../components/ServiceCard";
import Shipping from "../components/Shipping";
import User from "../components/User";
import CategorySelector from "../components/CategorySelector";
import { useSelector } from "react-redux";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import Cart from "../components/Cart";

const Dashboard = () => {
  const appTheme = useSelector((state) => state.theme.light);
  const userPermissions = useSelector((state) => state.user.userPermissions);
  const userType = useSelector((state) => state.user.userData.user_type);

  const [activeTab, setActiveTab] = useState("products");

  const findPermission = (permission) => {
    return userPermissions.find((i) => i.name === permission);
  };

  useEffect(() => {
    if (userType === "DLV") {
      setActiveTab("orders");
    } else if (userType === "WHS") {
      setActiveTab("products");
    }
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: appTheme ? colours.bg : "black" }}>
      <StatusBar
        style={appTheme ? "dark" : "light"}
        backgroundColor="transparent"
      />

      <View style={{ marginTop: "8%", flex: activeTab === "orders" ? 0 : 1 }}>
        <User />
        <View
          style={{
            height: 80,
          }}
        >
          <ScrollView
            contentContainerStyle={{
              justifyContent: "center",
            }}
            style={{
              marginVertical: 5,
              padding: 5,
            }}
            horizontal
            showsHorizontalScrollIndicator={false}
            fadingEdgeLength={100}
            endFillColor="transparent"
          >
            {findPermission("product:view") && (
              <ServiceCard
                onPress={() => setActiveTab("products")}
                active={activeTab === "products" ? true : false}
                text="Products"
              />
            )}
            {findPermission("product:view") && (
              <ServiceCard
                onPress={() => setActiveTab("cart")}
                active={activeTab === "cart" ? true : false}
                text="cart"
              />
            )}
            {findPermission("order:view") && (
              <ServiceCard
                onPress={() => setActiveTab("orders")}
                active={activeTab === "orders" ? true : false}
                text="Orders"
              />
            )}

            {findPermission("product:register") && (
              <ServiceCard
                onPress={() => setActiveTab("add_products")}
                active={activeTab === "add_products" ? true : false}
                text="Add products"
              />
            )}

            {findPermission("product:update") && (
              <ServiceCard
                onPress={() => setActiveTab("update_products")}
                active={activeTab === "update_products" ? true : false}
                text="Update products"
              />
            )}
          </ScrollView>
        </View>

        {activeTab === "products" && <CategorySelector />}
        {activeTab === "products" && <Products />}
        {activeTab === "orders" && <Shipping />}
        {activeTab === "add_products" && <AddProduct />}
        {activeTab === "update_products" && <UpdateProduct />}
        {activeTab === "cart" && <Cart />}
      </View>
    </View>
  );
};

export default Dashboard;
