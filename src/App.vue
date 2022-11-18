<script setup lang="ts">
import { useQueryClient } from "vue-query";
import { RouterView } from "vue-router";

useQueryClient();
</script>

<template>
  <RouterView />
</template>
