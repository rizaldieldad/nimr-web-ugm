import { defineStore } from "pinia"
import { reactive, watch } from "vue"

export const useSurvey = defineStore("survey", () => {
    // Define the current version of your data structure
    const CURRENT_VERSION = "2.1.1"

    // Function to validate if the stored data has the correct structure
    const isValidStructure = (data) => {
        // Check if version exists and matches
        if (data.version !== CURRENT_VERSION) {
            return false
        }

        // Check if all required top-level properties exist
        if (!data.respondentInfo || !data.answers || !data.metadata) {
            return false
        }

        // Check if answers object has all required case structures
        const requiredCases = ['commitment', 'customerIdentification', 'customerInternalization', 'customerCompliance', 'bigData', 'case1', 'case2', 'case3', 'case4']
        for (const caseKey of requiredCases) {
            if (!data.answers[caseKey]) {
                return false
            }
        }

        return true
    }

    // Function to clear old data and reset everything
    const clearOldData = () => {
        console.log('Detected old data structure. Clearing all storage...')

        // Clear localStorage
        localStorage.removeItem('survey-state')

        // Clear all sessionStorage items
        sessionStorage.removeItem('userDeclined')
        sessionStorage.removeItem('userConsent')
        sessionStorage.removeItem('surveySubmitted')

        console.log('Old data cleared successfully')
    }

    // Load initial state from localStorage or use defaults
    const getInitialState = () => {
        const stored = localStorage.getItem('survey-state')

        if (stored) {
            try {
                const parsedData = JSON.parse(stored)

                // Validate the structure
                if (!isValidStructure(parsedData)) {
                    clearOldData()
                    // Return default state after clearing
                    return getDefaultState()
                }

                // If valid, return the stored data
                return parsedData
            } catch (e) {
                console.error('Failed to parse stored survey state:', e)
                clearOldData()
                return getDefaultState()
            }
        }

        return getDefaultState()
    }

    // Separate function for default state to avoid duplication
    const getDefaultState = () => {
        return {
            version: CURRENT_VERSION, // Add version to track structure changes
            respondentInfo: {
                fullNameTitle: "",
                email: "",
                age: null,
                gender: "",
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
                customerIdentification: {
                    q1: null,
                    q2: null,
                    q3: null,
                    q4: null,
                    q5: null
                },
                customerInternalization: {
                    q1: null,
                    q2: null,
                },
                customerCompliance: {
                    q1: null,
                    q2: null,
                },
                bigData: {
                    q1: null,
                    q2: null,
                    q3: null,
                    q4: null,
                    q5: null,
                    q6: null
                },
                case1: {
                    sideA: [],
                    sideB: [],
                    sideAScore: 0,
                    sideBScore: 0
                },
                case2: {
                    sideA: [],
                    sideB: [],
                    sideAScore: 0,
                    sideBScore: 0
                },
                case3: {
                    sideA: [],
                    sideB: [],
                    sideAScore: 0,
                    sideBScore: 0
                },
                case4: {
                    sideA: [],
                    sideB: [],
                    sideAScore: 0,
                    sideBScore: 0
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
        Object.assign(surveyState, getDefaultState())
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