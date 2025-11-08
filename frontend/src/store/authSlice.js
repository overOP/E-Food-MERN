import { createSlice } from "@reduxjs/toolkit";
import { STATUSES } from "../global/misc/statuses";
import {API} from "../http";

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
    },
    logOut(state){
      state.data = []
      state.token = null
      state.state = STATUSES.SUCCESS
     },
  }
});

export const { setUser, setStatus, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;

export function registerUser(data) {
  return async function registerUserThunk(dispatch) {
    dispatch(setStatus(STATUSES.LOADING));
    try {
      await API.post("/auth/register", data);
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
      const res = await API.post("/auth/login", data);
      dispatch(setUser(res.data.data));
      const token = res.data.token;
      dispatch(setToken(res.data.token));
      dispatch(setStatus(STATUSES.SUCCESS));
      localStorage.setItem("token", token);
    } catch (err) {
      console.error("Login Error:", err);
      dispatch(setStatus(STATUSES.ERROR));
    }
  };
}
