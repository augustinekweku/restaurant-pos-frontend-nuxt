import { ApiResponse } from "types";
import { AxiosClient } from "../factory";

class NotificationsModule extends AxiosClient {
  BASE_URL = "http://127.0.0.1:8000/api";

  async getReadyOrdersCount() {
    const res = await this.get<ApiResponse<{}>>(
      `${this.BASE_URL}/get-ready-orders-count`
    );
    return res.data;
  }

  async getRequestedOrdersCount(old_count: number) {
    const res = await this.get<ApiResponse<{}>>(
      `${this.BASE_URL}/get-requested-orders-count/${old_count}`
    );
    return res.data;
  }

  async getReadyCreditorOrdersCount() {
    const res = await this.get<ApiResponse<{}>>(
      `${this.BASE_URL}/get-ready-creditor-orders-count`
    );
    return res.data;
  }

  async getRequestedCreditorOrdersCount(old_count: number) {
    const res = await this.get<ApiResponse<{}>>(
      `${this.BASE_URL}/get-requested-creditor-orders-count/${old_count}`
    );
    return res.data;
  }
}

export default NotificationsModule;
