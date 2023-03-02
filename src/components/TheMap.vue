<template>
  <div style="width:100%; height: 40vh">
  <l-map
      ref="map"
      v-model:zoom="zoom"
      :center="center"
      >
    <l-tile-layer
        layer-type="base"
        name="Karte"
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    ></l-tile-layer>
    <l-tile-layer
        url="https://s3.amazonaws.com/te512.safecast.org/{z}/{x}/{y}.png"
        attribution="<a href='https://blog.safecast.org/about/'>SafeCast</a> (<a href='https://creativecommons.org/licenses/by-sa/3.0/'>CC-BY-SA</a>"
        :min-zoom="5"
        :max-zoom="7"
    />
    <l-layer-group>
      <l-marker :lat-lng="coordinates2" draggable>
        <l-popup> Hi! You can drag me around! </l-popup>
      </l-marker>
    </l-layer-group>

    <l-marker :lat-lng="coordinates" draggable>
      <l-icon icon-url="https://placekitten.com/32/32" :icon-size="[48, 48]" />
      <l-tooltip> What a tiny kitten </l-tooltip>
    </l-marker>
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
    LIcon
} from "@vue-leaflet/vue-leaflet";
import {ref} from "vue";

const center = ref([41.61322, -87.219482])
const zoom = ref(100);
const coordinates = ref([41.61322, -87.219839])
const coordinates2 = ref([41.61322, -87.219483])

function onMapClick(e) {
  alert("Du hast geklickt" + e.latLng);
}
</script>

<style scoped>
</style>