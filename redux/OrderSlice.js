import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderItems: [],
  },
  reducers: {
    setOrders(state, action) {
      for (let item of action.payload.list) {
        if (!state.orders.find((i) => i.id === item.id)) {
          state.orders.push(item);
        } else {
          continue;
        }
      }
    },
    setOrderItems(state, action) {
      for (let item of action.payload.list) {
        if (!state.orderItems.find((i) => i.id === item.id)) {
          state.orderItems.push(item);
        } else {
          continue;
        }
      }
    },
    clearOrders(state, action) {
      state.orderItems = [];
      state.orders = [];
    },
  },
});

export const OrdersActions = OrderSlice.actions;
export default OrderSlice;
