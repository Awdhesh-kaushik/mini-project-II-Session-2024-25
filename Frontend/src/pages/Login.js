import React from "react";
import { Row, Col, Form, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css";

// Initializing AOS for animations
AOS.init();

// Defining the Login component
function Login() {
  // Initializing useDispatch and useHistory hooks
  const dispatch = useDispatch();
  const history = useHistory();

  // Retrieving loading state from the Redux store
  const { loading } = useSelector((state) => state.alertsReducer);

  // Function to handle form submission
  const onFinish = (values) => {
    dispatch(userLogin(values, history)); // Dispatching userLogin action with form values and history object
  };

  // Rendering the Login component
  return (
    <div className="login">
      {/* Rendering Spinner component if loading state is true */}
      {loading && <Spinner />}
      {/* Creating a row layout with two columns */}
      <Row gutter={16} className="d-flex align-items-center">
        {/* First column containing WanderWheels logo */}
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-right"
            data-aos-duration="1500"
            src={
              "https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png"
            }
          />
          <h1 className="login-logo">WanderWheels</h1>
        </Col>
        {/* Second column containing login form */}
        <Col lg={8} className="text-left p-5">
          {/* Form for user login */}
          <Form
            layout="vertical"
            className="login-form p-5 logp"
            onFinish={onFinish}
          >
            <h1>Login</h1>
            <hr />
            {/* Username input field */}
            <label htmlFor="username" className="fontSize">
              Username
            </label>
            <Form.Item name="username" label="" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            {/* Password input field */}
            <label htmlFor="password" className="fontSize">
              Password
            </label>
            <Form.Item name="password" label="" rules={[{ required: true }]}>
              <Input.Password />
            </Form.Item>
            {/* Login button */}
            <button
              type="submit"
              className="btn-lg mt-2 btn btn-outline-success"
              style={{ width: 90, borderWidth: 2 }}
            >
              Login
            </button>
            {/* Link to registration page */}
            <hr />
            <Link to="/register">Click Here to Register</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
