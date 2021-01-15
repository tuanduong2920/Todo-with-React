import React from "react";
import "./Footer.css";
import { Button } from 'antd';

const Footer = (props) => {

  
    const {filter, changeFilter} = props;
    console.log("footer render");
    return(
        <div className="footer">
            <Button type={filter === "all" ? 'primary' : ''} onClick={() => changeFilter("all")}>Tất Cả</Button>
            <Button type={filter === "doing" ? 'primary' : ''} onClick={() => changeFilter("doing")}>Chưa hoàn thành</Button>
            <Button type={filter === "finish" ? 'primary' : ''} onClick={() => changeFilter("finish")}>Đã hoàn thành</Button>

        </div>
    )
}


export default React.memo(Footer);