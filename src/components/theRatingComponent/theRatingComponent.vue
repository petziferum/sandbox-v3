<template>
  <div>
    <v-rating :modelValue="rating" readonly :background-color="color" color="yellow" :hover="hover" :readonly="readonly" :large="large" :length=ratingLenght :item-labels="labels" density="default" /><br>
    <span>{{rating}}/{{ratingLenght}}</span>
    </div>
<v-card
    color="purple"
width="450">
  <v-card-title>
    <h3>{{ name }}</h3>
  </v-card-title>

  <v-card-text>
    <v-rating
        v-model="rating"
        :background-color="color"
        :hover="hover"
        :readonly="readonly"
        :large="large"
        color="white"
        active-color="yellow-accent-4"
        :length=ratingLenght
        :item-labels="labels"
        size="20"
        density="compact"
        half-increments
    />
    <span class="mx-4">{{rating}}/{{ratingLenght}}</span>
  </v-card-text>
</v-card>
</template>
<script setup lang=ts>
import {computed, ref} from "vue";

const name = "The Rating Component"
const ratings = ref([6,5,9,6,7])

defineProps({
  rating: {
    type: Number,
    default: 5
  }
})
const color = ref("red")
const hover = ref(true)
const readonly = ref(true)
const large = ref(false)
const ratingLenght = ref(10)
const labels = ref(["Scheiße", "" , "", "", "OK", "", "", "", "", "Ausgezeichnet"])

const rating = computed({
  get: () => {
    const length = ratings.value.length
    const sum = ratings.value.reduce((a, b) => a + b, 0);
    return  (sum / length).toFixed(2)
  },
  set: (value) => {

  }
})
</script>
<style scoped>

</style>
