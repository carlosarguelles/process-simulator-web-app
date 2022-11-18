<script setup lang="ts">
import { CatalogCreator, Catalogs } from "@/components/common";
import { Layout } from "@/components/ui";
import { ref } from "vue";

const showCatalogCreator = ref(false);
</script>

<template>
  <Layout>
    <template #title>Catalogos</template>
    <section>
      <h2
        class="font-medium text-xl"
        @click="showCatalogCreator = !showCatalogCreator"
      >
        Crear
      </h2>
      <CatalogCreator v-show="showCatalogCreator" />
    </section>
    <section>
      <h2 class="font-medium text-xl">Creados</h2>
      <Catalogs />
    </section>
  </Layout>
</template>
