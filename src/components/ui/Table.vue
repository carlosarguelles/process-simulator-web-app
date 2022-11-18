<script setup>
const props = defineProps({
  headings: Array,
});
</script>

<template>
  <table
    class="whitespace-no-wrap table-striped relative w-full table-fixed border-collapse border-t border-gray-700"
  >
    <thead>
      <tr class="text-left">
        <th
          class="sticky top-0 border-b border-gray-700 px-6 py-2 text-sm font-medium"
          v-for="heading in props.headings"
          :key="heading"
        >
          {{ heading }}
        </th>
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
