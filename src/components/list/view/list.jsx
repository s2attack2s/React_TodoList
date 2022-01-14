import React, { Component } from "react";
import listTodo from "../db/todoList";
import "../css/todoList.css";
import Detail from "./detailList";
import reactDom from "react-dom";
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTodo: [],
    };
  }

  //Cấu hình giá trị hiển thị
  UNSAFE_componentWillMount() {
    this.setState({
      dataTodo: listTodo,
      showButton: true,
    });
  }

  //Sự kiện nhập giá trị nội dung
  handleOnchangeContent = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  //sự kiện nhập giá trị ngày tháng năm
  handleOnchangeWorkDay = (e) => {
    this.setState({
      workDay: e.target.value,
    });
  };

  // thêm mới TodoLisst
  postTodo = (e) => {
    e.preventDefault();

    let toDay = new Date();
    let addTime =
      toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1) +
      "-" +
      toDay.getDate();
    let { content, workDay } = this.state;
    if (content) {
      let newData = { content, workDay, addTime };

      this.setState({
        dataTodo: [newData, ...this.state.dataTodo],
        content: "",
        workDay: "",
        idUpdate: "",
      });
    } else {
      this.setState({
        classErr: "error",
        plancehoder: "Vui lòng nhập nội dung",
      });
    }
  };

  // Hiển thị nội dung cần chỉnh sửa
  edit = (val, key) => {
    let { content, workDay } = val;
    let idUpdate = key;
    this.setState({ content, workDay, showButton: false, idUpdate });
  };

  // Cập nhật listTodo
  updateTodo = () => {
    let idUpdate = this.state.idUpdate;
    let toDay = new Date();
    let addTime =
      toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1) +
      "-" +
      toDay.getDate();
    let dataTodo = this.state.dataTodo;
    let { content, workDay } = this.state;
    if (content) {
      let newData = { content, workDay, addTime };
      dataTodo.splice(idUpdate, 1, newData);
      this.setState({
        dataTodo,
        showButton: true,
        content: "",
        workDay: "",
        idUpdate: "",
      });
    } else {
      this.setState({
        classErr: "error",
        plancehoder: "Vui lòng nhập nội dung",
      });
    }
  };

  //Hủy cập nhật
  destroyUpdate = () => {
    this.setState({ content: "", workDay: "", idUpdate: "", showButton: true });
  };

  //Xóa dữ liệu
  remove = (id) => {
    let dataTodo = this.state.dataTodo;
    dataTodo.splice(id, 1);
    this.setState({
      dataTodo,
      showButton: true,
      content: "",
      workDay: "",
      idUpdate: "",
    });
  };

  // Cho phép render lại khi state thay đổi
  shouldComponentUpdate() {
    return true;
  }

  render() {
    // kiểm tra trạng thái để hiển thị button tương ứng
    let checkShowbutton = this.state.showButton;
    let button;
    if (checkShowbutton === true) {
      button = (
        <button onClick={this.postTodo} id="submitContent">
          Gửi
        </button>
      );
    } else {
      button = (
        <div id="buttonUpdate">
          <button onClick={this.updateTodo} id="updateContent">
            Cập nhật
          </button>
          <button onClick={this.destroyUpdate} id="destroySubmmit">
            Hủy
          </button>
        </div>
      );
    }
    return (
      <div className="todoList">
        <h2>Todo List</h2>
        <div className="screen_input">
          <textarea
            type="text"
            placeholder={this.state.plancehoder || "Nhập nội dung ..."}
            className={this.state.classErr}
            id="todoContent"
            value={this.state.content}
            onChange={this.handleOnchangeContent}
            rows="5"
          />
          <input
            type="date"
            id="workDay"
            value={this.state.workDay}
            onChange={this.handleOnchangeWorkDay}
          />
          {button}
        </div>
        <div className="todoGroup">
          <div className="content">Nội dung</div>
          <div className="workDay">Ngày làm</div>
          <div className="addTime">Ngày tạo</div>
          <div className="setting">Tùy chọn</div>
        </div>
        <div className="groupContent" id="groupContent">
          {this.state.dataTodo.map((val, key) => (
            <Detail
              value={val}
              key={key}
              edit={() => this.edit(val, key)}
              remove={() => this.remove(key)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
