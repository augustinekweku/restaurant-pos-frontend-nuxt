import { GetCategoriesResponse } from "~/repository/modules/product";

export const useGetCategories = () => {
  const nuxtApp = useNuxtApp();
  let categories = shallowRef<GetCategoriesResponse[]>([]);
  let loading = ref(false);
  let error = ref(null);
  const getCategories = async () => {
    loading.value = true;
    try {
      const res = await nuxtApp.$api.product.getCategories();
      categories.value = res.data;
      error.value = null;
    } catch (error: any) {
      error.value = error;
    } finally {
      loading.value = false;
    }
  };

  return {
    categories,
    getCategories,
    loading,
    error,
  };
};
