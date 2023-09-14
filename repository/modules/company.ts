import { ApiResponse } from "types";
import { AxiosClient } from "../factory";

// Generated by https://quicktype.io

export interface GetCompaniesResponse {
  id: number;
  company_name: string;
  about: string;
  created_at: string;
  updated_at: string;
}

// Generated by https://quicktype.io

export interface CreateCompanyPayload {
  id?: number;
  company_name: string;
  about: string;
}

class CompanyModule extends AxiosClient {
  BASE_URL = "http://127.0.0.1:8000/api";

  async getCompanies() {
    const res = await this.get<ApiResponse<GetCompaniesResponse[]>>(
      `${this.BASE_URL}/companies`
    );
    return res.data;
  }

  async createCompany(payload: CreateCompanyPayload) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/create-company`,
      payload
    );
    return res.data;
  }

  async updateCompany(payload: CreateCompanyPayload) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/edit-company`,
      payload
    );
    return res.data;
  }

  async deleteCompany(id: string | number) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/delete-company/${id}`
    );
    return res.data;
  }
}

export default CompanyModule;
