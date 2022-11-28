import React, { useEffect } from "react";
import { ScrollView } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { OrdersActions } from "../redux/OrderSlice";
import OrderCard from "./OrderCard";
import { API_URL } from "@env";
import axios from "axios";

const Shipping = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order.orders);
  const token = useSelector((state) => state.user.token);

  const fetchOrders = async () => {
    await axios({
      method: "get",
      url: `${API_URL}/orders`,
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.status === 200) {
          dispatch(OrdersActions.setOrders({ list: response.data.orders }));
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ paddingHorizontal: 15, marginTop: 5 }}
      fadingEdgeLength={100}
      endFillColor="transparent"
    >
      {orders.map((item) => (
        <OrderCard order={item} key={item.id} />
      ))}
    </ScrollView>
  );
};

export default Shipping;
