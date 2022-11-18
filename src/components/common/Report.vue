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

const props = defineProps<{
  processes: Process[];
}>();

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
        data: props.processes.map((p) => p.turnAround),
      },
    ],
  };
});
</script>

<template>
  <article>
    <h2>Reporte</h2>
    <Line
      :chartData="charData"
      :chartOptions="{
        responsive: true,
        maintainAspectRatio: false,
      }"
    />
  </article>
</template>
