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
    <span class="headline">{{ dialogTitle }}</span>
  </v-card-title>
  <v-card-text>
    <slot>
     Default Slot Text wenn nichts in der Parent eingegeben wird.
    </slot>
  </v-card-text>
  <v-card-actions>
    <v-spacer />
    <v-btn color="blue darken-1" variant="outlined" @click="isOpen = false">Close</v-btn>
  </v-card-actions>
</v-card>
</v-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import type Product from "@/components/Product";

// durch dieses Schreibweise mit v-bind werden die Attribute aus der Klasse einzeln ausgelesen
export interface Props {
  id: Product["id"];
  description: Product["description"];
  price: Product["price"];
  productName: Product["name"];
  dialogTitle: "Dialog Title";
  button: boolean;
}
//Props werden im Interface definiert und mit WithDefault können sie mit Defaultwerten versehen werden
const props = withDefaults(defineProps<Props>(),{
  dialogTitle: "Dialog Title",
  productName: "Product Name",
  button: true
});
const emit = defineEmits(["input", "update"]);
const isOpen = ref(false);

const nameEdit = computed({
  get() {
    return props.productName;
  },
  set(value) {
    emit("input", value);
  }

})
</script>
