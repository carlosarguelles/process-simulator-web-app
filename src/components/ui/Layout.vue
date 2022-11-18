<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="h-screen w-full container mx-auto space-y-4 my-10 max-w-4xl">
    <div class="flex justify-center items-center gap-3">
      <RouterLink class="hover:font-medium" to="/">Inicio</RouterLink>
      <RouterLink class="hover:font-medium" to="/catalogos"
        >Catalogos</RouterLink
      >
    </div>
    <h1 class="font-bold text-4xl">
      <slot name="title"></slot>
    </h1>
    <slot></slot>
  </div>
</template>
