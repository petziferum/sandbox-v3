<template>
  <v-dialog width="auto" v-model="isOpen">
    <template v-if="button" v-slot:activator="{ props }">
      <v-btn
          color="primary"
          v-bind="props"
      >
        Edit
      </v-btn>
    </template>

    <v-card width="500">
      <v-card-title>
        <span class="headline">Bearbeiten</span>
      </v-card-title>
      <v-card-text>
        Es wird eine Kopie erstellt, die hier bearbeitet wird. Nach dem Speichern wird die Kopie das Original überschreiben.
        <slot>
          <v-form ref="editForm">
            <v-text-field v-model="copy.name" label="Name" />
            <v-text-field v-model="copy.description" label="Description" />
            <v-text-field v-model="copy.price" label="Price" />
          </v-form>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" variant="outlined" @click="cancel">Cancel</v-btn>
        <v-btn color="blue darken-1" variant="outlined" @click="save">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {computed, ref} from "vue";
import Product from "@/components/Product";

const emit = defineEmits(["save"]);
const isOpen = ref(false);
const copy = ref<Product>(Product.createEmptyProduct());


function openDialog(product: Product) {
  copy.value = product;
  isOpen.value = true;
}
function save() {
  emit("save", copy.value.name);
  isOpen.value = false;
}
function cancel() {
  isOpen.value = false;
}
defineExpose({openDialog, copy})
</script>
