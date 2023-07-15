<template>
  <v-container fluid>
    <h1>Welcome to the Lab</h1>
    <h4>Crazy Experiments are going on in here....</h4>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <h3>Experiment 1</h3>
          </v-card-title>
          <v-card-text>
            <v-btn @click="callNames">get Names</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import {onMounted, reactive, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/plugins/firebaseConfig.js";
const callNames = async function () {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

</script>
<style>
</style>
