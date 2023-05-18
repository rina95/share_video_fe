import axios from "axios";
import {API_ROOT} from "../common/ShareVariable";

const register = (username, email, password) => {
  return axios.post(API_ROOT + "users", {
    "user": {
      "name": username,
      "email": email,
      "password": password
    }
  });
};

const login = (email, password) => {
  return axios
    .post(API_ROOT + "sessions/create", {
      "user": {
        "email": email,
        "password": password
      }
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getAuthToken = () => {
  const user = getCurrentUser();
  return user && user.token;
}

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  getAuthToken
}

export default AuthService;
