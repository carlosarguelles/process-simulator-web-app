<script setup lang="ts">
import { computed, defineProps } from "vue";
import type { Process } from "@/types";
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
} from "chart.js";
import type { TChartData } from "vue-chartjs/dist/types";
import { Table, TableItem, TableItemCell } from "@/components/ui";

const props = defineProps<{
  processes: Process[];
}>();

const adminProcesses = computed(() =>
  props.processes.filter((p) => p.priority)
);

const userProcesses = computed(() =>
  props.processes.filter((p) => !p.priority)
);

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
);

const charData = computed((): TChartData<"line", any, string> => {
  return {
    labels: props.processes.map((p) => p.name),
    datasets: [
      {
        label: "Proceso vs TurnAround",
        data: props.processes.map((p) => p.turnAround),
        borderColor: "#36A2EB",
      },
    ],
  };
});
</script>

<template>
  <article class="space-y-3">
    <h3 class="text-bold">Listado de ejecución</h3>
    <Table
      v-if="userProcesses.length > 0"
      :headings="['P', 'T. L', 'R', 'P. R', 'T. R', 'T. F']"
    >
      <TableItem v-for="p in userProcesses" :key="p.pid">
        <TableItemCell>{{ p.name }}</TableItemCell>
        <TableItemCell>{{ p.arrivalTime }}</TableItemCell>
        <TableItemCell>{{ p.initialBurstTime }}</TableItemCell>
        <TableItemCell>{{ p.priority ? "1" : "0" }}</TableItemCell>
        <TableItemCell>{{ p.turnAround }}</TableItemCell>
        <TableItemCell>{{ p.finalTime }}</TableItemCell>
      </TableItem>
    </Table>
    <h3 class="text-bold">Listado de procesos no expulsivos</h3>
    <Table
      v-if="adminProcesses.length > 0"
      :headings="['P', 'T. L', 'R', 'P. R', 'T. R', 'T. F']"
    >
      <TableItem v-for="p in adminProcesses" :key="p.pid">
        <TableItemCell>{{ p.name }}</TableItemCell>
        <TableItemCell>{{ p.arrivalTime }}</TableItemCell>
        <TableItemCell>{{ p.initialBurstTime }}</TableItemCell>
        <TableItemCell>{{ p.priority ? "1" : "0" }}</TableItemCell>
        <TableItemCell>{{ p.turnAround }}</TableItemCell>
        <TableItemCell>{{ p.finalTime }}</TableItemCell>
      </TableItem>
    </Table>
    <div class="mb-10">
      <Line
        :chartData="charData"
        :chartOptions="{
          color: '#FFFFFF',
          responsive: true,
          maintainAspectRatio: false,
        }"
      />
    </div>
  </article>
</template>
