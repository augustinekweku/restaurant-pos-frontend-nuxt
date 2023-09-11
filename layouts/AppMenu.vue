<script setup>
import { ref } from "vue";
import AppMenuItem from "./AppMenuItem.vue";
const model = ref([
  {
    label: "Home",
    items: [
      { label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" },
      {
        label: "Waiter",
        icon: "pi pi-fw pi-user",
        items: [
          //   {
          //     label: "POS",
          //     icon: "pi pi-fw pi-cart-plus",
          //     to: "/pos-page",
          //   },
        ],
      },
      {
        label: "Categories",
        icon: "pi pi-fw pi-table",
        to: "/dashboard/categories",
      },
    ],
  },
]);
</script>

<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in model" :key="item">
      <app-menu-item
        v-if="!item.separator"
        :item="item"
        :index="i"
      ></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<style lang="scss" scoped></style>
