import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userData: {
      name: "",
      email: "",
      ID_NO: "",
      phone: "",
      user_type: "",
      image: null,
    },
    token: "",
    userPermissions: [],
  },
  reducers: {
    setUserData(state, action) {
      state.userData = {
        name: action.payload.name,
        email: action.payload.email,
        ID_NO: action.payload.ID_NO,
        phone: action.payload.phone,
        user_type: action.payload.user_type,
        image: action.payload.image,
      };
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setPermissions(state, action) {
      for (let item of action.payload.list) {
        if (!state.userPermissions.find((i) => i.id === item.id)) {
          state.userPermissions.push(item);
        } else {
          continue;
        }
      }
    },
    clearUserData(state, action) {
      state.userData = {
        name: "",
        email: "",
        ID_NO: "",
        phone: "",
        user_type: "",
        image: null,
      };
      state.token = "";
    },
  },
});

export const UserActions = UserSlice.actions;
export default UserSlice;
