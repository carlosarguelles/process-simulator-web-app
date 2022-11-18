<script setup lang="ts">
import type { Process } from "@/types";
import { Item } from "@/components/ui";
import { UserIcon } from "@/icons";

let props = defineProps<{ process: Process; isSelected?: boolean }>();
</script>

<template>
  <div
    class="p-2 rounded-lg border border-slate-600 bg-gray-800"
    :class="{
      'border-teal-400 bg-teal-500 bg-transparent/10': props.isSelected,
    }"
  >
    <div class="flex gap-2 items-center flex-nowrap">
      <span class="font-bold">{{ props.process.pid }}</span>
      <span class="font-medium truncate">{{ props.process.name }}</span>
      <Item :text="'Created by ' + props.process.user">
        <UserIcon class="h-5 w-5" />
      </Item>
    </div>
  </div>
</template>
