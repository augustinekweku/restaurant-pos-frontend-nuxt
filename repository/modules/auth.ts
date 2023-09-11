import { ApiResponse } from "types";
import { AxiosClient } from "../factory";

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  user: {};
};

class AuthModule extends AxiosClient {
  BASE_URL = "http://127.0.0.1:8000/api";

  async login(payload: LoginPayload) {
    const res = await this.post<ApiResponse<LoginResponse>>(
      `${this.BASE_URL}/login`,
      payload
    );
    return res.data;
  }
}

export default AuthModule;
