<template>
  <l-map
    style="height:50vh"
    ref="map"
    :zoom="zoom"
    :center="[38.2, -116.5]">
    <l-tile-layer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      layer-type="base"
      name="OpenStreetMap"
    />
    <l-geo-json :geojson="filterSighintgLocations" />
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer } from "@vue-leaflet/vue-leaflet";

export default {
  props: ["geojson", "survey_id"],
  components: {
    LMap,
    LGeoJson,
    LTileLayer
  },
  data() {
    return {
      zoom: 7,
    };
  },
  computed: {
    filterSighintgLocations: function(){
      return this.geojson.features.filter(
        item => item.properties.ndow_id === this.survey_id
      );
    },
  }
};
</script>