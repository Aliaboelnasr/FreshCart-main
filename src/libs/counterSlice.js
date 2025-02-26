import { createSlice } from "@reduxjs/toolkit";

//immer is used to mutate the state directly without making a copy of it

let initialState = {
  counter: 0,
  list: [],
  isloading: true,
  fname: "",
};

let counterSlice = createSlice({
  name: "counter",
  initialState, //=use state
  reducers: {
    increase: (state) => {
      state.counter += 1;
    },

    decrease: (state) => {
      state.counter -= 1;
    },
    increaseByAmount: (state, action) => {
      state.counter += action.payload;
    },
    changeName: (state) => {
      state.fname = "ali";
    },
    addMe: (state, action) => {
      state.list.push(action.payload);
    },
  },
});

export let counterReducer = counterSlice.reducer;
export let { decrease, increase, increaseByAmount, addMe, changeName } =
  counterSlice.actions;
