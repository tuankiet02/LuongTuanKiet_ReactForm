import React, { Component } from "react";
import { connect } from "react-redux";
class FormSinhVien extends Component {
  state = {
    values: { maSV: "", hoTen: "", soDT: "", email: "" },
    orros: { maSV: "", hoTen: "", soDT: "", email: "" },
    activeButton: true,
  };
  getValueInput = (event) => {
    let { value, id } = event.target;

    let newValue = this.state.values;
    newValue[id] = value;
    let neworros = this.state.orros;
    if (newValue[id] == "") {
      neworros[id] = `${id} không được để trống`;
    } else {
      neworros[id] = "";
      let type = event.target.getAttribute("data-type");

      switch (type) {
        case "number":
          {
            let regexNumber = /^[0-9]*$/;
            let res = regexNumber.test(newValue[id]);
            if (!res) {
              neworros[id] = "Trường này chỉ được nhập số";
            }
          }
          break;
        case "letter":
          {
            let regexText = /^[\p{L} ]+$/u;
            let resul = regexText.test(newValue[id]);
            if (!resul) {
              neworros[id] = "Trường này chỉ được nhập chữ";
            }
          }
          break;
        case "email":
          {
            let regexEmail =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let checkEmail = regexEmail.test(newValue.email);
            if (!checkEmail) {
              neworros.email = "Nhập đúng định dạng email";
            }
          }
          break;
      }
    }
    let valid = false;
    for (let item in neworros) {
      if (this.state.orros[item] !== "" || this.state.values[item] == "") {
        valid = true;
      }
    }
    this.setState({
      values: newValue,
      orros: neworros,
      activeButton: valid,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.themSinhVien({ ...this.state.values });
  };

  componentDidUpdate(prevProps) {
    if (this.props.sinhVienEdit !== prevProps.sinhVienEdit) {
      this.setState({
        ...this.state,
        values: {
          maSV: this.props.sinhVienEdit.maSV,
          hoTen: this.props.sinhVienEdit.hoTen,
          soDT: this.props.sinhVienEdit.soDT,
          email: this.props.sinhVienEdit.email,
        },
      });
    }
  }

  render() {
    let { maSV, hoTen, soDT, email } = this.state.orros;
    return (
      <div>
        <form
          className="card bg-success-subtle bg-opacity-50"
          onSubmit={this.handleSubmit}
        >
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="">Mã sinh viên</label>
                <input
                  className="form-control"
                  type="text"
                  id="maSV"
                  value={this.state.values?.maSV}
                  onChange={this.getValueInput}
                />
                <p className="text-danger">{maSV}</p>
              </div>
              <div className="col-6">
                <label htmlFor="">Họ và tên</label>
                <input
                  className="form-control"
                  type="text"
                  id="hoTen"
                  value={this.state.values?.hoTen}
                  data-type="letter"
                  onChange={this.getValueInput}
                />
                <p className="text-danger">{hoTen}</p>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-6">
                <label htmlFor="">Số điện thoại</label>
                <input
                  className="form-control"
                  type="text"
                  id="soDT"
                  value={this.state.values?.soDT}
                  onChange={this.getValueInput}
                  data-type="number"
                />
                <p className="text-danger">{soDT}</p>
              </div>
              <div className="col-6">
                <label htmlFor="">Email</label>
                <input
                  data-type="email"
                  className="form-control"
                  type="text"
                  id="email"
                  value={this.state.values?.email}
                  onChange={this.getValueInput}
                />
                <p className="text-danger">{email}</p>
              </div>
            </div>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-primary me-3"
              type="submit"
              disabled={this.state.activeButton}
            >
              Thêm sinh viên
            </button>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => {
                this.props.capNhatSinhVien({ ...this.state.values });
              }}
            >
              Thêm cập nhật
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    themSinhVien: (sinhVien) => {
      const action = {
        type: "THEM_SINH_VIEN",
        sinhVien,
      };
      dispatch(action);
    },
    capNhatSinhVien: (sinhVien) => {
      const action = {
        type: "CAP_NHAT_SV",
        sinhVien,
      };
      dispatch(action);
    },
  };
};

const mapStateToProps = (state) => {
  return {
    mangSinhVien: state.sinhVienReduce.mangSinhVien,
    sinhVienEdit: state.sinhVienReduce.sinhVienEdit,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormSinhVien);
