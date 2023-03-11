<template>
  <div style="width:100%; height: 40vh">
    <l-map
        ref="myMap"
        v-model:zoom="zoom"
        :center="center"
        @click="addMarker"
    >
      <l-tile-layer
          layer-type="base"
          name="Karte"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-marker v-for="(marker,i) in markers" :key="i" :lat-lng="marker._latlng" :icon="marker.options.icon">
        <l-tooltip>{{ marker.options.text }}<br>{{ marker._latlng }}</l-tooltip>
        <l-popup>
            <div class="ma-4">{{ marker.options.text}}<br></div>
            <v-btn size="x-small" color="red" @click="removeMarker(i)">Marker entfernen</v-btn>
        </l-popup>
      </l-marker>

    </l-map>
  </div>
  <div>
    <div v-for="m in markers" :key="m.id">
      {{ m._latlng }}, {{ m.options.icon.options.iconUrl }}, <v-img width="30px" :src="m.options.icon.options.iconUrl"></v-img>
    </div>
  {{ center }}
  <v-btn @click="addHome">click</v-btn>
    <v-btn @click="resetMarker">Reset</v-btn>
  </div>
</template>

<script setup>
import "leaflet/dist/leaflet.css";
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup,
  LTooltip,
    LControlAttribution,
    LIcon,
    LControlScale
} from "@vue-leaflet/vue-leaflet";
import {onMounted, ref} from "vue";

const myMap = ref(L);
const center = ref([48.130018, 11.697918])
const zoom = ref(16);
const coordinates = ref([41.61322, -87.219839])
const coordinates2 = ref([41.61322, -87.219483])
const customAttributionPrefix = ref("<strong>Custom bottom left attribution</strong>")
const markers = ref([])
const popup = ref(L.popup({},myMap))



function addMarker(e) {
  popup.value.setLatLng(e.latlng).setContent("klick");
  //.popup().setLatLng(e.latlng).setContent("Klick hier " + e.latlng).openOn(myMap.value);
  if(e.latlng) {
    const m = L.marker(e.latlng)
    markers.value.push(m);
  }
}

function removeMarker(index) {
  this.markers.splice(index, 1);
}

function resetMarker() {
  markers.value = []
  var icon = L.icon({iconUrl: "./src/assets/marker.png", iconSize:     [40, 40], iconAnchor: [20,34]})
  var pin = L.icon({iconUrl: "./src/assets/pin.png", iconSize:     [40, 40], iconAnchor: [20,34]})
  var destination = L.icon({iconUrl: "./src/assets/destination.png", iconSize:     [40, 40], iconAnchor: [20,34]})
  var favourite = L.icon({iconUrl: "./src/assets/favourite.png", iconSize:     [40, 40], iconAnchor: [20,34]})
  var fish = L.icon({iconUrl: "./src/assets/fish.png", iconSize:     [40, 40], iconAnchor: [20,34]})

  const m1 = L.marker([48.130762680642846, 11.697869896888735], {icon: pin, text: "Zu Hause"});
  const m2 = L.marker([48.129205, 11.698546], {icon: icon, text: "Piratenspielplatz"});
  const m3 = L.marker([48.13015, 11.69853], {icon: destination, text: "Tischtennisplatten"});
  const m4 = L.marker([48.131368, 11.696877], {icon: favourite, text: "Dönerbude"});
  const m5 = L.marker([48.125918, 11.701909], {icon: fish, text: "Fette Fische!"})
  markers.value.push(m1);
  markers.value.push(m2);
  markers.value.push(m3);
  markers.value.push(m4);
  markers.value.push(m5);
}

function addHome() {
  L.marker([48.130665597122466, 11.697993278503500]).addTo(myMap);
}

onMounted(() => {
  resetMarker();
})


</script>

<style scoped>
</style>