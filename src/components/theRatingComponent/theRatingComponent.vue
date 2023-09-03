<template>
<v-card>
  <v-card-title>
    <h3>{{ name }}</h3>
  </v-card-title>
  <v-card-text>
    <span>{{rating}}/{{ratingLenght}}</span>
  </v-card-text>
  <v-card-text>
    <v-rating v-model="rating" :background-color="color" color="yellow" :hover="hover" :readonly="readonly" :large="large" :length=ratingLenght :item-labels="labels" />
  </v-card-text>
</v-card>
</template>
<script setup lang=ts>
import {ref} from "vue";

const name = "The Rating Component"
const rating = ref(5)
const color = ref("red")
const hover = ref(true)
const readonly = ref(false)
const large = ref(true)
const ratingLenght = ref(10)
const labels = ref(["Scheiße", "" , "Mies", "", "Geht so", "", "Gut", "", "Sehr gut", "Ausgezeichnet"])

</script>
<style scoped>

</style>