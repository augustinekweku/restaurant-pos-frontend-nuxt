import { ApiResponse } from "types";
import { AxiosClient } from "../factory";

// Generated by https://quicktype.io

export interface CreateOrderPayload {
  table_id: number;
  table_name: string;
  order_total: number;
  order_number: number;
  invoice_number: number;
  order_type: string;
  user_id: number;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  item_id: number;
  item_name: string;
  order_id: number;
  price: string;
  quantity: number;
  amount: number;
}

// Generated by https://quicktype.io

export interface CreateOrderResponse {
  table_id: number;
  table_name: string;
  order_total: number;
  order_number: number;
  invoice_number: number;
  order_type: string;
  status: number;
  user_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}

// Generated by https://quicktype.io

export interface CreateCreditorOrderPayload {
  company_id: number;
  order_total: number;
  order_number: number;
  invoice_number: number;
  user_id: number;
  status: number;
  due_date: string;
  notes: string;
  order_details: CreditorOrderDetail[];
}

export interface CreditorOrderDetail {
  item_id: number;
  item_name: string;
  creditor_order_id: number;
  price: string;
  quantity: number;
  amount: number;
}

// Generated by https://quicktype.io

export interface CreateCreditorOrderResponse {
  company_id: number;
  order_total: number;
  order_number: number;
  invoice_number: number;
  status: number;
  user_id: number;
  notes: string;
  due_date: string;
  updated_at: string;
  created_at: string;
  id: number;
}

// Generated by https://quicktype.io

export interface GetRequestedOrdersReponse {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  table_id: number;
  order_total: string;
  paid: null;
  balance: null;
  created_at: string;
  updated_at: string;
  invoice_number: string;
  order_number: number;
  status: string;
  table_name: string;
  ready: number;
  order_type: string;
  user_id: number;
  take_away_cleared: number;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  item_id: number;
  order_id: number;
  price: string;
  created_at: null;
  updated_at: null;
  item_name: string;
  quantity: number;
  amount: number;
}

export interface Link {
  url: null | string;
  label: string;
  active: boolean;
}

// Generated by https://quicktype.io

