<template>
  <div class="h-full bg-gray-50">
    <index-header />
    <div class="pb-6 text-center">
      <div class="filter">
        <h3 class="p-1 text-md font-thin">Survey ID</h3> 
        <select v-model="survey_id">
          <option value="">None</option>
          <option value="10_20211110_NDOW_DEV">10_20211110_NDOW_DEV</option>
          <option value="test_20211115_mrjeffress">test_20211115_mrjeffress</option>
          <option value="1_20211129_NDOW_DEV">1_20211129_NDOW_DEV</option>
        </select>
      </div>
    </div>
    <index-indicators v-if="!survey_id" class="px-4 py-4" />
    <div v-for="survey in filterSurveys" :key="survey.id" class="px-3">
      <div class="py-3">
        <div class="grid grid-cols-2 bg-green-700 px-4 py-2 rounded-t-md">
          <h3 class="col-span-1 text-lg leading-6 text-gray-50">
            {{ survey.route_id }} - {{ survey.survey_date }}
          </h3>
          <h3 class="col-span-1 text-lg leading-6 text-gray-50 text-right">
            COMPLETE
          </h3>
        </div>
        <div class="bg-white overflow-hidden shadow-md rounded-md py-4">
          <div>
            <h2 v-if="survey_id" class="px-4 py-2 text-lg">Survey Details</h2>
            <dl class="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 px-4">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Crew leader
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.leader }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Affiliation
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.affiliation }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Email address
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.email }}
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Contact number
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.phone }}
                </dd>
              </div>
            </dl>
            <h2 v-if="survey_id" class="px-4 py-2 text-lg">Weather Details</h2>
            <dl v-if="survey_id" class="grid grid-cols-4 gap-x-4 gap-y-4 px-4">
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Rain
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.precipitation }}
                </dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Ice
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.ice }}
                </dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Fog
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.fog }}
                </dd>
              </div>
              <div class="col-span-1">
                <dt class="text-sm font-medium text-gray-500">
                  Snow
                </dt>
                <dd class="text-sm text-gray-900">
                  {{ survey.snow_cover }}%
                </dd>
              </div>
            </dl>
            <h2 v-if="survey_id" class="px-4 py-2 text-lg">Raptor Sightings ({{ filterSightings.length }})</h2>
            <sightings-table v-if="survey_id" :sightings="filterSightings" class="px-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IndexHeader from "@/components/index-header.vue"
// import SurveyCard from "@/components/index-header.vue"

import { getSurveys, getSightings } from "@/services/wrs-services.js"
import SightingsTable from './components/sightings-table.vue';
import IndexIndicators from './components/index-indicators.vue';

export default {
  name: "App",
  components: {
    IndexHeader,
    SightingsTable,
    IndexIndicators,
    // SurveyCard
  },
  data () {
    return {
      survey_id: "",
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
    filterSurveys: function(){
        return this.surveys.filter(survey => !survey.ndow_id.indexOf(this.survey_id))
    },
    filterSightings: function(){
        return this.sightings.filter(sighting => !sighting.ndow_id.indexOf(this.survey_id))
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
}
</style>