import { defineNuxtPlugin } from "#app";
import axios from "axios";
import AdminModule from "~/repository/modules/admin";
import AuthModule from "~/repository/modules/auth";
import CompanyModule from "~/repository/modules/company";
import NotificationsModule from "~/repository/modules/notifications";
import OrdersModule from "~/repository/modules/orders";
import ProductModule from "~/repository/modules/product";
import ReportsModules from "~/repository/modules/reports";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: AuthModule;
  product: ProductModule;
  admin: AdminModule;
  company: CompanyModule;
  notifications: NotificationsModule;
  orders: OrdersModule;
  reports: ReportsModules;
}

declare module "#app" {
  interface NuxtApp {
    $api: IApiInstance;
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  /** an object containing all repositories we need to expose */
  const modules: IApiInstance = {
    auth: new AuthModule(axios),
    product: new ProductModule(axios),
    admin: new AdminModule(axios),
    company: new CompanyModule(axios),
    notifications: new NotificationsModule(axios),
    orders: new OrdersModule(axios),
    reports: new ReportsModules(axios),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
