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
            <h1 class="text-5xl md:text-7xl font-bold uppercase text-indigo-600 mb-8">
                Game {{ props.caseNumber }}
            </h1>

            <div class="p-5 bg-blue-50 border-2 border-blue-400 rounded-xl shadow-md">
                <span class="block text-xl font-extrabold text-blue-700 text-center">⚠️ INSTRUCTION</span>
                
                <div>
                    <p class="text-base font-medium mt-4 mb-2">
                        {{ $t('game_instruction.first.title') }}
                    </p>
                    <ul class="list-disc px-6">
                        <li class="text-base italic">{{ $t("game_instruction.first.points.1") }}</li>
                        <li class="text-base italic">{{ $t("game_instruction.first.points.2") }}</li>
                    </ul>
                </div>

                <div>
                    <p class="text-base font-medium mt-4 mb-2">
                        {{ $t('game_instruction.second.title') }}
                    </p>
                    <ul class="list-disc px-6">
                        <li class="text-base italic">{{ $t("game_instruction.second.points.1") }}</li>
                        <li class="text-base italic">{{ $t("game_instruction.second.points.2") }}</li>
                    </ul>
                </div>
            </div>
        </div>
        <NextButton :next-route="nextRoute" mode="nav"/>
    </div>
</template>