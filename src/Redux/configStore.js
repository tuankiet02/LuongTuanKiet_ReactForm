import { configureStore } from "@reduxjs/toolkit";
import { sinhVienReduce } from "./redux";
export const store = configureStore({
  reducer: {
    sinhVienReduce: sinhVienReduce,
    editSinhVien: { maSV: "", hoTen: "", soDT: "", email: "" },
  },
});
