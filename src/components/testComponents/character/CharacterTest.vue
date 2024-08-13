<script setup lang="ts">
import Character from "@/components/testComponents/character/Character";
import {ref, watch} from "vue";

const activeChar = ref<Character>(new Character());
const strengthWatcher = watch(() => activeChar.value.strength, (newStrength, oldStrength) => {
  message.value = "Es hat sich was getan: " + newStrength + ", war vorher: " + oldStrength;
});
const message = ref("");
const addedMessage = ref("");
const pointsMessage = ref("");
const points = ref(50);

function createNewCharacter() {
  const char = new Character();
  char.firstName = "Tungdil";
  char.lastName = "Boromir";
  char.charisma = 2;
  char.strength = 8;
  char.endurance = 4;
  activeChar.value = char;
}
function staerken() {
  const randomNumber = randomNumberAndPoints();
    activeChar.value?.addStrength(randomNumber);
  addedMessage.value = "Stärke wurde um " + randomNumber + " erhöht!";
}
function trainieren() {
  const randomNumber = randomNumberAndPoints();
  activeChar.value?.addEndurance(randomNumber);
  addedMessage.value = "Ausdauer wurde um " + randomNumber + " erhöht!";
}
function charisma() {
  const randomNumber = randomNumberAndPoints();
  activeChar.value?.addCharisma(randomNumber);
  addedMessage.value = "Charisma wurde um " + randomNumber + " erhöht!";
}
function randomNumberAndPoints() {
  const randomNumber = Math.floor((Math.random() * 11) + 1);
  const newPoints = points.value - randomNumber;
  pointsMessage.value = "Punkte: " + randomNumber;
  if(newPoints >= 0) {
    points.value = newPoints;
    return randomNumber;
  } else {
    message.value= "Nicht genug Punkte!";
    return 0;
  }
}
function resetChar() {
  activeChar.value? activeChar.value.strength = 0 : 0;
  activeChar.value? activeChar.value.endurance = 0 : 0;
  activeChar.value? activeChar.value.charisma = 0 : 0;
}
</script>

<template>
  <v-card title="Character">
    <v-toolbar>
      <v-toolbar-items>
        <template v-if="!activeChar">
          <v-btn @click.prevent="createNewCharacter">Create New Character</v-btn>
        </template>
        <template v-else>
          <v-btn v-if="activeChar" @click="resetChar">Reset Character</v-btn>
          <v-btn @click="staerken">Stärken!</v-btn>
          <v-btn @click="trainieren">Ausdauer!</v-btn>
          <v-btn @click="charisma">Charisma!</v-btn>
          <div>Punkte: {{ points }}</div>
        </template>
      </v-toolbar-items>
    </v-toolbar>
    <v-card-text>
      {{ pointsMessage }}<br>
      {{ addedMessage }}<br>
      {{ message }}
    </v-card-text>
    <v-card-text>
      <template v-if="activeChar != undefined">
        <v-sheet>
          Name: {{ activeChar.firstName }}<br>
          Nachname: {{ activeChar.lastName }}<br>
          <v-row>
            <v-col cols="3">
              Stärke: <v-progress-linear :model-value="activeChar.strength" tile height="25" width="100" color="red" :max="999">{{activeChar.strength}}</v-progress-linear>
            </v-col>
            <v-col cols="3">
              Ausdauer: <v-progress-linear :model-value="activeChar.endurance" tile height="25" color="green" :max="999" width="100">{{activeChar.endurance}}</v-progress-linear>
            </v-col>
            <v-col cols="3">
              Charisma: <v-progress-linear :model-value="activeChar.charisma" tile height="25" color="blue" :max="999" width="100">{{activeChar.charisma}}</v-progress-linear>
            </v-col>
          </v-row>
        </v-sheet>
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
