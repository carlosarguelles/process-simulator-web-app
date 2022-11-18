<script setup lang="ts">
import { useCatalogsStore } from "@/store/CatalogsStore";
import { Catalog } from "@/components/common";

const catalogsStore = useCatalogsStore();
</script>

<template>
  <div class="flex flex-col gap-2">
    <Catalog
      v-for="c in catalogsStore.catalogs"
      :catalog="c"
      :key="c.name"
    ></Catalog>
  </div>
</template>
