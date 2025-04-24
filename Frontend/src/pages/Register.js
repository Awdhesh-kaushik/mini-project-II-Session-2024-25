import React, { useEffect } from "react";
import { Row, Col, Form, Input } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../redux/actions/userActions";
import AOS from "aos";
import Spinner from "../components/Spinner";
import "aos/dist/aos.css";

AOS.init();

function Register() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector((state) => state.alertsReducer);

  useEffect(() => {
    // Optionally, you can clear any previous authentication state or errors here
  }, []);

  const onFinish = (values) => {
    dispatch(userRegister(values, history));
  };

  // Custom validation for password field
  const validatePassword = (_, value) => {
    if (!value || value.length < 6) {
      return Promise.reject(
        new Error("Password must be at least 6 characters long")
      );
    }
    // Check for at least one special symbol using regex
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject(
        new Error("Password must contain at least one special symbol")
      );
    }
    return Promise.resolve();
  };

  return (
    <div className="login">
      {loading && <Spinner />}
      <Row gutter={16} className="d-flex align-items-center">
        <Col lg={16} style={{ position: "relative" }}>
          <img
            className="w-100"
            data-aos="slide-left"
            data-aos-duration="1500"
            src="https://i.pinimg.com/originals/dc/19/e9/dc19e9b94a372ebc21ffeb7623d5632a.png"
          />
          <h1 className="login-log">WanderWheels</h1>
        </Col>
        <Col lg={8} className="text-left p-5">
          <Form
            layout="vertical"
            className="login-form p-5 logp"
            onFinish={onFinish}
          >
            <h1>Register</h1>
            <hr />
            <label htmlFor="username" className="fontSize">
              Username
            </label>
            <Form.Item name="username" label="" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <label htmlFor="password" className="fontSize">
              Password
            </label>
            <Form.Item
              name="password"
              label=""
              rules={[{ required: true, validator: validatePassword }]}
            >
              <Input.Password />
            </Form.Item>
            <label htmlFor="cpassword" className="fontSize">
              Confirm Password
            </label>
            <Form.Item
              name="cpassword"
              label=""
              dependencies={["password"]}
              rules={[
                { required: true },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Both Passwords Should Match")
                    );
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <hr />

            <button
              type="submit"
              className="btn-lg mt-2 btn btn-outline-success"
              style={{ width: 100, borderWidth: 2, margin: 10 }}
            >
              Register
            </button>
            <br />

            <Link to="/login">Click Here to Login</Link>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Register;
