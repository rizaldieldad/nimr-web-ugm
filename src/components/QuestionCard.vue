<script setup>
import { useSurvey } from '../stores/useSurvey'

const { surveyState } = useSurvey()
const props = defineProps({
    question: {
        type: Object,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    storeKey: {
        type: String,
        required: true
    },
    selectedAnswer: {
        type: Number,
        default: null
    }
})

const emit = defineEmits(['answer-selected'])

// Function to check if a value is selected
const isSelected = (value) => {
    return surveyState.answers[props.storeKey]?.[`q${props.question.id}`] === value
}

// Handle answer selection
const handleSelect = (value) => {
    emit('answer-selected', props.question.id, value)
}
</script>

<template>
    <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8 transition-all hover:shadow-xl">
        <!-- Question Header -->
        <div class="flex items-start gap-4 mb-6">
            <div
                class="shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-lg">
                {{ question.id }}
            </div>
            <p class="text-lg md:text-xl text-gray-800 italic flex-1 pt-1">
                {{ $t(`${topic}.question.q${question.id}`) }}
            </p>
        </div>

        <!-- Rating Scale -->
        <div class="flex justify-center items-center gap-3 md:gap-6">
            <button v-for="value in 5" :key="value" @click="handleSelect(value)" :class="[
                'w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center text-lg md:text-xl font-semibold transition-all duration-200 transform hover:scale-110',
                isSelected(value)
                    ? 'bg-indigo-500 border-indigo-500 text-white'
                    : 'bg-white border-gray-300 text-gray-600 hover:border-indigo-400 hover:bg-indigo-50'
            ]">
                {{ value }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>