<template>
<v-container>
  <v-card title="Composable Test">
    <v-card-text>
      <v-row>
        <v-col cols="6">
          {{ text }}
        </v-col>
        <v-col cols="6">
          <v-btn @click="addText">change Text</v-btn>
          <v-btn @click="resetText">reset Text</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Hier kann durch VueUse ein Composable eingebunden werden.<br>
          <v-btn text link target="_blank" href="https://vueuse.org/guide/">Vue Use Docs</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script lang=ts setup>
import { text, addText, resetText } from '@/components/testComponents/Composable.logic.ts';
import { useArrayFind } from "@vueuse/core";
</script>

<style scoped>

</style>
