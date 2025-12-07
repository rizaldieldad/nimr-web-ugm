<script setup>
import NextButton from "../../../components/buttons/NextButton.vue";
</script>

<template>
    <div class="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 lg:p-10">
        <div class="max-w-6xl mx-auto w-full">
            <!-- Content -->
            <p class="text-base md:text-lg lg:text-3xl text-center mb-8">{{ $t("simulation_hint.p1") }}</p>
            <p class="text-base md:text-lg lg:text-3xl text-center mb-4">{{ $t("simulation_hint.p2") }}</p>

            <!-- Next Button -->
            <div class="flex justify-center lg:justify-end mt-8 lg:mt-12 px-4">
                <NextButton next-route="/survey/case1" mode="nav"/>
            </div>
        </div>
    </div>
</template>