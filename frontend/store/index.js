// store config

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/auth.slice";
import adminReducer from "./slices/admin.slice";
import adminDashboardReducer from "./slices/adminDashboard.slice";
import ptmReducer from "./slices/ptm.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
    adminDashboard: adminDashboardReducer,
    ptm: ptmReducer
  },
});

export default store;
