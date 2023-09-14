<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import { useGetTables } from "@/composables/API/useGetTables";

const { tables, getTables, error, loading } = useGetTables();

import { useToast } from "primevue/usetoast";
import TableModal from "~/components/modals/TableModal.vue";
const dayjs = useDayjs();
const toast = useToast();

const showAddTableModal = ref(false);
const editProductObj = ref<any | null>(null);

function dismiss() {
  showAddTableModal.value = false;
  editProductObj.value = null;
}

onMounted(() => {
  getTables();
});
</script>

<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <div class="categories animate__animated animate__fadeIn">
          <TableModal
            :showModal="showAddTableModal"
            :editObj="editProductObj"
            v-on:on-dismiss="dismiss"
            v-on:on-success="
              () => {
                getTables();
                dismiss();
              }
            "
          />
          <!-- <Dialog
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
            :showModal="showAddTableModal"
            :editObj="editProductObj"
            v-on:on-dismiss="dismiss"
            v-on:on-success="
              () => {
                getCategories();
                dismiss();
              }
            "
          /> -->
          <div class="flex justify-content-between align-items-center mb-3">
            <h5 class="mb-0 font-bold">Tables</h5>
            <Button @click="showAddTableModal = true">Add</Button>
          </div>
          <div class="grid mt-3">
            <div class="col-12">
              <div class="">
                <div
                  v-if="loading"
                  class="flex justify-content-center align-items-center"
                >
                  <ProgressSpinner />
                </div>
                <div v-else>
                  <div class="grid">
                    <div
                      v-for="(item, index) in tables"
                      :key="index"
                      class="col-12 md:col-6 lg:col-3"
                    >
                      <Card class="animate__animated animate__bounceIn">
                        <template #title>
                          <div class="flex justify-content-end">
                            <Tag
                              :severity="
                                item.status === tableStatuses.empty.name
                                  ? 'success'
                                  : 'warning'
                              "
                              :value="item.status"
                            ></Tag>
                          </div>
                        </template>
                        <template #content>
                          <div
                            class="flex justify-content-center align-items-center flex-column"
                          >
                            <img
                              src="~assets/images/svg/restaurant.svg"
                              alt=""
                              srcset=""
                              width="70"
                            />
                            <h5 class="mt-3">{{ item.table_name }}</h5>
                          </div>
                        </template>
                      </Card>
                    </div>
                  </div>
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
