<script setup lang="ts">
const props = defineProps<{ text: string }>();
</script>

<template>
  <span
    class="flex gap-1 text-xs tracking-wide font-medium items-center flex-nowrap whitespace-nowrap"
  >
    <slot></slot>
    {{ props.text }}
  </span>
</template>
