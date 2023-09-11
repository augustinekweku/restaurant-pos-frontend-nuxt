import { defineNuxtPlugin } from "#app";
import axios from "axios";
import AuthModule from "~/repository/modules/auth";
import ProductModule from "~/repository/modules/product";

/** ApiInstance interface provides us with good typing */
interface IApiInstance {
  auth: AuthModule;
  product: ProductModule;
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
  };

  return {
    provide: {
      api: modules,
    },
  };
});
