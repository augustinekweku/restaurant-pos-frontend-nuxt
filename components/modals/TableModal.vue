<script setup lang="ts">
import VImageInput from "@/components/FormInputs/VImageInput.vue";
import VTextInput from "@/components/FormInputs/VTextInput.vue";
import { object, string } from "yup";

import { ref } from "vue";
const props = defineProps<{
  showModal: boolean;
  editObj: any | null;
}>();

const emit = defineEmits(["on-dismiss", "fileChnage", "on-success"]);
const visible = ref(props.showModal);
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";

const toast = useToast();

const submitting = ref(false);

interface ITable {
  table_name: string;
}

// Create the form
const { setFieldValue, handleSubmit, errors } = useForm({
  validationSchema: object({
    table_name: string().required().label("Table name"),
  }),
});

async function saveTable(values: ITable) {
  try {
    submitting.value = true;

    const { $api } = useNuxtApp();
    const response = await $api.product.saveTable({
      table_name: values.table_name,
    });
    toast.add({
      severity: "success",
      summary: "Success",
      detail: props.editObj
        ? "Table updated successfully"
        : "Table added successfully",
      life: 3000,
    });
    submitting.value = false;
    emit("on-success", () => {});
  } catch (error: any) {
    console.log("error", error);
    submitting.value = false;
    toast.add({
      severity: "error",
      summary: "Error adding Table",
      detail:
        error.response.data.message || error.message || "Something went wrong",
      life: 3000,
    });
  }
}

// Submit handler
const onSubmit = handleSubmit((values: { table_name: string }) => {
  // Submit to API
  saveTable(values);
});

watch(
  () => props.editObj,
  (newValue, oldValue) => {
    if (newValue !== null) {
      setFieldValue("table_name", newValue.table_name);
    } else {
      setFieldValue("table_name", "");
    }
  }
);
watch(
  () => props.showModal,
  (newValue, oldValue) => {
    visible.value = newValue;
  }
);
function onDismiss() {
  emit("on-dismiss", () => {});
  resetForm();
}

function resetForm() {
  setFieldValue("table_name", "");
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    v-on:update:visible="onDismiss"
    modal
    :header="editObj ? 'Edit Table' : 'Add Table'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <form @submit="onSubmit">
      <div class="mt-3 p-fluid">
        <VTextInput
          name="table_name"
          label="Table name"
          placeholder="Enter Table name"
          :errors="errors"
        />
      </div>

      <div class="flex align-items-center gap-3 justify-content-end">
        <Button severity="danger" @click="onDismiss"> Cancel </Button>
        <Button type="submit" :loading="submitting">
          {{ editObj ? "Update" : "Save" }}
        </Button>
      </div>
    </form>
  </Dialog>
</template>

<style scoped>
.loader-container {
  position: relative;
}

.overlay {
  background-color: black !important;
  width: 100%;
  height: 100%;
  position: absolute;
}

.loader {
  width: 50px;
  height: 50px;
  border: 4px solid #3498db;
  border-top: 4px solid transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
</style>
