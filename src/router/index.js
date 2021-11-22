import { createRouter } from "vue-router"

// import views
import Home from "../App.vue"
import SightingsPage from "../Sightings.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sightings",
    name: "Sightings",
    component: SightingsPage
  },
]

const router = createRouter({
  routes
})

export default router
