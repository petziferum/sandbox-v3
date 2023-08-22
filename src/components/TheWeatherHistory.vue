<template>
<v-card>
  <v-card-title>The Weather History</v-card-title>
  <v-card-item>
    <v-btn @click="fetchWeatherHistory">fetch</v-btn>
  </v-card-item>
  <v-card-text v-if="!loading">
    <p>Wetter in {{ location[0].local_names.de }} am {{ returnDate(weather.dt)}}</p>
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

const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const lat = "48.13031387207511"
const lon ="11.697514437186333"
const weather = ref(null);
const location = ref(null);
const fetchURL = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=metric&appid="+apiKey;
const geoLocationUrl = "http://api.openweathermap.org/geo/1.0/reverse?lat="+lat+"&lon="+lon+"&limit=3&appid="+apiKey;
const loading = ref(true);

function fetchWeatherHistory(): void {
  loading.value = true;
  fetch(fetchURL)
  .then(response => response.json())
  .then(data => weather.value = data)
      .then(() => {
        fetch(geoLocationUrl)
            .then(response => response.json())
            .then(data => location.value = data)
      })
      .then(() => loading.value = false)
}

function returnDate(unixTime: number) {
  const date = new Date(unixTime * 1000);
  return date.toLocaleString();
}
</script>
<style scoped>

</style>