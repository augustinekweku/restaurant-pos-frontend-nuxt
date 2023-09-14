import { GetTablesResponse } from "~/repository/modules/product";

export const useGetTables = () => {
  const nuxtApp = useNuxtApp();
  let tables = shallowRef<GetTablesResponse[]>([]);
  let loading = ref(false);
  let error = ref(null);
  const getTables = async () => {
    loading.value = true;
    try {
      const res = await nuxtApp.$api.product.getTables();
      tables.value = res.data;
      error.value = null;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  return {
    tables,
    getTables,
    loading,
    error,
  };
};
