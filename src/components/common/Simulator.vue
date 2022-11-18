<script setup lang="ts">
import type { Process as TProcess } from "@/types";
import { onMounted, ref } from "vue";
import { Process, Stack } from "@/components/ui";
import { Report } from "@/components/common";
import { useCatalogsStore } from "@/store/CatalogsStore";

const catalogsStore = useCatalogsStore();

const connection = new WebSocket("ws://localhost:9090/runAsync");

const done = ref<TProcess[]>();
const queue = ref<TProcess[]>();

connection.onmessage = (e: MessageEvent<string>) => {
  if (e.data.includes("[")) {
    const data = JSON.parse(e.data);
    done.value = data.done;
    queue.value = data.queue;
  } else {
    console.log(e.data);
  }
};

connection.onopen = () =>
  console.log("Successfully connected to the websocket server...");

connection.onclose = () => console.log("Connection closed");

const selectedCatalog = ref("");
const quantum = ref(0);

function simulate() {
  const catalog = catalogsStore.find(selectedCatalog.value);
  if (!catalog) {
    alert("Catalogo no encontrado");
    return;
  }

  if (quantum.value < 0) {
    alert("El quantum no puede ser cero");
    return;
  }

  connection.send(
    JSON.stringify({
      quantum: quantum.value,
      processList: catalog.processes,
    })
  );
}

function stop() {}
</script>

<template>
  <div class="space-y-4">
    <label>Seleccione un catalogo y quantum</label>
    <div class="flex gap-2">
      <select
        class="flex-1 appearance-none rounded-md border border-teal-500 bg-transparent p-2 tracking-wide text-white focus:border-teal-600 focus:ring-teal-400"
        v-model="selectedCatalog"
      >
        <option v-for="c in catalogsStore.catalogs" :value="c.name">
          {{ c.name }}
        </option>
      </select>
      <input
        type="number"
        class="appearance-none rounded-md border border-teal-500 bg-transparent p-2 tracking-wide text-white focus:border-teal-600 focus:ring-teal-400"
        v-model="quantum"
      />
      <button
        class="rounded-md bg-teal-500 p-2 font-bold tracking-wide"
        @click="simulate"
      >
        Ejecutar
      </button>
      <button
        class="rounded-md bg-red-500 p-2 font-bold tracking-wide text-white"
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
      <Report v-if="done" :processes="done" />
    </div>
  </div>
</template>
