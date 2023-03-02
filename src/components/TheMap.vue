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
    <l-control-attribution
        position="bottomleft"
        :prefix="customAttributionPrefix"
    />
    <l-control-scale position="bottomleft" />
    <l-layer-group>
      <l-marker :lat-lng="coordinates2" draggable>
        <l-popup> Hi! You can drag me around! </l-popup>
      </l-marker>
    </l-layer-group>

    <l-marker :lat-lng="coordinates" draggable>
      <l-icon icon-url="https://placekitten.com/32/32" :icon-size="[48, 48]" />
      <l-tooltip> What a tiny kitten </l-tooltip>
    </l-marker>
    <l-marker v-for="(marker,i) in markers" :key="i" :lat-lng="marker" @click="removeMarker(i)"></l-marker>
  </l-map>
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
import {ref} from "vue";

const center = ref([41.61322, -87.219482])
const zoom = ref(100);
const coordinates = ref([41.61322, -87.219839])
const coordinates2 = ref([41.61322, -87.219483])
const customAttributionPrefix = ref("<strong>Custom bottom left attribution</strong>")
const markers = ref([L.LatLng(41.61322, -87.219839), L.LatLng(41.61322, -87.219483)])

function addMarker(e) {
  console.log("add marker", e.latlng);
  markers.value.push(e.latlng);
}

function removeMarker(index) {
  console.log("Remove", index);
  this.markers.splice(index, 1);
}
</script>

<style scoped>
</style>