import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    list: [],
  },
  reducers: {
    add: (state, action) => {
      if (!action.payload.amount) action.payload.amount = 1;
      const theIndex = state.list.findIndex((item) => item.id === action.payload.id);
      if (theIndex !== -1) {
        state.list[theIndex].amount += action.payload.amount;
        if (state.list[theIndex].amount < 1) state.list[theIndex].amount = 1;
        return;
      }
      state.list = [...state.list, action.payload];
    },
    remove: (state, action) => {
      state.list.splice(action.payload.id, 1);
    },
    clear: (state) => (state.list = []),
    amountById: (state, action) => {
      const itemId = state.list.findIndex((item) => item.id === action.payload.id);
      if (itemId !== -1) {
        if (action.payload.increament) {
          state.list[itemId].amount = parseInt(state.list[itemId].amount) + parseInt(action.payload.increament);
          if (state.list[itemId].amount === 0) state.list.splice(itemId, 1);
        }
        if (action.payload.amount) state.list[itemId].amount = action.payload.amount;
        if (state.list[itemId].amount < 1) state.list[itemId].amount = 1;
      }
    },
  },
});

export const { add, remove, clear, amountById } = cartSlice.actions;
export default cartSlice.reducer;
