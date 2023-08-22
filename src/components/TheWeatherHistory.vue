<template>
<v-card>
  <v-card-title>The Weather History</v-card-title>
  <v-card-item>
    <v-btn @click="fetchWeatherHistory">fetch</v-btn>
  </v-card-item>
  <v-card-text v-if="weather">
    <p>Wetter in Trudering am {{ returnDate(weather.dt)}}</p>
    <div>
    Wetter: {{ weather.weather[0]}}<br>
      Temperatur: <span class="text-amber font-weight-bold">{{ weather.main?.temp}}</span><br>
      Gefühlte Temperatur:<span class="text-amber font-weight-bold">{{ weather.main?.feels_like}}</span><br>
    Min: {{ weather.main?.temp_min}} &nbsp; Max: {{ weather.main?.temp_max}}<br>
    Luftfeuchtigkeit: {{ weather.main?.humidity}}<br>
    <p>
      Sonnenaufgang: {{ returnDate(weather.sys?.sunrise)}}<br>
      Sonnenuntergang: {{ returnDate(weather.sys?.sunset)}}<br>
    </p>
    </div>
  </v-card-text>
</v-card>
</template>
<script setup lang="ts">
import {ref} from "vue";

const apiKey = "a0dbe6c05d28edabb0b92037ebfaa82c";
const lat = "48.13031387207511"
const lon ="11.697514437186333"
const weather = ref(null);
const fetchURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+apiKey;
function fetchWeatherHistory(): void {
  fetch(fetchURL)
  .then(response => response.json())
  .then(data => weather.value = data)
}

function returnDate(unixTime: number) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
}
</script>
<style scoped>

</style>