<template>
  <the-app-bar />
  <the-map />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import TheMap from "@/components/TheMap.vue";
import TheAppBar from "@/components/TheAppBar.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    TheAppBar,
    TheMap,
    HelloWorld,
  },
});
</script>
