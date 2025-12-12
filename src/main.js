import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createRouter, createWebHistory } from "vue-router"
import i18n from './i18n.js'
import { createPinia } from "pinia"

import MainLayout from "./layout/MainLayout.vue"

// Pages
import Home from "./pages/Home.vue"

const pinia = createPinia()

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
                        requiredConsent: true,
                        requiredPersonalData: true
                    },
                    children: [
                        {
                            path: "",
                            redirect: "/survey/instruction-1"
                        },
                        {
                            path: "instruction-1",
                            component: () => import("./pages/survey/instructions/Instruction1.vue")
                        },
                        {
                            path: "simulation-instruction",
                            component: () => import('./pages/survey/instructions/Simulation.vue')
                        },
                        {
                            path: "commitment-1",
                            component: () => import('./pages/survey/commitment/Commitment1.vue')
                        },
                        {
                            path: "commitment-2",
                            component: () => import('./pages/survey/commitment/Commitment2.vue')
                        },
                        {
                            path: "customer-identification-1",
                            component: () => import('./pages/survey/cust-identification/Page1.vue')
                        },
                        {
                            path: "customer-identification-2",
                            component: () => import('./pages/survey/cust-identification/Page2.vue')
                        },
                        {
                            path: "customer-internalization",
                            component: () => import('./pages/survey/cust-internalization/Page1.vue')
                        },
                        {
                            path: "customer-compliance",
                            component: () => import('./pages/survey/cust-compliance/Page1.vue')
                        },
                        {
                            path: "instruction-2",
                            component: () => import('./pages/survey/instructions/Instruction2.vue')
                        },
                        {
                            path: "case1",
                            component: () => import('./pages/survey/case1/Description.vue')
                        },
                        {
                            path: "case1/intro",
                            component: () => import('./pages/survey/case1/GameIntro.vue')
                        },
                        {
                            path: "case1/game",
                            component: () => import('./pages/survey/case1/Swipe.vue')
                        },
                        {
                            path: "case1/score",
                            component: () => import('./pages/survey/case1/GameScore.vue')
                        },
                        {
                            path: "case2",
                            component: () => import('./pages/survey/case2/Description.vue')
                        },
                        {
                            path: "case2/intro",
                            component: () => import('./pages/survey/case2/GameIntro.vue')
                        },
                        {
                            path: "case2/game",
                            component: () => import('./pages/survey/case2/Swipe.vue')
                        },
                        {
                            path: "case2/score",
                            component: () => import('./pages/survey/case2/GameScore.vue')
                        },
                        {
                            path: "case3",
                            component: () => import('./pages/survey/case3/Description.vue')
                        },
                        {
                            path: "case3/intro",
                            component: () => import('./pages/survey/case3/GameIntro.vue')
                        },
                        {
                            path: "case3/game",
                            component: () => import('./pages/survey/case3/Swipe.vue')
                        },
                        {
                            path: "case3/score",
                            component: () => import('./pages/survey/case3/GameScore.vue')
                        },
                        {
                            path: "case4",
                            component: () => import('./pages/survey/case4/Description.vue')
                        },
                        {
                            path: "case4/intro",
                            component: () => import('./pages/survey/case4/GameIntro.vue')
                        },
                        {
                            path: "case4/game",
                            component: () => import('./pages/survey/case4/Swipe.vue')
                        },
                        {
                            path: "case4/score",
                            component: () => import('./pages/survey/case4/GameScore.vue')
                        },
                        {
                            path: "thankyou",
                            component: () => import('./pages/ThankYou.vue')
                        }
                    ]
                },
                {
                    path: "/:pathMatch(.*)*",
                    name: "NotFound",
                    component: () => import("./pages/404.vue")
                }
            ]
        }
    ],
})

// Helper function to check if localStorage has valid structure
const checkAndValidateStorage = () => {
    const CURRENT_VERSION = "2.0.0"
    const stored = localStorage.getItem('survey-state')

    if (!stored) {
        return true // No stored data is fine
    }

    try {
        const parsedData = JSON.parse(stored)

        // Check version
        if (parsedData.version !== CURRENT_VERSION) {
            return false
        }

        // Check structure
        if (!parsedData.respondentInfo || !parsedData.answers || !parsedData.metadata) {
            return false
        }

        return true
    } catch (e) {
        return false // Invalid JSON
    }
}

// Navigation guard
router.beforeEach((to, from, next) => {
    // FIRST: Check if localStorage has old/invalid structure
    // This should run before any other checks
    if (!checkAndValidateStorage()) {
        // Clear everything
        localStorage.clear()
        sessionStorage.clear()

        // Only redirect to home if we're not already there
        if (to.path !== '/') {
            console.log('Old data structure detected, redirecting to home...')
            next('/')
            return
        }
    }

    const hasDeclined = sessionStorage.getItem("userDeclined");
    const hasConsented = sessionStorage.getItem("userConsent");
    const isSubmitted = sessionStorage.getItem("surveySubmitted");

    // Protect thank you page - only accessible after submission
    if (to.path === '/survey/thankyou') {
        if (isSubmitted === 'true') {
            next()
        } else {
            // Not submitted yet, redirect to survey start
            next('/survey')
        }
        return
    }

    // If survey is already submitted, prevent going back to survey pages
    if (isSubmitted === 'true' && to.path.startsWith('/survey') && to.path !== '/survey/thankyou') {
        next('/survey/thankyou')
        return
    }

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
            // Check if route requires personal data
            if (to.matched.some(record => record.meta.requiredPersonalData)) {
                const surveyStateString = localStorage.getItem("survey-state");
                let hasPersonalData = false;

                if (surveyStateString) {
                    try {
                        const surveyState = JSON.parse(surveyStateString);
                        hasPersonalData = !!(
                            surveyState.respondentInfo.fullNameTitle &&
                            surveyState.respondentInfo.email &&
                            surveyState.respondentInfo.age &&
                            surveyState.respondentInfo.affiliation &&
                            surveyState.respondentInfo.occupation
                        );
                    } catch (error) {
                        console.error("Failed to parse stored survey state:", error);
                    }
                }

                if (hasPersonalData) {
                    next()
                } else {
                    next("/personal-data")
                }
            } else {
                next()
            }
        } else {
            next("/consent")
        }
    } else {
        next()
    }
})

const app = createApp(App)

// enable vue devtools for development
app.config.devtools = true 

app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')