<template>
  <l-map style="height:50vh" ref="map" v-model:zoom="zoom" :center="[38.2, -116.5]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-geo-json :geojson="geojson"/>
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer, LGeoJson } from "@vue-leaflet/vue-leaflet";

export default {
  props: ["geojson"],
  components: {
    LMap,
    LTileLayer,
    LGeoJson
  },
  data() {
    return {
      zoom: 6,
    };
  },
};
</script>