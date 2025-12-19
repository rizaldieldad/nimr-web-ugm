<script setup>
import NextButton from '../../../components/buttons/NextButton.vue';
</script>

<template>
    <div class="max-w-7xl mx-auto flex flex-col justify-center items-center h-screen p-10">
        <div class="w-full flex flex-col justify-center items-center lg:items-end lg:flex-row">
            <img
                class="w-60 h-60 lg:w-120 lg:h-120 object-cover lg:-mr-10 z-10" 
                src="../../../assets/images/instructions/instruction1.png"
                alt=""
            >
            <div class="flex items-center px-4 lg:mb-12">   
                <p class="text-lg lg:text-3xl p-9 border-2 border-pink-300 rounded-2xl"
                v-html="$t('questionnaire_hint')">
                </p>
            </div>
        </div>

        <NextButton class="my-10" next-route="/survey/commitment" mode="nav"/>
    </div>
</template>

<style scoped></style>