<script setup>
import QuestionCard from '../../../components/QuestionCard.vue';
import { useSurvey } from "../../../stores/useSurvey"
import { ref, computed } from "vue"
import { useRouter } from "vue-router"

const { surveyState, finishSurvey, clearSurvey, isSessionSubmitted, markSessionSubmitted } = useSurvey()
const router = useRouter()

// Loading and error states
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

// Google Apps Script Web App 
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw8fRg43vKeHERRUVIPMc9qaMy9KICil0P3yeYAJu194PuwOCjq53Fr00dqcXWYpn_k/exec'

// Define questions
const questions = [{id: 4}, {id: 5}, {id: 6}]

// Initialize big data answers if not exists
if (!surveyState.answers.bigData) {
    surveyState.answers.bigData = {
        q4: null,
        q5: null,
        q6: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionId, answer) => {
    surveyState.answers.bigData[`q${questionId}`] = answer
}

// Computed property to check if all questions are answered
const isFinishDisabled = computed(() => {
    return surveyState.answers.bigData.q4 === null || surveyState.answers.bigData.q5 === null || surveyState.answers.bigData.q6 === null || isSubmitting.value
})

// Function to submit data to Google Sheets
const submitToGoogleSheets = async () => {
    // Check if already submitted
    if (isSessionSubmitted()) {
        console.log('Survey already submitted in this browser session.')
        router.push("/survey/thankyou")
        return
    }

    isSubmitting.value = true
    submitError.value = null

    try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for Google Apps Script
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(surveyState)
        })

        // Note: With no-cors mode, we can't read the response
        // We assume success if no error is thrown
        submitSuccess.value = true

        // Mark session as submitted
        markSessionSubmitted()

        console.log('Survey data submitted successfully!')

        // Clear the survey data after successful submission
        clearSurvey()

        // Navigate to success page or show message
        setTimeout(() => {
            router.push('/survey/thankyou')
        }, 1500)

    } catch (error) {
        console.error('Error submitting to Google Sheets:', error)
        submitError.value = 'Failed to submit survey. Please try again.'
        isSubmitting.value = false
    }
}

// Function for handle submission
const handleFinish = async () => {
    // Check again before submission
    if (isSessionSubmitted()) {
        router.push("/survey/thankyou")
        return
    }

    // Mark survey as finished
    finishSurvey()

    // Submit to Google Sheets
    submitToGoogleSheets()
}
</script>

<template>
    <div class="max-w-4xl mx-auto p-4 md:p-8 space-y-6">
        <!-- Header -->
        <div class="mb-8 md:mb-12">
            <h1 class="text-3xl md:text-4xl font-bold text-indigo-600 mb-2 flex items-center">
                <span class="mr-3 text-indigo-400">◄</span>
                    {{ $t('big_data.title') }}
                <span class="ml-auto text-indigo-300">◆</span>
            </h1>
        </div>

        <!-- Question 4 to 6 -->
        <QuestionCard v-for="question in questions" :key="questions.id" :question="question" topic="big_data" store-key="bigData" @answer-selected="selectAnswer"/>

        <!-- Finish Button -->
        <div class="flex justify-end">
            <button @click="handleFinish" :disabled="isFinishDisabled" :class="[
                'px-8 py-3 font-bold rounded-full transition-all transform shadow-lg',
                isFinishDisabled
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-500 hover:bg-green-600 hover:scale-105 text-white'
            ]">
                <span v-if="isSubmitting">
                    <svg class="animate-spin inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                    </svg>
                    Submitting...
                </span>
                <span v-else>
                    {{ $t('buttons.finish') || 'Finish Survey' }} ✓
                </span>
            </button>
        </div>
    </div>
</template>