<template>
  <v-app>
    <the-app-bar />
    <the-navigation-drawer />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheAppBar from "@/components/TheAppBar.vue";
import TheNavigationDrawer from "@/components/TheNavigationDrawer.vue";

export default defineComponent({
  name: 'App',
  components: {TheNavigationDrawer, TheAppBar},

  data () {
    return {
      //
    }
  },
})
</script>
