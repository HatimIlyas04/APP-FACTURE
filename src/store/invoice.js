import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "../Helper/getLocalStorage";

const slice = createSlice({
  name: "invoices",
  initialState: {
    data: {},
    invoices: getLocalStorage("invoices", []),
  },
  reducers: {
    addNewInvoice(state, action) {
      state.data = action.payload;
      state.invoices.push(action.payload);
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    changeStatus(state, action) {
      const index = state.invoices.findIndex(({ id }) => id === action.payload.id);
      state.invoices[index].status = action.payload.status;
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter(({id}) => id !== action.payload)
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    }
  },
});

export const { addNewInvoice, changeStatus, deleteInvoice } = slice.actions;

export const getEnvoiceById = ({ invoices }, idInvoice) => {
  return invoices.find(({ id }) => id === idInvoice);
};

export default slice.reducer;
