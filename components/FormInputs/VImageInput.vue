<template>
  <div class="field">
    <div class="field">
      <label class="label">{{ label }}</label>
      <div>
        <input
          id="file-upload"
          :class="{
            'is-success': !errorMessage,
            'p-invalid': errorMessage,
          }"
          class="input"
          type="file"
          @change="handleFileChange"
          accept="image/*"
          style="display: none"
        />

        <div
          class="flex gap-3 overflow-x-scroll overflow-y-hidden hide-scroll w-100"
        >
          <label
            v-if="!uploadMultiple && !files.length"
            :for="loading ? '' : 'file-upload'"
          >
            <div
              class="image-placeholder flex align-items-center justify-content-center"
            >
              <i class="pi pi-image"></i>
            </div>
          </label>
          <div v-for="(file, index) in files" :key="index">
            <div class="image-preview-container">
              <div
                v-if="loading"
                class="image-upload-overlay flex justify-content-center align-items-center"
              >
                <ProgressSpinner
                  style="width: 50px; height: 50px"
                  strokeWidth="8"
                  fill="var(--surface-ground)"
                  animationDuration=".5s"
                  aria-label="Custom ProgressSpinner"
                />
              </div>
              <div
                class="delete-overlay flex justify-content-center align-items-center"
              >
                <div v-if="!loading" class="delete-icon">
                  <i
                    class="pi pi-trash text-red-500"
                    @click="deleteImage(index)"
                    style="font-size: 1.5rem"
                  ></i>
                </div>
              </div>

              <img
                :src="getPreviewImage(file)"
                alt="Preview"
                class="image-preview"
              />
            </div>
          </div>
        </div>
        <div class="mt-2">
          <InputText hidden size="small" type="text" v-model="value" />
          <InputText
            v-if="value"
            size="small"
            type="text"
            v-model="file_label"
          />
        </div>
        <Button
          icon="pi pi-upload"
          size="small"
          v-if="files.length && uploadingProgress !== 100"
          :loading="loading"
          :disabled="loading"
          @click="uploadImage"
          class="mt-2"
          :label="
            loading
              ? 'Uploading ' + uploadingProgress.toFixed() + '%'
              : 'Save Image'
          "
        >
        </Button>
      </div>
      <p class="text-sm text-red-600">
        {{ errorMessage ? errorMessage + ", Image not saved or uploaded" : "" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  leftIcon: {
    type: String,
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
  uploadMultiple: {
    type: Boolean,
    default: false,
  },
});

const { value, errorMessage } = useField(() => props.name);
const emit = defineEmits(["filesChange"]);
const file_label = ref("");
const files = ref([] as File[]);

const uploadingProgress = ref(0);
const loading = ref(false);
import { useToast } from "primevue/usetoast";
const toast = useToast();

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const filesFromInput = target.files;
  if (!filesFromInput) return;

  for (let index = 0; index < filesFromInput.length; index++) {
    const file = filesFromInput[index];
    files.value.push(file);
  }
  if (files.value.length > 0) {
    uploadingProgress.value = 0;
  }
  //   emit("filesChange", files);
};
function deleteImage(index: number) {
  files.value.splice(index, 1);
  //we are not uploading multiple files
  //so we can emit the first file which is just a string
  emit("filesChange", "");
}

function getPreviewImage(file: File) {
  return URL.createObjectURL(file);
}

function onImageUploadSuccess(downloadUrl: string) {
  value.value = downloadUrl;
  file_label.value = files.value[0].name;
}

async function uploadImage() {
  try {
    console.log("uploading image", files.value[0]);
    loading.value = true;
    const { downloadUrl, uploadProgress, uploadError } = await saveFile(
      "images/product-categories/" + files.value[0].name,
      files.value[0] as File
    );

    //watch the progress and update the state
    watch(uploadProgress, (newValue, oldValue) => {
      uploadingProgress.value = newValue;
      if (newValue === 100) {
        loading.value = false;
        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Image Uploaded Successfully",
          life: 3000,
        });
      }
    });
    watch(downloadUrl, (newValue, oldValue) => {
      if (newValue.length > 0) {
        emit("filesChange", newValue);
        onImageUploadSuccess(newValue);
      }
    });
  } catch (error) {
  } finally {
  }
}
// emit("fileChnage", snapshot, downloadUrl, metadata);
</script>

<style lang="scss">
#file-upload {
  display: none;
}

.image-preview-container {
  width: 120px;
  height: 120px;
  position: relative;
}
.image-placeholder {
  width: 120px;
  height: 120px;
  position: relative;
  border: dashed 1px #828486;
  border-radius: 8px;
}

.image-upload-overlay {
  background-color: rgba(162, 162, 162, 0.66);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
}
.delete-overlay {
  display: none !important;
  background-color: rgba(162, 162, 162, 0.66);
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 5px;
}
.delete-icon {
  display: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}
.image-preview-container:hover {
  .delete-overlay {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .delete-icon {
    display: block;
  }
}

.image-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
}
.custom-upload-button {
  width: fit-content;
  padding: 10px 20px;
  background-color: transparent;
  border: solid 1px #007bff;
  color: #007bff;
  cursor: pointer;
  border-radius: 5px;
  text-align: center;
  transition: background-color 0.3s ease;
}
</style>
