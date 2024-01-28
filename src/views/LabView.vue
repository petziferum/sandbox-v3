<template>
  <v-container fluid>
    <h1>Welcome to the Lab</h1>
    <h4>Crazy Experiments are going on in here....</h4>
    <v-row id="Nas_Server_Gradle_Backend">
      <v-col>
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
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <the-excel-upload-component />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <local-gallery />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <the-sort-and-filter />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <the-grid />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <product-view />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Dialog
        <base-dialog />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
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

      </v-col>
    </v-row>
    <v-row>
      <v-col>
        Rating
        <the-movie-review rating="1" movie-title="Ein scheiß Film"/>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <the-weather-history />
      </v-col>
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
    <v-row>
      <v-col>
        <the-product-form />
      </v-col>
    </v-row>
  </v-container>
</template>
<script lang="ts" setup>
import {computed, onBeforeMount, onMounted, reactive, ref} from "vue";
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
import TheExcelUploadComponent from "@/components/TheExcelUploadComponent.vue";

const password = ref("");
const oldPassword = ref([]);
const serverResponse = ref("");

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

function getHelloFromGradleBackend() {
  const ip = "192.168.178.123";
  fetch('http://localhost:8080/hello')
    .then(response => response.text())
    .then(data => {
      console.log(data);
      serverResponse.value = data;
    });
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
