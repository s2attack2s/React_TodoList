import React, { Component } from "react";
import { listTodo } from "../db/todoList";
import "../css/todoList.css";
import Detail from "./detailList";
class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
    this.postTodo = this.postTodo.bind(this);
    this.delete = this.delete.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.setState({ data: listTodo });
  }

  postTodo = (e) => {
    e.preventDefault();

    let toDay = new Date();
    let addTime =
      toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1) +
      "-" +
      toDay.getDate();
    let content = document.getElementById("todoContent");
    let workDay = document.getElementById("workDay");

    let newData = {
      content: content.value,
      workDay: workDay.value,
      addTime: addTime,
    };

    let arr = this.state.data;
    content.value = null;
    workDay.value = "dd/mm/yyyy";
    this.setState({ data: [...arr, newData] });
  };
  edit = (id) => {
    let arr = this.state.data;
    document.getElementById("submitContent").style.display = "none";
    document.getElementById("buttonUpdate").style.display = "block";
    document.getElementById("todoContent").value = arr[id].content;
    document.getElementById("workDay").value = arr[id].workDay;
    document.getElementById("idUpdate").value = id;
  };
  updateTodo = () => {
    let id = document.getElementById("idUpdate").value;
    let toDay = new Date();
    let addTime =
      toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1) +
      "-" +
      toDay.getDate();
    let arr = this.state.data;
    let content = document.getElementById("todoContent").value;
    let workDay = document.getElementById("workDay").value;
    let newData = {
      content: content,
      workDay: workDay,
      addTime: addTime,
    };
    arr.splice(id, 1, newData);
    document.getElementById("submitContent").style.display = "inline-block";
    document.getElementById("buttonUpdate").style.display = "none";
    this.setState({ data: arr });
  };
  destroyUpdate = () => {
    document.getElementById("submitContent").style.display = "inline-block";
    document.getElementById("buttonUpdate").style.display = "none";
  };
  delete = (id) => {
    let arr = this.state.data;
    arr.splice(id, 1);
    this.setState({ data: arr });
  };

  render() {
    return (  
      <div className="todoList">
        <div className="screen_input">
          <textarea
            type="text"
            placeholder="Nhập nội dung..."
            id="todoContent"
            rows="5"
          />
          <input type="date" id="workDay" />
          <button onClick={this.postTodo} id="submitContent">
            Gửi
          </button>
          <div id="buttonUpdate">
            <input type="hidden" id="idUpdate" />
            <button onClick={this.updateTodo} id="updateContent">
              Cập nhật
            </button>
            <button onClick={this.destroyUpdate} id="destroySubmmit">
              Hủy
            </button>
          </div>
        </div>
        <div className="todoGroup">
          <div className="content">Nội dung</div>
          <div className="workDay">Ngày làm</div>
          <div className="addTime">Ngày tạo</div>
          <div className="setting">Tùy chọn</div>
        </div>
        <div className="groupContent" id="groupContent">
          {this.state.data.map((val, key) => (
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
