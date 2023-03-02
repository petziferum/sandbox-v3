<template>
  <the-map />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

// Components
import HelloWorld from '../components/HelloWorld.vue';
import TheMap from "@/components/TheMap.vue";

export default defineComponent({
  name: 'HomeView',

  components: {
    TheMap,
    HelloWorld,
  },
});
</script>
