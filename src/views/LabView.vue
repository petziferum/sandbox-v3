<template>
  <v-container fluid>
    <h1>Welcome to the Lab</h1>
    <h4>Crazy Experiments are going on in here....</h4>
    <v-expansion-panels>
      <wrapper-panel title="Intersection Observer with Tabs Animation">
        <the-intersection-observer-view />
      </wrapper-panel>
      <wrapper-panel title="Character Test">
        <character-test />
      </wrapper-panel>
      <wrapper-panel title="Map & Set Zeugnis">
        <map-und-set />
      </wrapper-panel>
      <wrapper-panel title="Composable test">
        <the-composable-test />
      </wrapper-panel>
      <wrapper-panel title="Props and Emits">
        <the-props-test />
      </wrapper-panel>
      <wrapper-panel title="Abfahrsauskunft U2">
        <v-card>
          <v-card-title>
            <h3>Abfahrsauskunft U2</h3>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col class="text-grey">
                Hier wird die Abfahrsauskunft der U2 angezeigt.
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-btn @click="">Hello</v-btn>
              </v-col>
              <v-col cols="6">
                U2: "Noch nicht implementiert"
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </wrapper-panel>
    <wrapper-panel title="NAS Server Gradle Backend Test">
      <v-card>
        <v-card-title>
          <h3>Experiment local Server Backend</h3>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col class="text-grey">
              Das angesprochene Backend liegt auf dem Nas Server in einem Docker Container. Dort läuft es auf Port 8080. Das Image ist auf DockerHub und heist "gradlebackend".
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn @click="getHelloFromGradleBackend">Hello</v-btn>
            </v-col>
            <v-col cols="6">
              Antwort: "{{ serverResponse }}"
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </wrapper-panel>
    <wrapper-panel title="local Gallery">
        <local-gallery />
      </wrapper-panel>
    <wrapper-panel title="Sort and Filter">
        <the-sort-and-filter />
      </wrapper-panel>
    <wrapper-panel title="The Grid">
        <the-grid />
      </wrapper-panel>
    <wrapper-panel title="Product View and Props">
        <product-view />
      </wrapper-panel>
    <wrapper-panel title="Base Dialog">
        Dialog
        <base-dialog />
      </wrapper-panel>
    <wrapper-panel title="Grief Password Generator">
        <v-card style="background-color: #2c3e50;" theme="dark">
          <v-card-title>
            Grief Password Generator
          </v-card-title>
          <v-card-item>
            <v-btn @click="passwordGenerator">Generate Password</v-btn>
          </v-card-item>
          <v-card-item>
            Dein Passwort: <strong>{{ password }}</strong>
          </v-card-item>
          <v-card-text class="ml-4">
          <div class="ma-3">Alte Passwörter:</div>
          <ul>
            <li v-for="old in oldPassword">{{ old }}</li>
          </ul>
          </v-card-text>
        </v-card>
      </wrapper-panel>
    <wrapper-panel title="Ratin Component">
        Rating
        <the-movie-review :rating="1" movie-title="Ein scheiß Film"/>
      </wrapper-panel>
    <wrapper-panel title="The Weather API">
        <the-weather-history />
      </wrapper-panel>
      <wrapper-panel title="Experiment 1">
        <v-card>
          <v-card-title>
            <h3>Experiment 1</h3>
          </v-card-title>
          <v-card-text>
            <div class="ma-2">Fetch auf Firebase dokumentation Tabelle "users"</div>
            <v-btn @click="callNames">get Names</v-btn>
          </v-card-text>
        </v-card>
      </wrapper-panel>
    <wrapper-panel title="Product Forms">
        <the-product-form />
      </wrapper-panel>
    </v-expansion-panels>
  </v-container>
</template>
<script lang="ts" setup>
import {ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/plugins/firebaseConfig.js";
import TheWeatherHistory from "@/components/TheWeatherHistory.vue";
import TheMovieReview from "@/components/theRatingComponent/TheMovieReview.vue";
import TheProductForm from "@/components/TheProductForm.vue";
import BaseDialog from "@/components/BaseDialog.vue";
import ProductView from "@/components/products/ProductView.vue";
import TheGrid from "@/components/testComponents/theGrid.vue";
import TheSortAndFilter from "@/components/testComponents/TheSortAndFilter.vue";
import LocalGallery from "@/components/testComponents/localGallery.vue";
import WrapperPanel from "@/components/testComponents/WrapperPanel.vue";
import ThePropsTest from "@/components/testComponents/ThePropsTest.vue";
import TheComposableTest from "@/components/testComponents/TheComposableTest.vue";
import MapUndSet from "@/components/testComponents/MapUndSet.vue";
import CharacterTest from "@/components/testComponents/character/CharacterTest.vue";
import TheIntersectionObserverView
  from "@/components/testComponents/intersectionobserver/TheIntersectionObserverView.vue";

const password = ref("");
const oldPassword = ref([]);

const callNames = async function () {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, doc.data());
  });
}

const generatePassword = function (): void {
  console.log("leng", password.value.length);
  if(password.value.length > 1) {
    oldPassword.value.push(password.value);
  }
  console.log("old", oldPassword.value)
  const length = 8;
  const annoyingCharacterArray = ["0", "O", "l", "I", "1", "I", "|", "5", "S"];
  const griefFactor = 25;
  let nightmarePasswordArray: string[] = [];

  for (let i = 0; i <= griefFactor; i++) {
    const trollIndex = Math.floor(Math.random() * annoyingCharacterArray.length);
    nightmarePasswordArray.push(annoyingCharacterArray[trollIndex]);
  }
  const nightmarePassword = nightmarePasswordArray.join("");
  password.value = nightmarePassword;
}

function passwordGenerator() {
  const words = ["Petzi", "Cuci", "Hironimo"];
  const length = 12;
  if (!Array.isArray(words) || words.length === 0) {
    throw new Error('The input words must be a non-empty array.');
  }

  const passwordWords: string[] = [];
  const randomIndexes: number[] = [];
  const wordCount = words.length;

  // Generate random indexes to pick words from the array
  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * wordCount);
    randomIndexes.push(randomIndex);
  }

  // Select words from the array based on random indexes
  for (const index of randomIndexes) {
    passwordWords.push(words[index]);
  }

  // Concatenate the selected words to create the password
  const pass = passwordWords.join('');

  password.value = pass;
}



</script>
<style>
</style>
