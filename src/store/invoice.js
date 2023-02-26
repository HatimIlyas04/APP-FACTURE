import { createSlice } from "@reduxjs/toolkit";
import getLocalStorage from "../Helper/getLocalStorage";

const slice = createSlice({
  name: "invoices",
  initialState: {
    data: {},
    invoices: getLocalStorage("invoices", []),
    filters: {
      status: [],
    },
  },
  reducers: {
    addNewInvoice(state, action) {
      state.data = action.payload;
      state.invoices.push(action.payload);
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    editInvoice(state, action) {
      const index = state.invoices.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.invoices[index] = action.payload.invoice;
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    deleteInvoice(state, action) {
      state.invoices = state.invoices.filter(({ id }) => id !== action.payload);
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    changeStatus(state, action) {
      const index = state.invoices.findIndex(
        ({ id }) => id === action.payload.id
      );
      state.invoices[index].status = action.payload.status;
      const json = JSON.stringify(state.invoices);
      localStorage.setItem("invoices", json);
    },
    changeFilters(state, action) {
      state.filters.status = action.payload;
    },
  },
});

export const {
  addNewInvoice,
  editInvoice,
  deleteInvoice,
  changeStatus,
  changeFilters,
} = slice.actions;

export const getEnvoiceById = ({ invoices }, idInvoice) => {
  return invoices.find(({ id }) => id === idInvoice);
};

export const getEnvoicesByStatus = ({ invoices, filters }) => {
  return invoices.filter(
    ({ status }) => !filters.status.length || filters.status.includes(status)
  );
};

export default slice.reducer;
