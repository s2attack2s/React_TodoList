import React, { Component } from "react";
import listTodo from "../db/todoList";
import "../css/todoList.css";
import Detail from "./detailList";
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataTodo: [],
    };
    this.postTodo = this.postTodo.bind(this);
    this.delete = this.delete.bind(this);
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
      todoContent: e.target.value,
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
    let content = this.state.todoContent;
    let workDay = this.state.workDay;
    if (content) {
      let newData = {
        content: content,
        workDay: workDay,
        addTime: addTime,
      };

      let arr = this.state.dataTodo;

      this.setState({
        dataTodo: [...arr, newData],
        todoContent: "",
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
  edit = (id) => {
    let arr = this.state.dataTodo;
    let content = arr[id].content;
    let workDay = arr[id].workDay;
    let idUpdate = id;
    this.setState({
      showButton: false,
      todoContent: content,
      workDay: workDay,
      idUpdate: idUpdate,
    });
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
    let arr = this.state.dataTodo;
    let content = this.state.todoContent;
    let workDay = this.state.workDay;
    if (content) {
      let newData = {
        content: content,
        workDay: workDay,
        addTime: addTime,
      };
      arr.splice(idUpdate, 1, newData);
      this.setState({
        dataTodo: arr,
        showButton: true,
        todoContent: "",
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
    this.setState({ showButton: true });
  };

  //Xóa dữ liệu
  delete = (id) => {
    let arr = this.state.dataTodo;
    arr.splice(id, 1);
    this.setState({ dataTodo: arr, showButton: true });
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
          <label>
            <textarea
              type="text"
              placeholder={this.state.plancehoder || "Nhập nội dung ..."}
              className={this.state.classErr}
              id="todoContent"
              value={this.state.todoContent}
              onChange={this.handleOnchangeContent.bind(this)}
              rows="5"
            />
          </label>
          <input
            type="date"
            id="workDay"
            value={this.state.workDay}
            onChange={this.handleOnchangeWorkDay.bind(this)}
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
            <div className="todoGroup" key={key}>
              <Detail value={val} id={key} key={key} />
              <div className="setting">
                <button className="edit" onClick={() => this.edit(key)}>
                  Sửa
                </button>
                <button className="delete" onClick={() => this.delete(key)}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default TodoList;
