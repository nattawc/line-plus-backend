import axios from "axios";
import configs from "../config/config";

class AuthService {
  userLogin(user) {
    let formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    return axios
      .post(configs.urlApi + "/auth/login", formData)
      .then((response) => {
        let data = response.data;
        if (data.isSuccess === 1) {
          localStorage.setItem("user", user.username);
        }
        return data;
      });
  }

  userLogout() {
    localStorage.removeItem("user");
  }
  forgetPassword(user) {
    let formData = new FormData();
    formData.append("username", user.username);
    return axios
      .post(configs.urlApi + "/auth/forget", formData)
      .then((response) => {
        let data = response.data;
        return data;
      });
  }
  async getUserInfo(user) {
    return axios
      .get(configs.urlApi + "/auth/user-info", {
        params: {
          user: user,
        },
      })
      .then((response) => {
        let data = response.data;

        return data;
      });
  }
  async getUserMenu(prefix, user) {
    return axios
      .get(configs.urlApi + "/auth/user-menu", {
        params: {
          prefix,
          user: user,
        },
      })
      .then((response) => {
        let data = response.data;

        return data;
      });
  }
}
export default new AuthService();
