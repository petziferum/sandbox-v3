<template>
  <v-app>
    <the-app-bar />
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheAppBar from "@/components/TheAppBar.vue";

export default defineComponent({
  name: 'App',
  components: {TheAppBar},

  data () {
    return {
      //
    }
  },
})
</script>
