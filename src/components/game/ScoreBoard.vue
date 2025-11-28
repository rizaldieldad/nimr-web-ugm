<script setup>
import { computed } from "vue"
import { useSurvey } from "../../stores/useSurvey"
import NextButton from '../buttons/NextButton.vue';

const { surveyState } = useSurvey()
const props = defineProps({
    caseKey: {
        type: String,
        required: true
    },
    nextRoute: {
        type: String,
        required: true
    }
})

// Format scores to 3 decimal places
const formattedSideAScore = computed(() => {
    return surveyState.answers[props.caseKey].sideAScore.toFixed(3)
})

const formattedSideBScore = computed(() => {
    return surveyState.answers[props.caseKey].sideBScore.toFixed(3)
})

const result = () => {
    if (surveyState.answers[props.caseKey].sideAScore > surveyState.answers[props.caseKey].sideBScore) {
        return "a"
    } else if (surveyState.answers[props.caseKey].sideAScore < surveyState.answers[props.caseKey].sideBScore) {
        return "b"
    } else {
        return "balanced"
    }
}
</script>

<template>
    <div class="max-w-4xl mx-auto flex flex-col justify-center items-center min-h-screen p-4 md:p-8 space-y-8">
        <!-- Score Display -->
        <div class="w-full bg-white rounded-lg shadow-lg p-8 space-y-6">
            <h1 class="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">Your Score</h1>
            
            <div class="space-y-4">
                <!-- Side A Score -->
                <div 
                    :class="['relative flex justify-between items-center p-6 rounded-lg border-2 transition-all duration-300', result() === 'a' ? 'winner-card-pink' : 'bg-pink-100 border-pink-300 hover:shadow-md', result() === 'balanced' ? 'balanced-card-pink' : '']"
                >
                    <!-- Winner Badge -->
                    <div v-if="result() === 'a'" class="absolute -top-3 -right-3 bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-full shadow-lg">
                        👑 
                    </div>
                    <div>
                        <span class="text-xl font-semibold text-gray-700">A</span>
                        <p class="text-xs text-gray-500 mt-1">Re-elicited manually</p>
                    </div>
                    <span
                        :class="['text-3xl font-bold transition-all duration-300', result() === 'a' ? 'text-pink-700 scale-110' : 'text-pink-600']"
                    >
                        {{ formattedSideAScore }}
                    </span>
                </div>
                
                <!-- Side B Score -->
                <div 
                    :class="['relative flex justify-between items-center p-6 rounded-lg border-2 transition-all duration-300', result() === 'b' ? 'winner-card-teal' : 'bg-teal-100 border-teal-300 hover:shadow-md', result() === 'balanced' ? 'balanced-card-teal' : '']"
                >
                    <!-- Winner Badge -->
                    <div v-if="result() === 'b'" class="absolute -top-3 -right-3 bg-yellow-100 text-yellow-900 font-bold px-3 py-1 rounded-full shadow-lg">
                        👑 
                    </div>
                    <div>
                        <span class="text-xl font-semibold text-gray-700">B</span>
                        <p class="text-xs text-gray-500 mt-1">Automatically available</p>
                    </div>
                    <span
                        :class="['text-3xl font-bold transition-all duration-300', result() === 'b' ? 'text-teal-700 scale-110' : 'text-teal-600']"
                    >
                        {{ formattedSideBScore }}
                    </span>
                </div>

                <!-- Result based on scores -->
                <h3 class="font-bold text-lg text-gray-600">🔹 Based on your score:</h3>
                <p class="text-justify">{{ $t(`${props.caseKey}.results.${result()}`) }}</p>
            </div>
        </div>

        <!-- Next Button -->
        <div class="w-full flex justify-center">
            <NextButton :next-route="nextRoute" />
        </div>
    </div>
</template>

<style scoped>
/* 3D Winner Card - Pink */
.winner-card-pink {
    background: linear-gradient(145deg, #fce7f3, #fbcfe8);
    border-color: #ec4899;
    border-width: 3px;
    box-shadow: 
        0 10px 25px -5px rgba(236, 72, 153, 0.3),
        0 8px 10px -6px rgba(236, 72, 153, 0.2),
        inset 0 2px 4px rgba(255, 255, 255, 0.6);
    transform: scale(1.05) translateY(-8px);
    animation: float 3s ease-in-out infinite;
}

.winner-card-pink:hover {
    transform: scale(1.08) translateY(-10px);
    box-shadow: 
        0 15px 35px -5px rgba(236, 72, 153, 0.4),
        0 12px 15px -6px rgba(236, 72, 153, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.6);
}

/* 3D Winner Card - Teal */
.winner-card-teal {
    background: linear-gradient(145deg, #ccfbf1, #99f6e4);
    border-color: #14b8a6;
    border-width: 3px;
    box-shadow: 
        0 10px 25px -5px rgba(20, 184, 166, 0.3),
        0 8px 10px -6px rgba(20, 184, 166, 0.2),
        inset 0 2px 4px rgba(255, 255, 255, 0.6);
    transform: scale(1.05) translateY(-8px);
    animation: float 3s ease-in-out infinite;
}

.winner-card-teal:hover {
    transform: scale(1.08) translateY(-10px);
    box-shadow: 
        0 15px 35px -5px rgba(20, 184, 166, 0.4),
        0 12px 15px -6px rgba(20, 184, 166, 0.3),
        inset 0 2px 4px rgba(255, 255, 255, 0.6);
}

/* Balanced Cards - Both get subtle 3D effect */
.balanced-card-pink {
    background: linear-gradient(145deg, #fce7f3, #fbcfe8);
    border-color: #ec4899;
    box-shadow: 
        0 6px 15px -3px rgba(236, 72, 153, 0.2),
        inset 0 2px 4px rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
}

.balanced-card-teal {
    background: linear-gradient(145deg, #ccfbf1, #99f6e4);
    border-color: #14b8a6;
    box-shadow: 
        0 6px 15px -3px rgba(20, 184, 166, 0.2),
        inset 0 2px 4px rgba(255, 255, 255, 0.4);
    transform: translateY(-2px);
}

/* Float Animation */
@keyframes float {
    0%, 100% {
        transform: scale(1.05) translateY(-8px);
    }
    50% {
        transform: scale(1.05) translateY(-12px);
    }
}

/* Pulse Animation for Badge */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
        transform: scale(1);
    }
    50% {
        opacity: 0.8;
        transform: scale(1.05);
    }
}
</style>