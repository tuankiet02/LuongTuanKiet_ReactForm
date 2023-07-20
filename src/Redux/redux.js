const stateDefoult = {
  mangSinhVien: [],
  oldMangSinhVien: [],
  sinhVienEdit: {},
};

export const sinhVienReduce = (state = stateDefoult, action) => {
  switch (action.type) {
    case "THEM_SINH_VIEN": {
      let newArrSinhVien = [...state.mangSinhVien, action.sinhVien];
      return {
        ...state,
        mangSinhVien: [...newArrSinhVien],
        oldMangSinhVien: [...newArrSinhVien],
      };
    }

    case "XOA_SINH_VIEN":
      {
        let newArrSinhVien = [...state.mangSinhVien];
        let index = newArrSinhVien.findIndex(
          (thongTinSV) => thongTinSV.maSV === action.maSV
        );
        if (index !== -1) {
          newArrSinhVien.splice(index, 1);
          return { ...state, mangSinhVien: [...newArrSinhVien] };
        }
      }
      break;
    case "TT_SINH_VIEN": {
      console.log(action.sinhVien);
      return { ...state, sinhVienEdit: { ...action.sinhVien } };
    }
    case "CAP_NHAT_SV": {
      let newArrSinhVien = [...state.mangSinhVien];
      let index = newArrSinhVien.findIndex(
        (thongTinSV) => thongTinSV.maSV === action.sinhVien.maSV
      );
      if (index !== -1) {
        newArrSinhVien[index] = action.sinhVien;
      }
      return {
        ...state,
        mangSinhVien: [...newArrSinhVien],
        sinhVienEdit: { ...action.sinhVien },
      };
    }
    case "SEARCH":
      {
        let newArrSinhVien = [...state.mangSinhVien];
        if (action.sinhVien) {
          console.log("arr", newArrSinhVien);
          newArrSinhVien = newArrSinhVien.filter((thongTinSV) => {
            console.log(thongTinSV.hoTen);
            console.log(action.sinhVien);

            return thongTinSV.hoTen.includes(action.sinhVien);
          });
          return { ...state, mangSinhVien: [...newArrSinhVien] };
        }

        return { ...state, mangSinhVien: [...state.oldMangSinhVien] };
      }
      break;
    default:
      {
        return { ...state };
      }
      break;
  }
};
