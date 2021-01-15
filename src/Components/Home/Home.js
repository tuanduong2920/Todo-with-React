import React, { Component } from "react";
import "./Home.css";


import { Empty } from "antd";
import { CheckCircleOutlined, CheckCircleTwoTone } from "@ant-design/icons";

import TodoItem from "../TodoItem/TodoItem";
import Footer from "../Footer/Footer";


class Home extends Component {
    constructor() {
      super();
      this.state = {
        isCheckAll: false,
        filter: "all",
        newItem: "",
        todoList: [],
      };
      this.indexId = 0;
    }
  
    componentDidMount() {
      if(localStorage.getItem('todoList') != null){
        const todoList = JSON.parse(localStorage.getItem('todoList'));
        // console.log(todoList);
        this.setState({ todoList: todoList });
      }
    
    }
  
    componentDidUpdate(){
      localStorage.setItem('todoList', JSON.stringify(this.state.todoList)); 
    } 
  
   
  
    onClickItem = (id) => {
      const itemIndex = this.state.todoList.findIndex((p) => p.id === id);
      const item = this.state.todoList[itemIndex];
      const resIntem = { ...item, isDone: !item.isDone };
  
      const todoList = [...this.state.todoList];
  
      todoList[itemIndex] = resIntem;
  
      this.setState({
        todoList: todoList,
      });
  
    };
  
    onDelete = (id) => {
      const todolist = this.state.todoList.filter((i) => i.id !== id);
  
      this.setState({
        todoList: todolist,
      });
     
    };
  
    onSubmitForm = (event) => {
      event.preventDefault();
  
      const item = {
        id: this.indexId++,
        title: this.state.newItem.trim(),
        isDone: false,
      };
  
      this.setState({
        newItem: "",
        todoList: [item, ...this.state.todoList],
      });
      const todoList = this.state.todoList;
      console.log(todoList);
  
    };
  
    onChange = (event) => {
      this.setState({
        newItem: event.target.value,
      });
    };
  
    checkAll = () => {
      if (this.state.todoList.length > 0) {
        const check = !this.state.isCheckAll;
  
        this.setState({
          isCheckAll: check,
        });
  
        if (check) {
          const todoListAllCheck = this.state.todoList.map((item) => {
            const res = { ...item, isDone: true };
            return res;
          });
          // console.log(todoListAllCheck);
          this.setState({
            todoList: todoListAllCheck,
          });
        } else {
          const todoListAllCheck = this.state.todoList.map((item) => {
            const res = { ...item, isDone: false };
            return res;
          });
          // console.log(todoListAllCheck);
          this.setState({
            todoList: todoListAllCheck,
          });
        }
      }
    };
  
    changeFilter = (filter) => {
      this.setState({
        filter: filter,
      });
    };
  
    render() {
      console.log('app render')
      const { isCheckAll, filter } = this.state;
  
      let todolists;
      if (filter === "all") {
        todolists = this.state.todoList;
      } else if (filter === "doing") {
        todolists = this.state.todoList.filter((i) => i.isDone === false);
      } else {
        todolists = this.state.todoList.filter((i) => i.isDone === true);
      }
  
      return (
        <div className="Home">
          <div className="header">
            {!isCheckAll ? (
              <CheckCircleOutlined className="icon" onClick={this.checkAll} />
            ) : (
              <CheckCircleTwoTone className="icon" onClick={this.checkAll} />
            )}
  
            <form onSubmit={this.onSubmitForm}>
              <input
                name="title"
                type="text"
                value={this.state.newItem}
                onChange={this.onChange}
                placeholder="Thêm mới công việc"
                required
              />
            </form>
          </div>
          {todolists.length > 0 ? (
            todolists.map((item, inx) => (
              <TodoItem
                key={inx}
                item={item}
                onDelete={this.onDelete}
                onClickItem={this.onClickItem}
              ></TodoItem>
            ))
          ) : (
            <Empty description="Danh sách trống"></Empty>
            // <p className="empty-text">Danh sách trống.</p>
          )}
  
          <Footer filter={this.state.filter} changeFilter={this.changeFilter} />
        </div>
      );
    }
  }
  
  export default Home;