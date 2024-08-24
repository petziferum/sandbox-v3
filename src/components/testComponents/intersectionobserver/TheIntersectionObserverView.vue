<template>
  <v-card title="Intersection Observer with Tabs Animation">
    <v-card-subtitle>
      <v-tabs grow v-model="tab_selected" slider-color="red">
        <v-tab v-for="(category, index) in categories" :key="index" class="nav_tab">
          {{ category }}
        </v-tab>
        <template v-slot:slider>
          <div class="custom-tab-slider"></div>
        </template>
      </v-tabs>
    </v-card-subtitle>
    <v-card-text style="height: 250px; overflow-y: scroll">
      <div v-for="(category, index) in categories" :key="index">
        <v-card v-intersect="handleIntersect" :id="'sec_'+index" class="contentcard elevation-4" color="blue" height="200" width="400">
            <strong>...{{ category }} - index: {{ index }}...</strong>
        </v-card>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const categories = ref(["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"]);
const tab_selected = ref("0");

const handleIntersect = (isIntersecting: boolean, entries: IntersectionObserverEntry[], entry: IntersectionObserverEntry) => {
  if (isIntersecting) {
    const index = entries[0].target.id.split("_")[1];
    console.log("index:", index);
    tab_selected.value = index;
  }
};
</script>
<style scoped>
.nav_tab{
  cursor: pointer;
  background-color: #2c3e50;
  color: black;
}
.contentcard{
  margin-bottom: 500px;
}
.v-tabs-slider {
  height: 10px;
  background-color: white;
}
</style>