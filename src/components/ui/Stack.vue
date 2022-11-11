<script setup lang="ts">
const props = defineProps<{
  title: string;
}>();
</script>

<template>
  <section>
    <h1 class="font-bold text-xl">{{ props.title }}</h1>
    <div class="flex gap-4 py-4 overflow-x-scroll">
      <slot></slot>
    </div>
  </section>
</template>
