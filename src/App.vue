<template>
  <div>
    <h1 class="dashboard-title">Winter Raptor Surveys</h1>
    <p class="dashboard-title">Filter the data to see the related sightings for each survey.</p>
    <div class="indicator-container">
      <div class="filter">
        <h3>Survey ID</h3> 
        <select v-model="category">
          <option value="">None</option>
          <option value="10_20211110_NDOW_DEV">10_20211110_NDOW_DEV</option>
          <option value="test_20211115_mrjeffress">test_20211115_mrjeffress</option>
        </select>
      </div>
    </div>
    <div v-for="survey in filterProductsByCategory" :key="survey.id">
      <div class="card">
        <header class="card-header">
          <span class="card-header-title">
            Survey ID: {{ survey.ndow_id }}
          </span>
          <p>Route ID: {{ survey.route_id }}</p>
          <p>Survey Date: {{ survey.survey_date }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="group-content">
              <div>
                <p><b>OBSERVER INFORMATION</b></p>
                <span>Name: {{ survey.leader }}</span>
                <span> Phone: {{ survey.phone }}</span>
                <span> Email: {{ survey.email}}</span>
                <span> Additional Observers: {{ survey.total_observers - 1 }}</span>
                <span v-if="survey.total_observers > 1"> Names: {{ survey.observer_names }}</span>
              </div>
            </div>
            <div v-if="category" class="group-content">
              <p><b>WEATHER INFORMATION</b></p>
              <span>Precipitation: {{ survey.precipitation }}</span>
              <span> Ice: {{ survey.ice }}</span>
              <span> Fog: {{ survey.fog }}</span>
              <span> Snow Cover: {{ survey.snow_cover }}</span>
              <div class="grid-container">
                <div class="grid-child purple">
                  <p class="weather-subtitle">Start</p>
                  <span>Sky: {{ survey.start_sky}}</span>
                  <span> Temperature: {{ survey.start_temperature }}</span>
                  <span> Wind: {{ survey.start_wind}}</span>
                </div>
                <div class="grid-child green">
                  <p class="weather-subtitle">End</p>
                  <span>Sky: {{ survey.end_sky}}</span>
                  <span> Temperature: {{ survey.end_temperature }}</span>
                  <span> Wind: {{ survey.end_wind}}</span>
                </div>
              </div>
            </div>
            <div v-if="category" class="group-content">
              <p><b>SIGHTING INFORMATION</b></p>
              <table>
                <thead>
                  <tr>
                    <th>
                      Species
                    </th>
                    <th>
                      Count
                    </th>
                    <th>
                      Activity
                    </th>
                    <th>
                      Time
                    </th>
                    <th>
                      Distance
                    </th>
                    <th>
                      Side
                    </th>
                    <th>
                      Speed
                    </th>
                    <th>
                      Coordinates
                    </th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="sighting in filterProductsBySite" :key="sighting.ndow_id">
                      <td>
                        {{ sighting.species }}
                      </td>
                      <td>
                        {{ sighting.number_species }}
                      </td>
                      <td>
                        {{ sighting.activity }}
                      </td>
                      <td>
                        {{ sighting.sight_time }}
                      </td>
                      <td>
                        {{ sighting.distance }}
                      </td>
                      <td>
                        {{ sighting.road_side }}
                      </td>
                      <td>
                        {{ sighting.obs_mph }}
                      </td>
                      <td>
                        {{ sighting.x }}, {{ sighting.y }}
                      </td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue"

import { getSurveys, getSightings } from "@/services/wrs-services.js"

export default {
  name: "App",
  data () {
    return {
      category: "",
      surveys: null,
      sightings:  null,
    }
  },
  async created () {
    await getSurveys().then((response) => {
      this.surveys = response.data
    })

    await getSightings().then((response) => {
      this.sightings = response.data
    })
  },
  computed: {
    filterProductsByCategory: function(){
        return this.surveys.filter(survey => !survey.ndow_id.indexOf(this.category))
    },
    filterProductsBySite: function(){
        return this.sightings.filter(sighting => !sighting.ndow_id.indexOf(this.category))
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.filter {
  padding: 12px 0 12px 32px;
}

.weather-subtitle {
  font-weight: 100;
  margin: 12px 0 8px 0;
}

.dashboard-title {
  text-align: center;
}

.card-header-title {
  font-size: 20px;
  font-weight: 100;
}

.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
}

.group-content {
 border: 1px solid grey;
 border-radius: 5px;
 padding: 0 12px 12px 12px;
 margin-top: 8px;
}

.indicator-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}

.indicator-card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 24px;
  padding: 12px;
  text-align: center;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px;
  margin: 24px;
  padding: 12px;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  scale: 1.03;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

/* Add some padding inside the card container */
/* .container {
  padding: 2px;
} */
</style>
