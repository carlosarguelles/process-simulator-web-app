<script setup lang="ts">
import type { Process } from "@/types";
import { Item } from "@/components/ui";
import { UserIcon } from "@/icons";

let props = defineProps<{ process: Process }>();
</script>

<template>
  <article
    class="w-40 flex-none divide-y divide-slate-600 rounded-lg border border-slate-600 bg-gray-800 p-2"
  >
    <h2 class="mb-2 truncate font-medium">{{ props.process.name }}</h2>
    <ul class="space-y-1.5 pt-3 text-xs font-medium">
      <li>
        <Item :text="'Created by ' + props.process.user">
          <UserIcon class="h-5 w-5" />
        </Item>
      </li>
      <li>pid: {{ props.process.pid }}</li>
      <li>ejecuciones: {{ props.process.executions }}</li>
      <li>rafaga inicial: {{ props.process.initialBurstTime }}</li>
      <li>rafaga: {{ props.process.burstTime }}</li>
      <li>tiempo final: {{ props.process.finalTime }}</li>
    </ul>
  </article>
</template>
