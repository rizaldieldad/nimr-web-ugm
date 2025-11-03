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
        }
      ]
    }
  ],
})

const app = createApp(App)

app.use(router)
app.use(i18n)
app.mount('#app')
