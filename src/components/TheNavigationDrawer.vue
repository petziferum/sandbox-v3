<template>
<v-navigation-drawer
  v-model="store.drawer"
elevation="3"
  image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
  theme="dark"
  expand-on-hover
rail>
  <v-list nav>
    <v-list-item prepend-icon="mdi-email" title="Inbox" value="inbox"></v-list-item>
    <v-list-item prepend-icon="mdi-account-supervisor-circle" title="Supervisors" value="supervisors"></v-list-item>
    <v-list-item prepend-icon="mdi-clock-start" title="Clock-in" value="clockin"></v-list-item>
  </v-list>
</v-navigation-drawer>
</template>
<script setup lang=ts>
import  {useRootStore} from "@/stores/RootStore";
import {computed} from "vue";

const store = useRootStore();
const drawerState = computed(() => store.drawer);

</script>
<style scoped>

</style>