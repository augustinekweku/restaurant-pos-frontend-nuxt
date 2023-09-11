<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useGetCategories } from "@/composables/API/useGetCategories";
import CategoryModal from "@/components/modals/CategoryModal.vue";
import { Category } from "~/repository/modules/product";
const { categories, getCategories, error, loading } = useGetCategories();
const deleteProductDialog = ref(false);
let showAddCategoryModal = ref(false);
const editProductObj = ref<Category | null>(null);
import { useToast } from "primevue/usetoast";
const toast = useToast();

function dismiss() {
  showAddCategoryModal.value = false;
}

function addCategory() {
  showAddCategoryModal.value = true;
}

onMounted(() => {
  getCategories();
});

const confirmDeleteProduct = (editProduct: Category) => {
  editProductObj.value = editProduct;
  deleteProductDialog.value = true;
};

const deleteProduct = async () => {
  try {
    const { $api } = useNuxtApp();
    const response = await $api.product.deleteCategory(
      editProductObj?.value?.id!
    );
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Category deleted successfully",
      life: 3000,
    });
    deleteProductDialog.value = false;
    getCategories();
  } catch (error) {
    console.log("error", error);
  }
};

const formatCurrency = (value: {
  toLocaleString: (
    arg0: string,
    arg1: { style: string; currency: string }
  ) => any;
}) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="categories animate__animated animate__fadeIn">
          <Dialog
            v-model:visible="deleteProductDialog"
            :style="{ width: '450px' }"
            header="Confirm"
            :modal="true"
          >
            <div class="flex align-items-center justify-content-center">
              <i
                class="pi pi-exclamation-triangle mr-3"
                style="font-size: 2rem"
              />
              <span v-if="editProductObj?.id"
                >Are you sure you want to delete
                <b>{{ editProductObj?.category_name }}</b
                >?</span
              >
            </div>
            <template #footer>
              <Button
                label="No"
                icon="pi pi-times"
                class="p-button-text"
                @click="deleteProductDialog = false"
              />
              <Button
                label="Yes"
                icon="pi pi-check"
                class="p-button-text"
                @click="deleteProduct"
              />
            </template>
          </Dialog>
          <CategoryModal
            :showModal="showAddCategoryModal"
            v-on:on-dismiss="dismiss"
            v-on:on-success="
              () => {
                getCategories();
                dismiss();
              }
            "
          />
          <div class="flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0">Categories</h5>
            <Button @click="addCategory">Add</Button>
          </div>
          <div class="grid">
            <div class="col-12">
              <div class="">
                <div
                  v-if="loading"
                  class="flex justify-content-center align-items-center"
                >
                  <ProgressSpinner />
                </div>
                <div v-else>
                  <DataTable
                    :value="categories"
                    :rows="5"
                    :paginator="true"
                    responsiveLayout="scroll"
                    :loading="loading"
                  >
                    <Column style="width: 15%">
                      <template #header> Image </template>
                      <template #body="slotProps">
                        <img
                          :src="slotProps.data.image"
                          :alt="slotProps.data.image"
                          width="50"
                          class="shadow-2"
                        />
                      </template>
                    </Column>
                    <Column
                      field="category_name"
                      header="Category Name"
                      :sortable="true"
                      style="width: 35%"
                    ></Column>

                    <Column style="width: 15%">
                      <template #header> View </template>
                      <template #body>
                        <Button
                          icon="pi pi-search"
                          type="button"
                          class="p-button-text"
                        ></Button>
                      </template>
                    </Column>
                    <Column headerStyle="min-width:10rem;">
                      <template #body="slotProps">
                        <Button
                          icon="pi pi-pencil"
                          class="p-button-rounded p-button-success mr-2"
                        />
                        <Button
                          icon="pi pi-trash"
                          class="p-button-rounded p-button-warning mt-2"
                          @click="confirmDeleteProduct(slotProps.data)"
                        />
                      </template>
                    </Column>
                  </DataTable>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category_image {
  width: 50px;
}
</style>
