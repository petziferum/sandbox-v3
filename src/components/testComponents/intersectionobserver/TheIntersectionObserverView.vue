<template>
<v-card title="Intersection Observer with Tabs Animation">
  <v-card-subtitle>
    <v-tabs grow v-model="tab_selected">
      <v-tabs-slider />
      <span  v-for="(category, index) in tabs" :key="index">
      <v-tab @click="$vuetify.goTo('#sec_'+index)" class="nav_tab">
        {{ category }}
        </v-tab>
      </span>
    </v-tabs>
  </v-card-subtitle>
  <v-card-text style="height:150px; overflow: scroll">
    <div v-for="(category, index) in categories" :key="index">
      <v-card :id="'sec_'+index" class="mb-10 elevation-4" color="blue" height="300" width="400">
        <span :id="'span_'+index" v-intersect="handleIntersect"></span>
        <strong>...{{category}}...</strong>
      </v-card>
    </div>
  </v-card-text>
</v-card>
</template>
<script setup lang=ts>
import {ref} from "vue";

const tabs = ref(5);
const tab_selected = ref(1);
const categories = ref(["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]);

const handleIntersect = (entries: IntersectionObserverEntry[]) => {
  let intersecting_element = entries[0]
  if(intersecting_element.isIntersecting){
    let id = intersecting_element.target.id
    tab_selected.value = Number(id.split("_")[1])
  }
}
</script>
<style scoped>

</style>