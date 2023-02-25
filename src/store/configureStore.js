import { combineReducers, configureStore } from "@reduxjs/toolkit";
import invoices from "./invoice";
import modal from "./modal";

const reducer = combineReducers({ invoices, modal });

const store = configureStore({ reducer });

export default store;
