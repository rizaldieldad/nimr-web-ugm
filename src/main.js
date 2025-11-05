import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router"
import i18n from './i18n.js'

import MainLayout from "./layout/MainLayout.vue"

// Pages
import Home from "./pages/Home.vue"
import Instruction1 from './pages/survey/Instruction1.vue'
import Comitment from './pages/survey/Comitment.vue'

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
          path: "/not-participate",
          component: () => import("./pages/DeclinedThankYou.vue"),
        },
        {
          path: "/personal-data",
          component: () => import("./pages/PersonalData.vue"),
        },
        {
            path: "/survey",
            component: () => import("./pages/Survey.vue"),
            children: [
                {
                    path: "",
                    redirect: "/survey/instruction-1"
                },
                {
                    path: "instruction-1",
                    component: Instruction1
                },
                {
                    path: "comitment",
                    component: Comitment
                }
            ]
        }
      ]
    }
  ],
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
