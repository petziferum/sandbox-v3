<template>
  <div style="width:100%; height: 40vh">
  <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      @click="addMarker"
      >
    <l-tile-layer
        layer-type="base"
        name="Karte"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-marker v-for="(marker,i) in markers" :key="i" :lat-lng="marker.latlng" @click="removeMarker(i)" draggable>
      <l-tooltip>{{ marker.text }}<br>{{ marker.latlng }}</l-tooltip>
    </l-marker>
  </l-map>
  </div>
  {{ markers }}
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
import {ref} from "vue";

const center = ref([48.12148528243583, 11.63177490234375])
const zoom = ref(13);
const coordinates = ref([41.61322, -87.219839])
const coordinates2 = ref([41.61322, -87.219483])
const customAttributionPrefix = ref("<strong>Custom bottom left attribution</strong>")
const markers = ref([{ text: "first marker", latlng: L.latLng(48.12148528243583, 11.63177490234375)}])

function addMarker(e) {
  console.log("add marker", e.latlng);
  if(e.latlng) {
    markers.value.push({text: "new Marker", latlng: e.latlng});
  }
}

function removeMarker(index) {
  console.log("Remove", index);
  this.markers.splice(index, 1);
}
</script>

<style scoped>
</style>