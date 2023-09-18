<template>
  <div>
    <v-rating :modelValue="rating" readonly :background-color="color" color="yellow" :hover="hover" :readonly="readonly" :large="large" :length=ratingLenght :item-labels="labels" density="default" /><br>
    <span>{{rating}}/{{ratingLenght}}</span>
    </div>
</template>
<script setup lang=ts>
import {ref} from "vue";

const name = "Rating"

defineProps({
  rating: {
    type: Number,
    default: 5
  }
})
const color = ref("red")
const hover = ref(true)
const readonly = ref(false)
const large = ref(false)
const ratingLenght = ref(10)
const labels = ref(["Scheiße", "" , "", "", "OK", "", "", "", "", "Ausgezeichnet"])

</script>
<style scoped>

</style>