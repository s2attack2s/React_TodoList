import React, { useState } from "react";
import ListDetail from "./listDetail";
import listTodo from "../../list/db/todoList";
import "../../list/css/todoList.css";
export const ListContext = React.createContext();

const ListProvider = ListContext.Provider;

function ListContextApi() {
  //set useState
  let [showButton = true, setIsShow] = useState();
  let [todoContent, setTodoContent] = useState();
  let [todoWorkDay, setTodoWorkDay] = useState();
  let [idUpdate, setIdUpdate] = useState();
  let [listData, setListData] = useState(listTodo);
  let [classErr, setClassErr] = useState();
  let [placeholder, setPlance] = useState();

  let toDay = new Date();
  let addTime =
    toDay.getFullYear() + "-" + (toDay.getMonth() + 1) + "-" + toDay.getDate();

  // Sự kiện nhập nội dung
  let handleChangeContent = (e) => {
    setTodoContent((todoContent = e.target.value));
  };

  //Sự kiện nhập ngày tháng
  let handleChangeWorkDay = (e) => {
    setTodoWorkDay((todoWorkDay = e.target.value));
  };

  // gọi dữ liệu chỉnh sửa
  let handleEdit = (id) => {
    let idTodo = id.target.value;
    setIsShow((showButton = false));
    setTodoContent((todoContent = listData[idTodo].content));
    setTodoWorkDay((todoWorkDay = listData[idTodo].workDay));
    setIdUpdate((idUpdate = idTodo));
  };

  //Hủy cập nhật
  let destroyUpdate = () => {
    setIsShow((showButton = true));
  };

  // thêm mới
  let insertTodo = () => {
    if (todoContent) {
      let newData = {
        content: todoContent,
        workDay: todoWorkDay,
        addTime: addTime,
      };
      setIsShow((showButton = true));
      setTodoContent((todoContent = ""));
      setTodoWorkDay((todoWorkDay = "mm/dd/yyyy"));
      setListData((listData = [...listData, newData]));
    } else {
      setClassErr((classErr = "error"));
      setPlance((placeholder = "Vui lòng nhập nội dung"));
    }
  };

  // cập nhật
  let updateTodo = (id) => {
    if (todoContent) {
      let idTodo = id.target.value;
      let newData = {
        content: todoContent,
        workDay: todoWorkDay,
        addTime: addTime,
      };
      let listNew = listData.splice(idTodo, 1, newData);
      setIsShow((showButton = true));
      setTodoContent((todoContent = ""));
      setTodoWorkDay((todoWorkDay = "mm/dd/yyyy"));
      setListData((listData = listNew));
    } else {
      setClassErr((classErr = "error"));
      setPlance((placeholder = "Vui lòng nhập nội dung"));
    }
  };

  //xóa
  let handleDelete = (id) => {
    let idTodo = id.target.value;

    listData.splice(idTodo, 1);
    setIsShow((showButton = true));
    setTodoContent((todoContent = ""));
    setTodoWorkDay((todoWorkDay = "mm/dd/yyyy"));
    setListData((listData = [...listData]));
  };

  let button;
  if (showButton === true) {
    button = (
      <button id="submitContent" onClick={insertTodo}>
        Gửi
      </button>
    );
  } else {
    button = (
      <div id="buttonUpdate">
        <button id="updateContent" onClick={updateTodo} value={idUpdate}>
          Cập nhật
        </button>
        <button id="destroySubmmit" onClick={destroyUpdate}>
          Hủy
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="todoList">
        <h2>Todo List - Context API</h2>
        <div className="screen_input">
          <textarea
            type="text"
            placeholder={placeholder || "Nhập nội dung..."}
            id="todoContent"
            className={classErr}
            rows="5"
            value={todoContent}
            onChange={handleChangeContent}
          />
          <input
            type="date"
            id="workDay"
            value={todoWorkDay}
            onChange={handleChangeWorkDay}
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
          {listData.map((val, key) => (
            <div className="todoGroup" key={key}>
              <ListProvider value={val}>
                <ListDetail />
              </ListProvider>
              <div className="setting">
                <button className="edit" onClick={handleEdit} value={key}>
                  Sửa
                </button>
                <button className="delete" onClick={handleDelete} value={key}>
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ListContextApi;
