import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router"
import i18n from './i18n.js'

import Home from "./pages/Home.vue"
import MainLayout from "./layout/MainLayout.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: MainLayout,
      children: [
        {
          path: "",
          component: Home,
        },
        {
          path: "/criteria",
          component: () => import("./pages/Criteria.vue"),
        },
        {
          path: "/consent",
          component: () => import("./pages/Consent.vue"),
        },
        {
          path: "/thankyou-not-participate",
          component: () => import("./pages/DeclinedThankYou.vue"),
        },
        {
          path: "/personal-data",
          component: () => import("./pages/PersonalData.vue"),
        }
      ]
    }
  ],
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
