import React, { Component, useEffect, useState } from "react";
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
    useState: {
      filteredStudents: [],
      searchTerm: "",
    },
  };
  onChangeSearch = (event) => {
    this.setState({ searchTerm: event.target.value });
    console.log(this.state.searchTerm);
  };
  searchStudentHandler = () => {
    this.props.SearchThongTin(this.state.searchTerm);
    console.log(this.state.searchTerm);
  };

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
            className="btn btn-danger bg-danger"
            onClick={() => {
              this.props.xoaSinhVien(sinhVien.maSV);
            }}
          >
            Xóa
          </button>
          <button
            className="btn btn-warning bg-warning"
            onClick={() => {
              this.props.ThongTinSV(sinhVien);
            }}
          >
            Cập nhật
          </button>
        </tr>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="container">
          <h1 className="p-3 mb-2 bg-dark text-white text-center">
            Danh sách sinh viên
          </h1>
          <FormSinhVien
            themSinhVien={this.themSinhVien}
            ThongTinSV={this.ThongTinSV}
          />
          <div>
            <div>
              <label>Tìm kiếm: </label>
              <input
                className="inputSearch m-3"
                type="search"
                id="seach"
                value={this.state.searchTerm}
                onChange={this.onChangeSearch}
              />
              <button
                type="search"
                className="w-10 h-25 btn btn-outline-dark"
                onClick={this.searchStudentHandler}
              >
                Search
              </button>
            </div>
            <table className="table mt-2" cellPadding={20}>
              <thead className="bg-dark text-white">
                <th>Mã SV</th>
                <th>Họ tên</th>
                <th>Số điện thoại</th>
                <th>Email</th>
                <th></th>
              </thead>
              <tbody>{this.renderThongTin()}</tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
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
      console.log("redux", sinhVien);
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
