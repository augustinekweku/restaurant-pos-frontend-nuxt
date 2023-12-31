<script setup lang="ts">
import VImageInput from "@/components/FormInputs/VImageInput.vue";
import VTextInput from "@/components/FormInputs/VTextInput.vue";
import { object, string } from "yup";
import { Category as ICategory } from "~/repository/modules/product";

import { ref } from "vue";
const props = defineProps<{
  showModal: boolean;
  editObj: ICategory | null;
}>();

const emit = defineEmits(["on-dismiss", "fileChnage", "on-success"]);
const visible = ref(props.showModal);
import { useToast } from "primevue/usetoast";
import { useForm } from "vee-validate";

const toast = useToast();

const submitting = ref(false);

interface Category {
  category_name: string;
  desc: string;
  category_image: string;
}

// Create the form
const { setFieldValue, handleSubmit, errors } = useForm({
  validationSchema: object({
    category_name: string().required().label("Category name"),
    desc: string().required().label("Description"),
    category_image: string().required().label("Image "),
  }),
});

function onFileChange(value: string) {
  setFieldValue("category_image", value);
}

async function saveCategory(values: Category) {
  try {
    submitting.value = true;

    const { $api } = useNuxtApp();
    const response = props.editObj
      ? await $api.product.updateCategory({
          id: props.editObj.id,
          category_name: values.category_name,
          desc: values.desc,
          image: values.category_image,
        })
      : await $api.product.saveCategory({
          category_name: values.category_name,
          desc: values.desc,
          image: values.category_image,
        });
    toast.add({
      severity: "success",
      summary: "Success",
      detail: props.editObj
        ? "Category updated successfully"
        : "Category added successfully",
      life: 3000,
    });
    submitting.value = false;
    emit("on-success", () => {});
  } catch (error) {
    console.log("error", error);
    submitting.value = false;

    toast.add({
      severity: "error",
      summary: "Error",
      detail: props.editObj
        ? `Error updating category`
        : `Error adding category`,
      life: 3000,
    });
  }
}

// Submit handler
const onSubmit = handleSubmit((values: Category) => {
  // Submit to API
  saveCategory(values);
});

watch(
  () => props.editObj,
  (newValue, oldValue) => {
    if (newValue !== null) {
      setFieldValue("category_name", newValue.category_name);
      setFieldValue("desc", newValue.desc);
      setFieldValue("category_image", newValue.image);
    } else {
      setFieldValue("category_name", "");
      setFieldValue("desc", "");
      setFieldValue("category_image", "");
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
  setFieldValue("category_name", "");
  setFieldValue("desc", "");
  setFieldValue("category_image", "");
}
</script>
<template>
  <Dialog
    v-model:visible="visible"
    v-on:update:visible="onDismiss"
    modal
    :header="editObj ? 'Edit Category' : 'Add Category'"
    :style="{ width: '50vw' }"
    :breakpoints="{ '960px': '75vw', '641px': '100vw' }"
  >
    <form @submit="onSubmit">
      <div class="mt-3 p-fluid">
        <VTextInput
          name="category_name"
          label="Category name"
          placeholder="Enter category name"
          :errors="errors"
        />
        <VTextInput
          name="desc"
          label="Description"
          placeholder="Enter category description"
          :errors="errors"
        />
      </div>
      <VImageInput
        name="category_image"
        label="Image"
        :errors="errors"
        :uploadMultiple="false"
        @filesChange="onFileChange"
        :existingImage="editObj?.image"
      />

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
