<script setup lang="ts">
import { ProcessApi } from "@/api/Process";
import { Stack, Process } from "@/components/ui";
import { useQuery } from "vue-query";

const { data } = useQuery({
  queryKey: ["processes"],
  queryFn: () => {
    return ProcessApi.all({ limit: 10 });
  },
});
</script>

<template>
  <Stack title="Listos">
    <Process v-for="p in data?.data" :process="p"></Process>
  </Stack>
</template>
