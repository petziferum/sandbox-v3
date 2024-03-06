<template>
  <v-expansion-panel>
    <v-expansion-panel-title ripple>{{ title }}</v-expansion-panel-title>
    <v-expansion-panel-text eager>
      <slot></slot>
    </v-expansion-panel-text>
  </v-expansion-panel>
</template>
<script setup lang="ts">
defineProps({
    title: {
      type: String,
      default: "Test Panel"
    }
});
</script>
<style scoped></style>
