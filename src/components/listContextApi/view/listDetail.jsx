import React, { useContext } from "react";

import { ListContext } from "./listContextApi";

function ListDetail() {
  const listData = useContext(ListContext);
  return (
    <>
      <div className="content">{listData.content}</div>
      <div className="workDay">{listData.workDay}</div>
      <div className="addTime">{listData.addTime}</div>
    </>
  );
}
export default ListDetail;
