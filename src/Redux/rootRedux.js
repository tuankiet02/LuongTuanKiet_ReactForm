import { configureStore } from "@reduxjs/toolkit";
import { sinhVienReduce } from "./formRedux";
export const store = configureStore({
  reducer: {
    sinhVienReduce: sinhVienReduce,
    // return state
    editSinhVien: { maSV: "", hoTen: "", soDT: "", email: "" },
  },
});
