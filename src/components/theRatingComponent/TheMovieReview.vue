<template>
<v-card>
<v-card-title>
  {{ movieTitle}}
</v-card-title>
  <v-card-actions>
    <the-rating-component :rating="rating"/>
  </v-card-actions>
</v-card>
</template>
<script setup lang=ts>
import TheRatingComponent from "@/components/theRatingComponent/theRatingComponent.vue";

defineProps({
  movieTitle: {
    type: String,
    default: "Movie Title"
  },
  rating: {
    type: Number,
    default: 5
  }
})
</script>
<style scoped>

</style>