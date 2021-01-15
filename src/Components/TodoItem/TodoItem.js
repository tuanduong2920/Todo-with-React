import React, { Component } from "react";
import "./TodoItem.css";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";

class TodoItem extends Component {
  render() {
    const { item, onClickItem, onDelete } = this.props;
    let itemClass = "TodoItem";
    let checkStyle = "notCheck";

    if (item.isDone) {
      itemClass += " TodoItem-done";
      checkStyle = "check";
    }

    console.log('item render')
    return (
      <div className={itemClass}>
        <CheckOutlined
          className={checkStyle}
          onClick={() => onClickItem(item.id)}
        />

        <p>{item.title}</p>
        <CloseOutlined className="remove" onClick={() => onDelete(item.id)} />
      </div>
    );
  }
}

export default React.memo(TodoItem);
