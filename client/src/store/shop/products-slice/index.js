import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
  productDetails : null,
};

export const fetchAllFilteredProducts = createAsyncThunk(
  "/products/fetchAllProducts",
  async ({filterParams, sortParams}) => {

    //now after passing {filterParams, sortParams} , we have to create query, because we get this one from the req.query
   const query = new URLSearchParams({
    ...filterParams,
    sortBy : sortParams
   });

   //now we have to update the url from "http://localhost:5000/api/shop/products/get" to `http://localhost:5000/api/shop/products/get?${query}`
   //also we have to pass it from ui side, and this done by going inside pages/listing.js on client side

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get?${query}`,
    );

    return result?.data;
  },
);

//for productDetails
export const fetchProductDetails = createAsyncThunk(
  "/products/fetchProductDetails",
  async (id) => {

    const result = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/shop/products/get/${id}`,
    );

    return result?.data;
  },
);

const shoppingProductSlice = createSlice({
  name: "shoppingProducts",
  initialState,
  reducers: {
    setProductDetails: (state) => {
      state.productDetails = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFilteredProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllFilteredProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productList = action.payload.data;
      })
      .addCase(fetchAllFilteredProducts.rejected, (state) => {
        state.isLoading = false;
        state.productList = [];
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.productDetails = action.payload.data;
      })
      .addCase(fetchProductDetails.rejected, (state) => {
        state.isLoading = false;
        state.productDetails = null;
      });
  },
});

export const {setProductDetails} = shoppingProductSlice.actions;

export default shoppingProductSlice.reducer;
