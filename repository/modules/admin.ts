import { ApiResponse } from "types";
import { AxiosClient } from "../factory";

// Generated by https://quicktype.io

export interface GetRolesResponse {
  id: number;
  role_name: string;
  permission: null;
  isAdmin: number;
  created_at: string;
  updated_at: string;
}

// Generated by https://quicktype.io

export interface CreateRoleResponse {
  role_name: string;
  updated_at: string;
  created_at: string;
  id: number;
}

// Generated by https://quicktype.io

export interface GetUsersResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  role_id: number;
  email_verified_at: null;
  created_at: null | string;
  updated_at: null | string;
}

// Generated by https://quicktype.io

export interface CreateUserResponse {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  userType: string;
  updated_at: string;
  created_at: string;
  id: number;
}

class AdminModule extends AxiosClient {
  BASE_URL = "http://127.0.0.1:8000/api";

  async getRoles() {
    const res = await this.get<ApiResponse<GetRolesResponse[]>>(
      `${this.BASE_URL}/roles`
    );
    return res.data;
  }

  async createRole(payload: { role_name: string }) {
    const res = await this.post<ApiResponse<CreateRoleResponse>>(
      `${this.BASE_URL}/roles`,
      payload
    );
    return res.data;
  }

  async getUsers() {
    const res = await this.get<ApiResponse<GetUsersResponse[]>>(
      `${this.BASE_URL}/users`
    );
    return res.data;
  }

  async createUser(payload: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userType: string;
    role_id: number;
  }) {
    const res = await this.post<ApiResponse<CreateUserResponse>>(
      `${this.BASE_URL}/create-user`,
      payload
    );
    return res.data;
  }

  async updateUser(payload: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    userType: string;
    role_id: number;
  }) {
    const res = await this.post<ApiResponse<CreateUserResponse>>(
      `${this.BASE_URL}/edit-user`,
      payload
    );
    return res.data;
  }
}

export default AdminModule;
