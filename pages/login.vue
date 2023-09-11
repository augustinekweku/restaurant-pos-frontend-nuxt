<template>
  <Toast />

  <div
    class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden"
  >
    <div class="flex flex-column align-items-center justify-content-center">
      <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
      <div
        style="
          border-radius: 56px;
          padding: 0.3rem;
          background: linear-gradient(
            180deg,
            var(--primary-color) 10%,
            rgba(33, 150, 243, 0) 30%
          );
        "
      >
        <div
          class="w-full surface-card py-8 px-5 sm:px-8"
          style="border-radius: 53px"
        >
          <div class="text-center mb-5">
            <img
              src="/demo/images/login/avatar.png"
              alt="Image"
              height="50"
              class="mb-3"
            />
            <div class="text-900 text-3xl font-medium mb-3">
              Welcome, Isabel!
            </div>
            <span class="text-600 font-medium">Sign in to continue</span>
          </div>
          <form action="">
            <div>
              <label
                for="email1"
                class="block text-900 text-xl font-medium mb-2"
                >Email</label
              >
              <InputText
                id="email1"
                v-model="email"
                type="text"
                placeholder="Email address"
                class="w-full md:w-30rem mb-5"
                style="padding: 1rem"
              />

              <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Password</label
              >
              <Password
                id="password1"
                v-model="password"
                placeholder="Password"
                :toggleMask="true"
                class="w-full mb-3"
                inputClass="w-full"
                :inputStyle="{ padding: '1rem' }"
              ></Password>

              <div
                class="flex align-items-center justify-content-between mb-5 gap-5"
              >
                <div class="flex align-items-center">
                  <Checkbox
                    id="rememberme1"
                    v-model="checked"
                    binary
                    class="mr-2"
                  ></Checkbox>
                  <label for="rememberme1">Remember me</label>
                </div>
                <a
                  class="font-medium no-underline ml-2 text-right cursor-pointer"
                  style="color: var(--primary-color)"
                  >Forgot password?</a
                >
              </div>
              <Button
                @click="login"
                label="Sign In"
                type="submit"
                class="w-full p-3 text-xl"
                :loading="loading"
              ></Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <AppConfig simple />
</template>

<script setup lang="ts">
import { useToast } from "primevue/usetoast";
const toast = useToast();

import { useLayout } from "@/layouts/composables/layout";
import { ref, computed } from "vue";
import AppConfig from "@/layouts/AppConfig.vue";
import { useRouter } from "vue-router";
const { layoutConfig } = useLayout();
const email = ref("");
const password = ref("");
const checked = ref(false);
const loading = ref(false);

const router = useRouter();

const login = async () => {
  const { $api } = useNuxtApp();

  if (email.value.trim() == "") {
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Email is required",
      life: 3000,
    });
    return;
  }
  if (password.value.trim() == "")
    return toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Password is required",
      life: 3000,
    });
  if (password.value.length < 6)
    return toast.add({
      severity: "error",
      summary: "Error Message",
      detail: "Password must be at least 6 characters",
      life: 3000,
    });
  try {
    loading.value = true;
    const res = await $api.auth.login({
      email: email.value,
      password: password.value,
    });
    console.log(res);
    const cookie = useCookie("restaurant-pos-user");
    cookie.value = JSON.stringify(res.data);

    toast.add({
      severity: "success",
      summary: "Success Message",
      detail: "Login successful",
      life: 3000,
    });
    router.push("/");
  } catch (error: any) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: `${error.response.data.message || "Something went wrong"} `,
      life: 3000,
    });

    console.log(error.response.data.message);
  } finally {
    loading.value = false;
  }
};
const logoUrl = computed(() => {
  return `/layout/images/${
    layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
  }.svg`;
});

definePageMeta({
  layout: false,
});
</script>

<style scoped>
.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}
.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}
</style>
