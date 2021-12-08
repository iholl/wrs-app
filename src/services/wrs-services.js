import axios from "axios";

const baseURL = process.env.VUE_APP_API_URL

const apiClient = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accpest: 'application/json',
    'Content-Type': 'application/json'
  }
})

const getSurveys = () => {
  return apiClient.get("/")
}

const getSightings = () => {
  return apiClient.get("/sightings/")
}

// const getSightingsById = () => {
//   return apiClient.get("/sightings/10_20211110_NDOW_DEV")
// }

const getGeojson = () => {
  return apiClient.get("/geojson")
}

export {
  getSurveys,
  getSightings,
  getGeojson
}
