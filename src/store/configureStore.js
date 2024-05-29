import { combineReducers, configureStore } from "@reduxjs/toolkit";
import invoices from "./invoice";
import modal from "./modal";
import auth from "./auth";

const reducer = combineReducers({ invoices, modal, auth });

const store = configureStore({ reducer });

export default store;
