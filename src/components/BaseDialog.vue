<script setup lang="ts">
import {ref} from "vue";
import type Product from "@/components/Product";

// durch dieses Schreibweise mit v-bind werden die Attribute aus der Klasse einzeln ausgelesen
export interface Props {
  id: Product["id"];
  description: Product["description"];
  price: Product["price"];
  name: Product["name"];
  dialogTitle: "Dialog Title";
}
//Props werden im Interface definiert und mit WithDefault können sie mit Defaultwerten versehen werden
withDefaults(defineProps<Props>(),{
  dialogTitle: "Dialog Title"
});
const isOpen = ref(false);
</script>

<template>
<v-dialog width="auto" v-model="isOpen">
  <template v-slot:activator="{ props }">
    <v-btn
        color="primary"
        v-bind="props"
    >
      Open Dialog
    </v-btn>
  </template>
<v-card width="500">
  <v-card-title>
    <span class="headline">{{ dialogTitle }}</span>
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
