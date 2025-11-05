import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router"
import i18n from './i18n.js'

import MainLayout from "./layout/MainLayout.vue"

// Pages
import Home from "./pages/Home.vue"
import Instruction1 from './pages/survey/Instruction1.vue'

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
          meta: {
            requiredDecline: true
          }
        },
        {
          path: "/personal-data",
          component: () => import("./pages/PersonalData.vue"),
          meta: {
            requiredConsent: true
          }
        },
        {
            path: "/survey",
            component: () => import("./pages/Survey.vue"),
            meta: {
                requiredConsent: true
            },
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
                    path: "comitment-1",
                    component: () => import('./pages/survey/commitment/Commitment1.vue')
                },
                {
                    path: "commitment-2",
                    component: () => import('./pages/survey/commitment/Commitment2.vue')
                },
                {
                    path: "big-data-1",
                    component: () => import('./pages/survey/big-data/BigData1.vue')
                }
            ]
        }
      ]
    }
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const hasDeclined = sessionStorage.getItem("userDeclined");
    const hasConsented = sessionStorage.getItem("userConsent");

    // Check if route requires decline
    if (to.matched.some(record => record.meta.requiredDecline)) {
        if (hasDeclined === 'true') {
            next()
        } else {
            next("/consent")
        }
    // Check if route requires consent
    } else if (to.matched.some(record => record.meta.requiredConsent)) {
        if (hasConsented === 'true') {
            next()
        } else {
            next("/consent")
        }
    } else {
        next()
    }
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
