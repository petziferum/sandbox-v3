<template>
  <v-card v-if="owner.firstName" variant="outlined">
    <v-card-title>Name: {{ owner.firstName }} {{ owner.lastName }}</v-card-title>
    <v-card-subtitle>{{ owner.id }}</v-card-subtitle>
    <v-card-text>Address: {{ owner.description }}</v-card-text>
    <v-card-text>Email: {{ owner.email }}</v-card-text>
  </v-card>
</template>
<script setup lang="ts">

import {ref} from 'vue'

defineProps(['owner']);
</script>
<style scoped>

</style>