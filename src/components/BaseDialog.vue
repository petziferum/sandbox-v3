<script setup lang="ts">
import {ref} from "vue";
import type Product from "@/components/Product";
defineProps<{
  id: Product["id"];
  description: Product["description"];
  price: Product["price"];
  name: Product["name"];
  button: boolean;

}>();
const isOpen = ref(false);
</script>

<template>
<v-dialog width="auto" v-model="isOpen">
  <template v-if="button" v-slot:activator="{ props }">
    <v-btn
        color="primary"
        v-bind="props"
    >
      Open Dialog
    </v-btn>
  </template>
<v-card width="500">
  <v-card-title>
    <span class="headline">Use Google's location service?</span>
  </v-card-title>
  <v-card-actions>
    <v-spacer />
    <v-btn color="blue darken-1" variant="outlined" @click="isOpen = false">Close</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</template>
<style scoped>

</style>
