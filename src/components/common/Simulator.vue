<script setup lang="ts">
import type { Process as TProcess } from "@/types";
import { onMounted, ref } from "vue";
import { Process, Stack } from "@/components/ui";
import { Report } from "@/components/common";
import { useCatalogsStore } from "@/store/CatalogsStore";
import { computed } from "@vue/reactivity";

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

const processesInQueue = computed(() => {
  return queue.value?.slice(1);
});

const runningProcess = computed(() => queue.value?.slice(0, 1)[0]);
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
    </div>
    <div>
      <Stack title="En cola">
        <Process v-for="p in processesInQueue" :process="p"></Process>
      </Stack>
      <Stack title="Ejecución">
        <Process v-if="runningProcess" :process="runningProcess"></Process>
      </Stack>
      <Stack title="Listos">
        <Process v-for="p in done" :process="p"></Process>
      </Stack>
      <Report v-if="done && done.length > 0" :processes="done" />
    </div>
  </div>
</template>
