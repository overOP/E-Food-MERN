import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { STATUSES } from "../global/misc/statuses";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: [],
    status: STATUSES.SUCCESS,
    token: ""
  },
  reducers: {
    setUser(state, action) {
      state.data = action.payload;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    }
  }
});

export const { setUser, setStatus, setToken } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", data);
      dispatch(setUser(res.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (err) {
      console.error("Register Error:", err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}

export function loginUser(data) {
  return async function loginUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", data);
      const token = res.data.data;
      dispatch(setToken(token));
      dispatch(setStatus(STATUSES.SUCCESS));
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login Error:", err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
