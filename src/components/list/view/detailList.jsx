import React, { Component } from "react";

class Detail extends Component {
  render() {
    let { content, workDay, addTime } = this.props.value;
    return (
      <>
        <div className="content">{content}</div>
        <div className="workDay">{workDay}</div>
        <div className="addTime">{addTime}</div>
      </>
    );
  }
}

export default Detail;
