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
            <Link to="/about">
              <li>Giới thiệu</li>
            </Link>
          </ul>
        </div>
      </div>
    );
  }
}
export default Menu;
