<template>
  <div width="100px">
  <v-text-field v-model="nameEdit" label="Name" type="text" autofocus density="compact" variant="outlined"/>
  </div>
</template>





<script setup lang=ts>
import {computed} from "vue";
import type Product from "@/components/Product";
export interface Props {
  id: Product["id"];
  name: Product["name"];
  description: Product["description"];
  price: Product["price"];
  button: boolean;
}

let props = withDefaults(defineProps<Props>(),{
  button: false
});
const emit = defineEmits(["update:productName"]);
const nameEdit = computed({
  get() {
    return props.name;
  },
  set(value) {
    emit('update:productName', value);
  }
})
</script>
<style scoped>

</style>