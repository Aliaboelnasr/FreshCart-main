import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
let initialState = {
  productArr: [],
  loading: false,
  error: null,
};

async function getProducts() {
  let data = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return data.data;
}

export let fetchProduct = createAsyncThunk("product/getProducts", getProducts);

let productSlice = createSlice({
  name: "product",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.productArr = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchProduct.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export let productReducer = productSlice.reducer;
