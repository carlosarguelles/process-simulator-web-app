<script setup lang="ts">
import { ref, computed } from "vue";
import type { Catalog, Process } from "@/types";
import { ProcessBanner } from "@/components/ui";
import { useQuery } from "vue-query";
import { ProcessApi } from "@/api/Process";
import { useCatalogsStore } from "@/store/CatalogsStore";

const catalogsStore = useCatalogsStore();

const { data, refetch } = useQuery({
  queryKey: ["processes"],
  queryFn: () => {
    return ProcessApi.all({ limit: 50 });
  },
});

const catalog = ref<Catalog>({
  name: "",
  processes: [],
});

const add = (p: Process) => {
  catalog.value.processes.push(p);
};

const remove = (p: Process) => {
  catalog.value.processes = catalog.value.processes.filter(
    (ps) => ps.pid != p.pid
  );
};

function create() {
  if (catalog.value.name === "") {
    alert("Debe escoger un nombre para el catálogo");
    return;
  }

  if (catalog.value.processes.length < 3) {
    alert("Debe elegir al menos 3 procesos");
    return;
  }

  catalogsStore.add(catalog.value);
  catalog.value = {
    name: "",
    processes: [],
  };
  refetch.value();
}

const allProcesses = computed(() =>
  data.value?.data.filter((p) => !catalog.value.processes.includes(p))
);
</script>

<template>
  <div class="flex flex-col gap-2">
    <label for="name">Nombre del catálogo</label>
    <div class="flex gap-2 w-full">
      <input
        type="text"
        class="appearance-none text-white tracking-wide bg-transparent border border-teal-500 rounded-md p-2 focus:border-teal-600 focus:ring-teal-400 flex-1"
        placeholder="Nombre del catálogo"
        v-model="catalog.name"
      />
      <button
        class="font-bold tracking-wide p-2 rounded-md bg-teal-500"
        @click="create"
      >
        Crear
      </button>
    </div>
    <div class="flex gap-2 w-full">
      <div class="flex flex-col gap-2 w-1/2">
        <label>Todos los procesos</label>
        <div class="flex flex-col gap-2 max-h-96 overflow-y-auto">
          <ProcessBanner
            v-for="p in allProcesses"
            :key="p.pid"
            :process="p"
            @click="add(p)"
          ></ProcessBanner>
        </div>
      </div>
      <div class="flex flex-col gap-2 w-1/2">
        <label>Procesos seleccionados</label>
        <div class="flex flex-col gap-2 max-h-96 overflow-y-auto">
          <ProcessBanner
            v-for="p in catalog.processes"
            :key="p.pid"
            :process="p"
            @click="remove(p)"
          ></ProcessBanner>
        </div>
      </div>
    </div>
  </div>
</template>
