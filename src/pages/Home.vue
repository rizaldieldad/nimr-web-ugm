<script setup>
import ChooseLanguage from "../components/ChooseLanguage.vue";
</script>

<template>
    <section
        class="w-full bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_primary.png')] bg-cover bg-center transition-all duration-500"
    >
        <div class="mx-auto max-w-5xl h-screen flex flex-col justify-between p-10 lg:p-20 text-center">
            <h1 class="text-4xl lg:text-6xl font-bold">HALLO!</h1>

            <p class="text-lg lg:text-4xl text-justify">
                {{ $t("greeting") }}
            </p>

            <div class="flex flex-col items-center gap-y-5">
                <p class="text-2xl tracking-widest">{{ $t("lang_selection") }}</p>
                <ChooseLanguage />
            </div>
        </div>      
    </section>
</template>

<style scoped></style>
