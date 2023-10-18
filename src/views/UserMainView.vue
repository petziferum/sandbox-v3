<template>
<v-card color="#c0c0c0" class="mx-2">
  <v-card-title>{{ user.displayName? "Willkommen " + user.displayName : "Servus" }}</v-card-title>
  <v-card-item>
    <v-expansion-panels>
      <v-expansion-panel style="background-color: #ffffff"
                         v-for="(value, key) in user" :key="key">
        <v-expansion-panel-title>{{ key }}</v-expansion-panel-title>
        <v-expansion-panel-text>{{ value }}</v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card-item>

  <v-card-actions>
    <template v-if="user.auth">
      <v-btn @click="abmelden">Sign Out</v-btn>
      {{ user.auth.currentUser.uid }}
    </template>
    <template v-else>
    <v-btn @click="anmelden">Sign In</v-btn>
    </template>
  </v-card-actions>
</v-card>
</template>
<script setup lang=ts>

import {reactive, onBeforeMount, ref} from "vue";
import {auth, signIn} from "@/plugins/firebaseConfig";

const user = ref({});

onBeforeMount(() => {
  console.log("before mount");
  auth.onAuthStateChanged((fireUser) => {
    if (fireUser) {
      console.log("user", fireUser);
      user.value = fireUser;

    } else {
      console.log("no user");
    }
  });
})

function anmelden() {
  signIn();
}

function abmelden() {
  auth.signOut();
  user.value = {};
}

</script>
<style scoped>

</style>