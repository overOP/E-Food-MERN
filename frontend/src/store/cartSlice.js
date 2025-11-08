import { createSlice } from "@reduxjs/toolkit";
import { APIAuthenticated } from "../http";
import { STATUSES } from "../global/misc/statuses";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        status: STATUSES.SUCCESS
    },
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        }
    }
})

export const { setItems, setStatus } = cartSlice.actions;
export default cartSlice.reducer;

export function addToCart(productId){
    return async function addToCartThunk(dispatch){
      dispatch(setStatus(STATUSES.LOADING));
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `${token}` } : {};
        const response = await APIAuthenticated.post(`/cart/${productId}`, {}, { headers });
        dispatch(setItems(response.data.data));
        dispatch(setStatus(STATUSES.SUCCESS));
      } catch (error) {
        console.log("addToCart error:", error.response ? error.response.data : error.message);
        dispatch(setStatus(STATUSES.ERROR));
      }
    }
  }
  
export function fetchCarItems(){
  return async function fetchCartThunk(dispatch){
    dispatch(setStatus(STATUSES.LOADING));
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: ` ${token}` } : {};
      const response = await APIAuthenticated.get(`/cart/`, { headers });
      dispatch(setItems(response.data.data));
      dispatch(setStatus(STATUSES.SUCCESS));
    } catch (error) {
      console.log("fetchCart error:", error.response ? error.response.data : error.message);
      dispatch(setStatus(STATUSES.ERROR));
    }
  }
}
