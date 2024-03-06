<template>
<v-container>
  <v-card title="Composable Test">
    <v-row>
      <v-col cols="6">
        {{ text }}
      </v-col>
      <v-col cols="6">
        <v-btn @click="addText">change Text</v-btn>
        </v-col>
    </v-row>
  </v-card>
</v-container>
</template>

<script lang=ts setup>
import {addText, text } from '@/components/testComponents/Composable.logic.ts';
</script>

<style scoped>

</style>
