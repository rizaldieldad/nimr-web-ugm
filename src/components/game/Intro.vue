<script setup>
import NextButton from '../buttons/NextButton.vue';

const props = defineProps({
    caseNumber: {
        type: Number,
        required: true
    },
    nextRoute: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div class="max-w-6xl mx-auto flex flex-col justify-center items-center min-h-screen p-6 md:p-4">
        <div class="flex flex-col items-center mb-16">
            <h1 class="text-5xl md:text-7xl font-bold uppercase text-indigo-600 mb-2">
                Game {{ props.caseNumber }}
            </h1>
            <h3 class="text-xl md:text-3xl font-light text-indigo-600 mb-8">
                drag and drop
            </h3>

            <div class="p-5 bg-blue-50 border-2 border-blue-400 rounded-xl shadow-md">
                <span class="block text-xl font-extrabold text-blue-700 text-center">⚠️ INSTRUCTION</span>
                <p class="text-base font-medium mt-2 text-center italic">
                    {{ $t('game_instruction') }}
                </p>
            </div>
        </div>
        <NextButton :next-route="nextRoute"/>
    </div>
</template>