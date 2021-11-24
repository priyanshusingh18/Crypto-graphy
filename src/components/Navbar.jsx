import React, { useState, useEffect, useRef } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  FundOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import icon from "../images/cryptocurrency.png";
const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);

  const [screenSize, setScreenSize] = useState(window.innerWidth);

  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      // console.log(screenSize >= 800, screenSize);
      if (ref.current?.contains(event.target) || window.innerWidth >= 800) {
        return;
      }
      setActiveMenu(false);
    };
    document.body.addEventListener("click", onBodyClick);
    return () => {
      document.body.removeEventListener("click", onBodyClick);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize, window.innerWidth]);

  useEffect(() => {
    // console.log("WORKING", screenSize, window.innerWidth);
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize, window.innerWidth]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={3} className="logo">
          <Link to="/">Crypto-graphy</Link>
        </Typography.Title>
        <Button
          className="menu-control-container"
          ref={ref}
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu ? (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">cryptocurrencies</Link>
          </Menu.Item>
          <Menu.Item icon={<MoneyCollectOutlined />}>
            <Link to="/exchanges">Exchanges</Link>
          </Menu.Item>
          <Menu.Item icon={<BulbOutlined />}>
            <Link to="/news">News</Link>
          </Menu.Item>
        </Menu>
      ) : (
        ""
      )}
    </div>
  );
};

export default Navbar;
