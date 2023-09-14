<template>
  <div class="field">
    <label class="label">{{ label }}</label>
    <InputText
      v-model="value"
      :type="type || 'text'"
      class="input"
      :class="{
        'is-success': !errorMessage,
        'p-invalid': errorMessage,
      }"
      :placeholder="placeholder"
    />

    <p class="text-sm text-red-600 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { useField } from "vee-validate";

const props = defineProps({
  name: String,
  type: String,
  label: String,
  placeholder: {
    type: String,
    default: "",
  },
});

// The `name` is returned in a function because we want to make sure it stays reactive
// If the name changes you want `useField` to be able to pick it up
const { value, errorMessage } = useField(() => props.name);
</script>
