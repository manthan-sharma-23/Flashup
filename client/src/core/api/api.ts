import axios from "axios";
import { configurations } from "../lib/config/config";
import { AuthenticateUser, LoggedUser } from "../lib/types/user.types";
import { User } from "../lib/types/global.types";

export default class Server {
  private server_url: string;
  private token: string;

  constructor() {
    this.server_url = configurations.server.http_url;
    this.token = "Bearer " + localStorage.getItem("token");
  }

  private get_user = async (): Promise<User> => {
    const data = (
      await axios.get(this.server_url + "/v1/user/", {
        headers: {
          Authorization: this.token,
        },
      })
    ).data as User;
    return data;
  };

  private login_user = async (
    user: AuthenticateUser
  ): Promise<LoggedUser & { isLoggedIn: boolean }> => {
    const data = (await axios.post(this.server_url + "/v1/user/login", user))
      .data as LoggedUser;

    window.localStorage.setItem("token", data.token);

    if (data.token) {
      this.token = "Bearer " + data.token;
      return { ...data, isLoggedIn: true };
    }
    return { ...data, isLoggedIn: false };
  };

  private register_user = async (
    user: AuthenticateUser
  ): Promise<LoggedUser & { isLoggedIn: boolean }> => {
    const data = (await axios.post(this.server_url + "/v1/user/register", user))
      .data as LoggedUser;

    window.localStorage.setItem("token", data.token);

    if (data.token) {
      this.token = "Bearer " + data.token;
      return { ...data, isLoggedIn: true };
    }
    return { ...data, isLoggedIn: false };
  };

  get user() {
    return {
      get_user: this.get_user,
      login_user: this.login_user,
      register_user: this.register_user,
    };
  }
}
