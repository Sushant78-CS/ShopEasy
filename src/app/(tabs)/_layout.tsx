import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="home" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          headerShown: false,
          title: "My Cart",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="productsection"
        options={{
          headerShown: false,
          title: "Products",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="layers" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="searchScreen"
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="search" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="locationEdit"
        options={{
          headerShown: false,
          title: "Location",
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="location" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
