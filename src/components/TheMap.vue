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
      <l-marker v-for="(marker,i) in markers" :key="i" :lat-lng="marker.latlng">
        <l-tooltip>{{ marker.text }}<br>{{ marker.latlng }}</l-tooltip>
        <l-popup style="background-color:rgba(0, 0, 0, 0.5)">
            <v-btn size="x-small" color="red" @click="removeMarker(i)">Marker entfernen</v-btn>
        </l-popup>
      </l-marker>

    </l-map>
  </div>
  {{ markers }}<br>
  {{ center }}
  <v-btn @click="addHome">click</v-btn>
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
const center = ref([48.130665597122466, 11.697993278503418])
const zoom = ref(18);
const coordinates = ref([41.61322, -87.219839])
const coordinates2 = ref([41.61322, -87.219483])
const customAttributionPrefix = ref("<strong>Custom bottom left attribution</strong>")
const markers = ref([{ text: "first marker", latlng: L.latLng( 48.130762680642846, 11.697869896888735)}])
const popup = ref(L.popup({},myMap))

function addMarker(e) {
  popup.value.setLatLng(e.latlng).setContent("klick");
  //.popup().setLatLng(e.latlng).setContent("Klick hier " + e.latlng).openOn(myMap.value);
  if(e.latlng) {
    markers.value.push({text: "new Marker", latlng: e.latlng});
  }
}

function removeMarker(index) {
  this.markers.splice(index, 1);

}

function addHome() {
  L.marker([48.130665597122466, 11.697993278503500]).addTo(myMap);
}
</script>

<style scoped>
</style>