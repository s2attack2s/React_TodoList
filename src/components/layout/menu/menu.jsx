import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./menu.css";
class Menu extends Component {
  render() {
    return (
      <div>
        <div className="menu">
          <ul>
            <Link to="/">
              <li>Trang chủ</li>
            </Link>
            <Link to="/todo-list-context-api">
              <li>TodoList - Context API</li>
            </Link>
            <Link to="/todo-list-redux">
              <li>TodoList - Redux</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}
export default Menu;
