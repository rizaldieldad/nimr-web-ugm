<script setup>
import NextButton from '../../../components/buttons/NextButton.vue';
</script>

<template>
    <div class="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10">
        <div class="w-full max-w-6xl mx-auto">
            <!-- Main Content Card -->
            <div class="bg-white rounded-3xl border-2 border-pink-300 p-6 sm:p-8 lg:p-12 shadow-sm">
                <div class="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                    <!-- Image Container -->
                    <div class="shrink-0 w-48 h-48 sm:w-56 sm:h-56 lg:w-72 lg:h-72">
                        <img
                            class="w-full h-full object-contain" 
                            src="../../../assets/images/instructions/instruction1.png"
                            alt=""
                        >
                    </div>
                    
                    <!-- Text Content -->
                    <div class="flex-1 flex flex-col justify-center">
                        <div 
                            class="text-base lg:text-3xl leading-relaxed text-gray-700"
                            v-html="$t('case_hint.description')"
                        ></div>
                    </div>
                </div>
            </div>

            <!-- Note Section -->
            <div class="mt-6 lg:mt-8 px-4 sm:px-8 lg:px-12">
                <p class="text-sm lg:text-base italic text-gray-600 text-center lg:text-right">
                    {{ $t('case_hint.note') }}
                </p>
            </div>

            <!-- Next Button -->
            <div class="flex justify-center lg:justify-end mt-8 lg:mt-12 px-4">
                <NextButton next-route="/survey/case1"/>
            </div>
        </div>
    </div>
</template>

<style scoped></style>