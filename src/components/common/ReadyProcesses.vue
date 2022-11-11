<script setup lang="ts">
import { ProcessApi } from "@/api/Process";
import { Stack, Process } from "@/components/ui";
import { useQuery, useQueryClient } from "vue-query";

useQueryClient();

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
