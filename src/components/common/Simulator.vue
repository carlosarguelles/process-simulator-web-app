<script setup lang="ts">
import type { Catalog, Process as TProcess } from "@/types";
import { ref } from "vue";
import { Process, Stack } from "@/components/ui";
import { useCatalogsStore } from "@/store/CatalogsStore";

const catalogsStore = useCatalogsStore();

const connection = new WebSocket("ws://localhost:9090/runAsync");

const done = ref<TProcess[]>();
const queue = ref<TProcess[]>();

connection.onmessage = (e: MessageEvent<string>) => {
  const data = JSON.parse(e.data);
  console.log({ data });
  done.value = data.done;
  queue.value = data.queue;
};

connection.onopen = () =>
  console.log("Successfully connected to the websocket server...");

connection.onclose = () => console.log("Connection closed");

const selectedCatalog = ref("");

function simulate() {
  const catalog = catalogsStore.find(selectedCatalog.value);
  if (!catalog) {
    alert("Catalogo no encontrado");
    return;
  }
}

function stop() {}
</script>

<template>
  <div class="space-y-4">
    <label>Seleccione un catalogo</label>
    <div class="flex gap-2">
      <select
        class="appearance-none text-white tracking-wide bg-transparent border border-teal-500 rounded-md p-2 focus:border-teal-600 focus:ring-teal-400 flex-1"
        v-model="selectedCatalog"
      >
        <option v-for="c in catalogsStore.catalogs" :value="c.name">
          {{ c.name }}
        </option>
      </select>
      <button
        class="font-bold tracking-wide p-2 rounded-md bg-teal-500"
        @click="simulate"
      >
        Ejecutar
      </button>
      <button
        class="font-bold tracking-wide p-2 rounded-md bg-red-500 text-white"
        @click="stop"
      >
        Cancelar
      </button>
    </div>
    <div>
      <Stack title="En cola">
        <Process v-for="p in queue" :process="p"></Process>
      </Stack>
      <Stack title="Ejecución">
        <Process
          v-if="queue && queue.length > 0"
          :process="queue![0]"
        ></Process>
      </Stack>
      <Stack title="Listos">
        <Process v-for="p in done" :process="p"></Process>
      </Stack>
    </div>
  </div>
</template>
