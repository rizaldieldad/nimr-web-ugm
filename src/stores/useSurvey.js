// import { defineStore } from "pinia"
// import { reactive } from "vue"

// export const useSurvey = defineStore("survey", () => {
//     // State
//     const surveyState = reactive({
//         respondentInfo: {
//             fullNameTitle: "",
//             email: "",
//             age: null,
//             affiliation: "",
//             occupation: "",
//             lengthEmployment: ""
//         },
//         answers: {},
//         metadata: {
//             startedAt: null,
//             finishedAt: null
//         }
//     })

//     return {
//         surveyState
//     }
// })

import { defineStore } from "pinia"
import { reactive, watch } from "vue"

export const useSurvey = defineStore("survey", () => {
    // Load initial state from localStorage or use defaults
    const getInitialState = () => {
        const stored = localStorage.getItem('survey-state')
        if (stored) {
            try {
                return JSON.parse(stored)
            } catch (e) {
                console.error('Failed to parse stored survey state:', e)
            }
        }
        return {
            respondentInfo: {
                fullNameTitle: "",
                email: "",
                age: null,
                affiliation: "",
                occupation: "",
                lengthEmployment: ""
            },
            answers: {
                commitment: {
                    q1: null,
                    q2: null,
                    q3: null,
                    q4: null,
                    q5: null
                },
                bigData: {
                    q1: null,
                    q2: null,
                    q3: null,
                    q4: null,
                    q5: null
                },
                case1: {
                    q1: null,
                },
                case2: {
                    q1: null,
                    q2: null,
                    q3: null
                },
                case3: {
                    q1: null,
                },
                case4: {
                    q1: null,
                    q2: null,
                    q3: null
                },
                case5: {
                    q1: null,
                },
                case6: {
                    q1: null,
                    q2: null,
                    q3: null
                },
                case7: {
                    q1: null
                },
                case8: {
                    q1: null,
                    q2: null,
                    q3: null
                }
            },
            metadata: {
                startedAt: null,
                finishedAt: null
            }
        }
    }

    // State
    const surveyState = reactive(getInitialState())

    // Watch for changes and save to localStorage
    watch(
        surveyState,
        (newState) => {
            localStorage.setItem('survey-state', JSON.stringify(newState))
        },
        { deep: true }
    )

    // Method to start survey (call when user first enters)
    const startSurvey = () => {
        if (!surveyState.metadata.startedAt) {
            surveyState.metadata.startedAt = new Date().toISOString()
        }
    }

    // Method to finish survey (call on final submission)
    const finishSurvey = () => {
        surveyState.metadata.finishedAt = new Date().toISOString()
    }

    // Method to check if current session is already submitted
    const isSessionSubmitted = () => {
        return sessionStorage.getItem("surveySubmitted") === "true";
    }

    // Method to mark session as submitted
    const markSessionSubmitted = () => {
        sessionStorage.setItem("surveySubmitted", "true");
    }

    // Method to clear the survey data
    const clearSurvey = () => {
        surveyState.respondentInfo = {
            fullNameTitle: "",
            email: "",
            age: null,
            affiliation: "",
            occupation: "",
            lengthEmployment: ""
        }
        surveyState.answers = {
            commitment: {
                q1: null,
                q2: null,
                q3: null,
                q4: null,
                q5: null
            },
            bigData: {
                q1: null,
                q2: null,
                q3: null,
                q4: null,
                q5: null
            },
            case1: {
                q1: null,
            },
            case2: {
                q1: null,
                q2: null,
                q3: null
            },
            case3: {
                q1: null,
            },
            case4: {
                q1: null,
                q2: null,
                q3: null
            },
            case5: {
                q1: null,
            },
            case6: {
                q1: null,
                q2: null,
                q3: null
            },
            case7: {
                q1: null
            },
            case8: {
                q1: null,
                q2: null,
                q3: null
            }
        }
        surveyState.metadata = {
            startedAt: null,
            finishedAt: null
        }
        localStorage.removeItem('survey-state')
    }

    return {
        surveyState,
        startSurvey, 
        finishSurvey,
        clearSurvey,
        isSessionSubmitted,
        markSessionSubmitted
    }
})