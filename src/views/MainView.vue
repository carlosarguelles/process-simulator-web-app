<script setup lang="ts">
import { Layout } from "@/components/ui";
import { Simulator } from "@/components/common";
</script>

<template>
  <KeepAlive>
    <Layout>
      <template #title>Procesos</template>
      <Simulator />
    </Layout>
  </KeepAlive>
</template>
