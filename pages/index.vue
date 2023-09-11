<template>
  <div class="container">
    <div>
      <h1>{ ip }</h1>
      <Button>Hello</Button>
      <Knob v-model="value" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Knob from "primevue/knob";

export default defineComponent({
  setup() {
    const value = ref(0);
    const { $DI } = useNuxtApp();
    async function fetchSomething() {
      // const ip = await $DI.authService.getTodo();
      console.log("ip.data");
    }

    const getCategories = async () => {
      const { $api, $DI } = useNuxtApp();
      const response = await $api.product.getCategories();
      console.log(response);
      return response;
    };

    getCategories();

    fetchSomething();
    return {
      ip: "ip",
      value,
    };
  },
});
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
