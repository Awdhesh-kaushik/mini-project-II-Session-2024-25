import React from "react";
import { Menu, Dropdown, Button, Row, Col } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function DefaultLayout(props) {
  const token = localStorage.getItem("user");
  // let user = {};
  let user = jwtDecode(token);
  // if (token) {
  //   user = jwtDecode(token);
  // }
  const location = useLocation();

  const menu = (
    <Menu>
      <Menu.Item
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/login";
        }}
      >
        <span className="logout-link">Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="header bs1">
        <Row gutter={16} justify="center">
          <Col lg={20} sm={24} xs={24}>
            <div className="d-flex align-items-center">
              <h1>
                <b>
                  <NavLink className="text-logo" to="/">
                    WanderWheels
                  </NavLink>
                </b>
              </h1>
              <div className="nav-links">
                <NavLink
                  to="/"
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/userbookings"
                  className={`nav-link ${
                    location.pathname === "/userbookings" ? "active" : ""
                  }`}
                >
                  Bookings
                </NavLink>
                <NavLink
                  to="/admin"
                  className={`nav-link ${
                    location.pathname === "/admin" ? "active" : ""
                  }`}
                >
                  Admin
                </NavLink>
              </div>
              <Dropdown overlay={menu} placement="bottomCenter">
                <Button className="header-btn">{user.username}</Button>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </div>
      <div className="content">{props.children}</div>

      <section className="footer">
        <div>
          <div className="aboutus">
            <h4 className="bold">Let's Know Us</h4>
          </div>
          <div className="sub-description">
            <p>
              Imagine the freedom to explore the vibrant streets of country at
              your own pace, without the constraints of fixed schedules. Rent a
              car in Vadodara and enjoy the flexibility to choose when and where
              you want to go. Whether it's a business meeting, a weekend
              getaway, or just a leisurely drive through the city, a self-drive
              car ensures you get there comfortably and on time
            </p>
          </div>
        </div>
        <div className="contactdetails">
          <div className="contactus">
            <table>
              <tr>
                <td className="flstyle">Email</td>
                <td className="frstyle">
                  <a href="mailto:wanderwheels13@gmail.com">
                    WanderWheels@gmail.com
                  </a>
                </td>
              </tr>
              <tr>
                <td className="flstyle">Phone</td>
                <td className="frstyle">
                  <a href="tel:+9104513203">(+91) 9876543210</a>
                </td>
              </tr>
            </table>
          </div>

          <div className="ficons">
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/instagram-new--v1.png"
              alt="instagram-new--v1"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/facebook--v1.png"
              alt="facebook--v1"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/50/FFFFFF/twitterx--v1.png"
              alt="twitterx--v1"
            />
          </div>
        </div>
      </section>

      <div className="copyright">
        <p>
          Copyright (c) 2025{" Team Gla "}
          <img
            width="22"
            height="22"
            src="https://img.icons8.com/material-outlined/24/FFFFFF/copyright.png"
            alt="copyright"
          />{" "}
          WanderWheels
        </p>
      </div>
    </div>
  );
}

export default DefaultLayout;
