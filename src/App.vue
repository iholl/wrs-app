<template>
  <div class="h-screen bg-gray-100">
    <index-header />
    <div class="pb-6 text-center">
      <div class="filter">
        <h3 class="p-1 text-md font-thin">Survey ID</h3> 
        <select v-model="survey_id">
          <option value="">None</option>
          <option value="10_20211110_NDOW_DEV">10_20211110_NDOW_DEV</option>
          <option value="test_20211115_mrjeffress">test_20211115_mrjeffress</option>
        </select>
      </div>
    </div>
    <div v-for="survey in filterSurveys" :key="survey.id" class="px-3">
      <div class="py-3">
        <div class="bg-white px-4 py-2 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            {{ survey.route_id }} - {{ survey.survey_date }}
          </h3>
        </div>
        <div class="bg-white overflow-hidden shadow-md">
          <dl class="divide-y divide-gray-200">
            <div class="px-4 py-1">
              <dt class="text-sm font-semibold text-gray-500">
                Crew Leader Information
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                {{ survey.leader }} ({{ survey.affiliation }})
              </dd>
              <dd class="mt-1 text-sm text-gray-900 capitalize">
                <div class="py-1">
                  <span class="pr-1 text-sm font-medium text-gray-500">Email:</span>
                  <span>{{ survey.email }}</span>
                </div>
              </dd>
              <dt class="mt-1 text-sm font-semibold text-gray-500">
                Weather Information
              </dt>
              <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 capitalize">
                <div class="py-1">
                  <span class="pr-1 text-sm font-medium text-gray-500">Precipitation:</span>
                  <span>{{ survey.precipitation }}</span>
                  <span class="px-1 text-sm font-medium text-gray-500">Ice:</span>
                  <span>{{ survey.ice }}</span>
                  <span class="px-1 text-sm font-medium text-gray-500">Fog:</span>
                  <span>{{ survey.fog }}</span>
                  <span class="px-1 text-sm font-medium text-gray-500">Snow Cover:</span>
                  <span>{{ survey.snow_cover }}</span>
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <div v-if="survey_id" class="bg-white overflow-hidden shadow-md">
          <div class="bg-white px-4 py-2 border-b border-gray-200">
            <h4 class="text-md leading-6 font-thin text-gray-900">
              Sightings
            </h4>
          </div>
          <ul role="list" class="pb-3 divide-y divide-gray-200">
            <li v-for="sighting in filterSightings" :key="sighting.id" class="px-4 py-2">
              <h5 class="text-md text-gray-700">{{ sighting.sight_time }}</h5>
              <p class="px-1 text-sm text-gray-700">{{ sighting.species }} ({{ sighting.number_species }}) {{ sighting.activity }}, {{ sighting.road_side }}, {{ sighting.distance }}(m) ({{ sighting.x }}, {{ sighting.y }})</p>
            </li>
          </ul>
        </div>
        <!-- <div class="bg-white px-4 py-5 border-b border-gray-200">
          {{ sightings }}
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import IndexHeader from "@/components/index-header.vue"
// import SurveyCard from "@/components/index-header.vue"

import { getSurveys, getSightings } from "@/services/wrs-services.js"

export default {
  name: "App",
  components: {
    IndexHeader,
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