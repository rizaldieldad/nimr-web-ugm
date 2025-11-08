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
                    path: "commitment-1",
                    component: () => import('./pages/survey/commitment/Commitment1.vue')
                },
                {
                    path: "commitment-2",
                    component: () => import('./pages/survey/commitment/Commitment2.vue')
                },
                {
                    path: "big-data-1",
                    component: () => import('./pages/survey/big-data/BigData1.vue')
                },
                {
                    path: "big-data-2",
                    component: () => import('./pages/survey/big-data/BigData2.vue')
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
                    path: "case1/question-1",
                    component: () => import('./pages/survey/case1/QuestionPage1.vue')
                },
                {
                    path: "case2",
                    component: () => import('./pages/survey/case2/Description.vue')
                },
                {
                    path: "case2/question-1",
                    component: () => import('./pages/survey/case2/QuestionPage1.vue')
                },
                {
                    path: "case2/question-2",
                    component: () => import('./pages/survey/case2/QuestionPage2.vue')
                },
                {
                    path: "case3",
                    component: () => import('./pages/survey/case3/Description.vue')
                },
                {
                    path: "case3/question-1",
                    component: () => import('./pages/survey/case3/QuestionPage1.vue')
                },
                {
                    path: "case4",
                    component: () => import('./pages/survey/case4/Description.vue')
                },
                {
                    path: "case4/question-1",
                    component: () => import('./pages/survey/case4/QuestionPage1.vue')
                },
                {
                    path: "case4/question-2",
                    component: () => import('./pages/survey/case4/QuestionPage2.vue')
                },
                {
                    path: "case5",
                    component: () => import('./pages/survey/case5/Description.vue')
                },
                {
                    path: "case5/question-1",
                    component: () => import('./pages/survey/case5/QuestionPage1.vue')
                },
                {
                    path: "case6",
                    component: () => import('./pages/survey/case6/Description.vue')
                },
                {
                    path: "case6/question-1",
                    component: () => import('./pages/survey/case6/QuestionPage1.vue')
                },
                {
                    path: "case6/question-2",
                    component: () => import('./pages/survey/case6/QuestionPage2.vue')
                },
                {
                    path: "case7",
                    component: () => import('./pages/survey/case7/Description.vue')
                },
                {
                    path: "case7/question-1",
                    component: () => import('./pages/survey/case7/QuestionPage1.vue')
                },
                {
                    path: "case8",
                    component: () => import('./pages/survey/case8/Description.vue')
                },
                {
                    path: "case8/question-1",
                    component: () => import('./pages/survey/case8/QuestionPage1.vue')
                },
                {
                    path: "case8/question-2",
                    component: () => import('./pages/survey/case8/QuestionPage2.vue')
                },
                {
                    path: "thankyou",
                    component: () => import('./pages/ThankYou.vue')
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

app.use(router)
app.use(i18n)
app.use(pinia)
app.mount('#app')
