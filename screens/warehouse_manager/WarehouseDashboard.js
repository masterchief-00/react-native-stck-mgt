import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, Text, ScrollView } from "react-native";
import { colours } from "../../colours";
import ServiceCard from "../../components/ServiceCard";

const WarehouseDashboard = () => {
  return (
    <View style={{ flex: 1, backgroundColor: colours.bg }}>
      <StatusBar style="dark" backgroundColor="transparent" />

      <View style={{ marginTop: "8%" }}>
        <ScrollView
          style={{ marginVertical: 5, padding: 5 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
          <ServiceCard />
        </ScrollView>
      </View>
    </View>
  );
};

export default WarehouseDashboard;
