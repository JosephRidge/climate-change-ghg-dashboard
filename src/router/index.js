import { createRouter, createWebHistory } from 'vue-router'
import ForestCover from '../components/ForestCover.vue'
import GHGEmissions from '../components/GHGEmissions.vue'
import HelloWorld from '../components/HelloWorld.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/forest-cover',
      name: 'ForestCover',
      component: ForestCover
    },
    {
      path: '/ghg-emissions',
      name: 'Emissions', 
      component:GHGEmissions
    }
  ]
})

export default router