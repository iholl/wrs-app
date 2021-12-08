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
    <l-control 
      :position="'bottomleft'" 
      class="custom-control-list">
      <div id="info">
        <p>Mouse over sightings to see the details for that sighting</p>
      </div>
    </l-control>
    <l-geo-json :geojson="filterSighintgLocations" :geojsonOptions="geojsonOptions" :options="options" >
      <l-popup>
        Dis Shit
      </l-popup>
    </l-geo-json>
  </l-map>
</template>

<script>
// DON'T load Leaflet components here!
// Its CSS is needed though, if not imported elsewhere in your application.
import "leaflet/dist/leaflet.css"
import { LMap, LGeoJson, LTileLayer, LPopup, LControl } from "@vue-leaflet/vue-leaflet";

export default {
  props: ["geojson", "survey_id"],
  components: {
    LMap,
    LGeoJson,
    LTileLayer,
    LPopup,
    LControl
  },
  data() {
    return {
      zoom: 7,
      geojsonOptions: {
        "color": "#ff7800",
        "weight": 5,
        "opacity": 0.65
      }
    };
  },
  computed: {
    filterSighintgLocations: function(){
      return this.geojson.features.filter(
        item => item.properties.ndow_id === this.survey_id
      );
    },
    onEachFeature() {
      return (features, layer) => {        
        const sightingDetails = "<h1><b> SPECIES " + features.properties.species + "</b></h1>" +
          "<p>Time: " + features.properties.sight_time + "</p>" +
          "<p>Survey ID: " + features.properties.ndow_id + "</p>";
        
        const defualtTip = "<p>Mouse over sightings to see the details for that sighting</p>"
        
        layer.on('mouseover', function () {
          document.getElementById("info").innerHTML = sightingDetails;
          
        });
        layer.on('mouseout', function () {
          document.getElementById("info").innerHTML = defualtTip;
          
        });
      }
    }, 
    options() {
      return {
        onEachFeature: this.onEachFeature
      }
    }
  }
};
</script>

<style scoped>
.custom-control-list {
    color: #fff;
    background: rgb(15, 14, 14, 0.5);
    padding:  5px 20px;
    margin: 10px;
    border-radius: 3px;
}
</style>