<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { useSurvey } from "../../../stores/useSurvey"

const router = useRouter()
const { surveyState, finishSurvey } = useSurvey()

// Loading and error states
const isSubmitting = ref(false)
const submitError = ref(null)
const submitSuccess = ref(false)

// Google Apps Script Web App 
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxm-Cy4PwLJXTHEQNkih5gzajTkaiBq6qyP_gSmT_j7vm2ZJ-9Skw-QF_u-rum-sX9i/exec'

// Initialize case8 page2 answers if not exists
if (!surveyState.answers["case8"]) {
    surveyState.answers.case8 = {
        q3: null
    }
}

// Function to handle answer selection
const selectAnswer = (questionNumber, value) => {
    surveyState.answers.case8[`q${questionNumber}`] = value
}

// Function to check if a value is selected
const isSelected = (questionNumber, value) => {
    return surveyState.answers.case8[`q${questionNumber}`] === value
}

// Function to submit data to Google Sheets
const submitToGoogleSheets = async () => {
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
        
        console.log('Survey data submitted successfully!')
        
        // Optional: Clear the survey data after successful submission
        // clearSurvey()
        
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

// Handle final submission
const handleFinish = async () => {
    // Mark survey as finished
    finishSurvey()
    
    // Submit to Google Sheets
    await submitToGoogleSheets()
}
</script>

<template>
    <div class="max-w-4xl mx-auto flex flex-col justify-center min-h-screen p-4 md:p-8 space-y-6">

      <!-- Question 1 -->
      <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
        <!-- Question Header -->
        <div class="flex items-start gap-4 mb-6">
          <div
            class="shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            1
          </div>
          <p class="text-lg md:text-xl text-gray-800 italic flex-1 pt-1">
            {{ $t('case8.questions.q3') }}
          </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
           <button 
              @click="selectAnswer(3, 'no')"
              :class="[
                'px-12 py-2 border font-bold rounded-full cursor-pointer transition-all',
                isSelected(3, 'no')
                  ? 'bg-pink-300 border-pink-300 text-white'
                  : 'border-pink-300 hover:bg-pink-300 text-gray-700'
              ]"
              :disabled="isSubmitting"
            >
              {{ $t('buttons.no') }}
            </button>
            <button 
              @click="selectAnswer(3, 'yes')"
              :class="[
                'px-12 py-2 border font-bold rounded-full cursor-pointer transition-all',
                isSelected(3, 'yes')
                  ? 'bg-pink-300 border-pink-300 text-white'
                  : 'border-pink-300 hover:bg-pink-300 text-gray-700'
              ]"
              :disabled="isSubmitting"
            >
              {{ $t('buttons.yes') }}
            </button>
        </div>
      </div>

      <!-- Error Message -->
      <div v-if="submitError" class="bg-red-50 border-2 border-red-300 rounded-2xl p-4">
        <p class="text-red-700 font-semibold">{{ submitError }}</p>
      </div>

      <!-- Success Message -->
      <div v-if="submitSuccess" class="bg-green-50 border-2 border-green-300 rounded-2xl p-4">
        <p class="text-green-700 font-semibold">✓ Survey submitted successfully! Redirecting...</p>
      </div>

      <!-- Finish Button -->
      <div class="flex justify-end">
        <button
          @click="handleFinish"
          :disabled="isSubmitting"
          :class="[
            'px-8 py-3 font-bold rounded-full transition-all transform shadow-lg',
            isSubmitting 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 hover:scale-105 text-white'
          ]"
        >
          <span v-if="isSubmitting">
            <svg class="animate-spin inline-block w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
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

<style scoped></style>