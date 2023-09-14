<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useLayout } from "./composables/layout";
import { useRouter } from "vue-router";
const { layoutConfig, onMenuToggle } = useLayout();
const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();
import { useToast } from "primevue/usetoast";

const getCookie = useCookie("restaurant-pos-user");

const user = ref(getCookie.value.user);
const userCookie = user.value;

onMounted(() => {
  bindOutsideClickListener();
});
onBeforeUnmount(() => {
  unbindOutsideClickListener();
});
const logoUrl = computed(() => {
  return `/layout/images/${
    layoutConfig.darkTheme.value ? "logo-white" : "logo-dark"
  }.svg`;
});

const onTopBarMenuButton = () => {
  topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
  return {
    "layout-topbar-menu-mobile-active": topbarMenuActive.value,
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        topbarMenuActive.value = false;
      }
    };

    document.addEventListener("click", outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener("click", outsideClickListener);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event) => {
  if (!topbarMenuActive.value) return;
  const sidebarEl = document.querySelector(".layout-topbar-menu");
  const topbarEl = document.querySelector(".layout-topbar-menu-button");

  return !(
    sidebarEl.isSameNode(event.target) ||
    sidebarEl.contains(event.target) ||
    topbarEl.isSameNode(event.target) ||
    topbarEl.contains(event.target)
  );
};

const toast = useToast();
const menu = ref();

const toggle = (event) => {
  menu.value.toggle(event);
};

const logout = () => {
  const cookie = useCookie("restaurant-pos-user");
  cookie.value = null;
  router.push("/login");
};
</script>

<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <i class="pi pi-cart-plus pr-3"></i>
      <span>SOMEWHERE</span>
    </router-link>

    <button
      class="p-link layout-menu-button layout-topbar-button"
      @click="onMenuToggle()"
    >
      <i class="pi pi-bars"></i>
    </button>

    <button
      class="p-link layout-topbar-menu-button layout-topbar-button"
      @click="onTopBarMenuButton()"
    >
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" :class="topbarMenuClasses">
      <button
        class="p-link layout-topbar-button"
        label="Toggle"
        @click="toggle"
        aria-haspopup="true"
        aria-controls="overlay_menu"
      >
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
      <Menu ref="menu" id="overlay_menu" :popup="true">
        <template #start>
          <button
            @click="profileClick"
            class="w-full p-link flex align-items-center p-2 pl-3 text-color hover:surface-200 border-noround"
          >
            <Avatar
              image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
              class="mr-2"
              shape="circle"
            />
            <div class="flex flex-column align">
              <span class="font-bold">{{ userCookie.email }}</span>
              <span class="text-sm">Agent</span>
            </div>
          </button>
        </template>
        <template #end>
          <button
            class="w-full p-link flex align-items-center p-2 pl-4 text-color hover:surface-200 border-noround"
            @click="logout"
          >
            <i class="pi pi-sign-out" />
            <span class="ml-2">Log Out</span>
          </button>
        </template>
      </Menu>
      <Toast />
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
