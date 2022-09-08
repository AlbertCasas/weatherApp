import Vue from 'vue'
import VueRouter from 'vue-router'
import AddCity from '../views/AddCity.vue'
import WeatherDetails from '../views/WeatherDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'add-city',
    component: AddCity
  },
  {
    path: '/weather/:city',
    name: 'weather-details',
    component: WeatherDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
