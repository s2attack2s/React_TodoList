import React, { Component } from "react";

class Detail extends Component {
  render() {
    let { content, workDay, addTime } = this.props.value;
    return (
      <div className="todoGroup">
        <div className="content">{content}</div>
        <div className="workDay">{workDay}</div>
        <div className="addTime">{addTime}</div>
        <div className="setting">
          <button className="edit" onClick={this.props.edit}>
            Sửa
          </button>
          <button className="delete" onClick={this.props.remove}>
            Xóa
          </button>
        </div>
      </div>
    );
  }
}

export default Detail;
