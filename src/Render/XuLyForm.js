import React, { Component } from "react";
import FormSinhVien from "./FormSinhVien";
import { createRef } from "react";
import { connect } from "react-redux";

class XuLyForm extends Component {
  constructor() {
    super();
    this.ref = createRef();
  }
  state = {
    arrThongTin: [],
  };
  // themSinhVien = (sinhVien) => {
  //   let newThongTin = this.state.arrThongTin;
  //   newThongTin.push(sinhVien);
  //   this.setState({
  //     arrThongTin: newThongTin,
  //   });
  // };
  // xoaSinhVien = (maSV) => {
  //   let index = this.state.arrThongTin.findIndex((item) => item.maSV == maSV);
  //   if (index != -1) {
  //     let newThongTin = [...this.state.arrThongTin];
  //     newThongTin.splice(index, 1);
  //     this.setState({
  //       arrThongTin: newThongTin,
  //     });
  //   }
  // };
  // layThongTinInput = (maSV) => {
  //   let sinhVien = this.props.mangSinhVien.find(
  //     (item) => item.maSV == sinhVien.maSV
  //   );
  //   // if (sinhVien) {
  //   //   this.setState({
  //   //     ...this.state,
  //   //     sinhVien: sinhVien,
  //   //   });
  //   this.ref.current.setState({
  //     ...this.ref.current.state,
  //     values: sinhVien,
  //   });
  // };
  // capNhatThongTin = (sinhVien) => {
  //   let index = this.state.arrThongTin.findIndex(
  //     (item) => item.maSV == sinhVien.maSV
  //   );
  //   if (index !== -1) {
  //     let arrnewThongTin = [...this.state.arrThongTin];
  //     arrnewThongTin[index] = sinhVien;
  //     this.setState({ arrThongTin: arrnewThongTin });
  //   }
  // };
  renderThongTin = () => {
    const { mangSinhVien } = this.props;
    return mangSinhVien.map((sinhVien, index) => {
      return (
        <tr key={index}>
          <td>{sinhVien.maSV}</td>
          <td>{sinhVien.hoTen}</td>
          <td>{sinhVien.soDT}</td>
          <td>{sinhVien.email}</td>
          <button
            className="btn btn-danger"
            onClick={() => {
              this.props.xoaSinhVien(sinhVien.maSV);
            }}
          >
            Xóa
          </button>
          <button
            className="btn btn-warning"
            onClick={() => {
              this.props.ThongTinSV(sinhVien);
            }}
          >
            Sữa
          </button>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="p-3 mb-2 bg-secondary text-white text-center">
            THÔNG TIN SINH VIÊN
          </h1>
          <FormSinhVien
            // ref={this.ref}
            themSinhVien={this.themSinhVien}
            ThongTinSV={this.ThongTinSV}
            // capNhatThongTin={this.capNhatThongTin}
          />
          <div>
            <div>
              <label>Tìm Kiếm: </label>
              <input className="inputSearch m-3" type="search" id="seach" />
              <button
                type="search"
                className="w-10 h-25"
                onClick={() => {
                  // this.props.dispatch();
                }}
              >
                Search
              </button>
            </div>
            <table className="table mt-2" cellPadding={20}>
              <thead className="bg-secondary text-white">
                <th>Mã Sinh Viên</th>
                <th>Họ Và Tên</th>
                <th>Số Điện Thoại</th>
                <th>EMail</th>
                <th>Hành Động</th>
              </thead>
              <tbody>{this.renderThongTin()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  // componentDidUpdate(prewProps,prewState){

  // }
}
const mapDispatchToProps = (dispatch) => {
  return {
    xoaSinhVien: (maSV) => {
      const action = {
        type: "XOA_SINH_VIEN",
        maSV,
      };

      dispatch(action);
    },
    ThongTinSV: (sinhVien) => {
      const action = {
        type: "TT_SINH_VIEN",
        sinhVien,
      };

      dispatch(action);
    },
    SearchThongTin: (sinhVien) => {
      const action = {
        type: "SEARCH",
        sinhVien,
      };
      dispatch(action);
    },
  };
};
const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.sinhVienReduce.mangSinhVien,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(XuLyForm);
