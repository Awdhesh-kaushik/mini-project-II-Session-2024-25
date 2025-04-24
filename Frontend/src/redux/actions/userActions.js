import axios from "axios";
import { message } from "antd";

// Action to register a new user
export const userRegister = (reqObj, history) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/register", reqObj);
    message.success("Registration successful");
    history.push("/login");
  } catch (error) {
    console.error(error);
    message.error("Registration failed");
  }
};

// Action to login user
export const userLogin = (reqObj, history) => async (dispatch) => {
  try {
    const response = await axios.post("/api/users/login", reqObj);
    localStorage.setItem("user", JSON.stringify(response.data));
    message.success("Login successful");
    history.push("/"); // Redirect to the home page
  } catch (error) {
    message.error("Login failed");
  }
};
