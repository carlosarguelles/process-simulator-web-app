<script setup lang="ts">
import { defineProps, ref } from "vue";
import type { Catalog } from "@/types";
import { ProcessBanner } from "@/components/ui";

const props = defineProps<{ catalog: Catalog }>();
const showProcesses = ref(false);
</script>

<template>
  <section
    class="flex flex-col gap-2 p-2 bg-gray-700 rounded-md border-gray-600 border"
  >
    <h2 class="font-medium text-lg" @click="showProcesses = !showProcesses">
      {{ props.catalog.name }}
    </h2>
    <div
      class="flex flex-col gap-1 max-h-96 overflow-y-auto"
      v-show="showProcesses"
    >
      <ProcessBanner
        v-for="p in props.catalog.processes"
        :key="p.pid"
        :process="p"
      ></ProcessBanner>
    </div>
  </section>
</template>