export interface GetReadyOrdersResponse {
  current_page: number;
  data: Datum[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface Datum {
  id: number;
  table_id: number;
  order_total: string;
  paid: null;
  balance: null;
  created_at: string;
  updated_at: string;
  invoice_number: string;
  order_number: number;
  status: string;
  table_name: string;
  ready: number;
  order_type: string;
  user_id: number;
  take_away_cleared: number;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  id: number;
  item_id: number;
  order_id: number;
  price: string;
  created_at: null;
  updated_at: null;
  item_name: string;
  quantity: number;
  amount: number;
}

// Generated by https://quicktype.io

export interface GetLatestOrderResponse {
  id: number;
  table_id: number;
  order_total: string;
  paid: null;
  balance: null;
  created_at: string;
  updated_at: string;
  invoice_number: string;
  order_number: number;
  status: string;
  table_name: string;
  ready: number;
  order_type: string;
  user_id: number;
  take_away_cleared: number;
  order_details: OrderDetail[];
}

// Generated by https://quicktype.io

export interface GetCreditorOrdersResponse {
  current_page: number;
  data: GetCreditorOrdersResponseData[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Link[];
  next_page_url: null;
  path: string;
  per_page: number;
  prev_page_url: null;
  to: number;
  total: number;
}

export interface GetCreditorOrdersResponseData {
  id: number;
  discount: null;
  payment_type: null;
  invoice_number: string;
  date_scheduled: null;
  paid: null;
  balance: null;
  created_at: string;
  updated_at: string;
  company_id: number;
  notes: string;
  order_total: string;
  order_number: number;
  ready: null;
  status: string;
  user_id: number;
  due_date: string;
  creditor_order_details: CreditorOrderDetail[];
  company: Company;
}

export interface Company {
  id: number;
  company_name: string;
  about: string;
  created_at: string;
  updated_at: string;
}

// Generated by https://quicktype.io

export interface CheckoutTakeAwayOrderPayload {
  total: number;
  order_number: number;
  invoice_number: number;
  paid: number;
  balance: number;
  order_type: string;
  user_id: number;
  order_details: OrderDetail[];
}

export interface OrderDetail {
  item_id: number;
  item_name: string;
  order_id: number;
  price: string;
  quantity: number;
  amount: number;
}

// Generated by https://quicktype.io

export interface CheckoutTakeAwayOrderResponse {
  message: string;
  code: number;
  data: Data;
}

export interface Data {
  order_total: number;
  paid: number;
  balance: number;
  order_number: number;
  invoice_number: number;
  order_type: string;
  status: number;
  user_id: number;
  updated_at: string;
  created_at: string;
  id: number;
}

class OrdersModule extends AxiosClient {
  BASE_URL = "http://127.0.0.1:8000/api";

  async createOrder(payload: CreateOrderPayload) {
    const res = await this.post<ApiResponse<CreateOrderResponse>>(
      `${this.BASE_URL}/create-order`,
      payload
    );
    return res.data;
  }

  async createCreditorOrder(payload: CreateCreditorOrderPayload) {
    const res = await this.post<ApiResponse<CreateCreditorOrderResponse>>(
      `${this.BASE_URL}/create-creditor-order`,
      payload
    );
    return res.data;
  }

  async getRequestedOrders() {
    const res = await this.get<ApiResponse<GetRequestedOrdersReponse>>(
      `${this.BASE_URL}/get-requested-orders`
    );
    return res.data;
  }

  async confirmOrder(order_id: string | number) {
    const res = await this.get<ApiResponse<{}>>(
      `${this.BASE_URL}/confirm-order/${order_id}/table`
    );
    return res.data;
  }

  async getReadyOrders() {
    const res = await this.get<ApiResponse<GetReadyOrdersResponse>>(
      `${this.BASE_URL}/get-ready-orders`
    );
    return res.data;
  }

  async getLatestOrder() {
    const res = await this.get<ApiResponse<GetLatestOrderResponse>>(
      `${this.BASE_URL}/latest-order`
    );
    return res.data;
  }

  async getRequestedCreditorOrders() {
    const res = await this.get<ApiResponse<GetCreditorOrdersResponse>>(
      `${this.BASE_URL}/creditor-orders`
    );
    return res.data;
  }

  async getReadyCreditorOrders() {
    const res = await this.get<ApiResponse<GetCreditorOrdersResponse>>(
      `${this.BASE_URL}/get-ready-creditor-orders`
    );
    return res.data;
  }

  async confirmCreditorOrder(order_id: string | number) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/confirm-creditor-order/${order_id}`
    );
    return res.data;
  }

  async abortOrder(order_id: string | number) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/abort-order/${order_id}/table`
    );
    return res.data;
  }

  async clearTakeAwayOrder(order_id: string | number) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/clear-takeaway-order/${order_id}/table`
    );
    return res.data;
  }

  async checkoutOrder(payload: {
    id: number;
    balance: number;
    paid: number;
    table_id: string | number;
  }) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/checkout-order`,
      payload
    );
    return res.data;
  }

  async checkoutTakeAwayOrder(payload: CheckoutTakeAwayOrderPayload) {
    const res = await this.post<ApiResponse<CheckoutTakeAwayOrderResponse>>(
      `${this.BASE_URL}/checkout-takeaway-order`,
      payload
    );
    return res.data;
  }

  async checkoutCreditorOrder(payload: {
    id: number;
    balance: number;
    paid: number;
    payment_type: string;
  }) {
    const res = await this.post<ApiResponse<{}>>(
      `${this.BASE_URL}/checkout-creditor-order`,
      payload
    );
    return res.data;
  }
}

export default OrdersModule;