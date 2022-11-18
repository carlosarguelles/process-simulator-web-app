<script setup lang="ts">
import type { Process } from "@/types";
import { Item } from "@/components/ui";
import { UserIcon } from "@/icons";

let props = defineProps<{ process: Process }>();
</script>

<template>
  <article
    class="w-40 flex-none p-2 rounded-lg border border-slate-600 bg-gray-800 divide-y divide-slate-600"
  >
    <h2 class="font-medium mb-2 truncate">{{ props.process.name }}</h2>
    <ul class="text-xs font-medium pt-3 space-y-1.5">
      <li>
        <Item :text="'Created by ' + props.process.user">
          <UserIcon class="h-5 w-5" />
        </Item>
      </li>
      <li>pid: {{ props.process.pid }}</li>
      <li>ejecuciones: {{ props.process.executions }}</li>
      <li>rafaga: {{ props.process.burstTime }}</li>
      <li>quantum: {{ props.process.quantum }}</li>
      <li>tiempo final: {{ props.process.finalTime }}</li>
    </ul>
  </article>
</template>
