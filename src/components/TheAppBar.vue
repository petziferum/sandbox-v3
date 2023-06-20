<template>
<v-app-bar app image="src/assets/bar-bg.png">
  <v-app-bar-nav-icon @click="drawerSwitch">
    <v-icon>mdi-menu</v-icon>
  </v-app-bar-nav-icon>
  <div>Sandbox</div>
  <div>{{ drawerState }}</div>
</v-app-bar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRootStore } from "@/stores/RootStore";

const store = useRootStore();
const drawerState = ref(store.drawer);
const drawerSwitch = () => store.switchDrawer()
</script>

<style scoped>

</style>