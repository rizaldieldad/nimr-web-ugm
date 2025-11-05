<script setup>
import ChooseLanguage from "../components/ChooseLanguage.vue";
</script>

<template>
    <section
        class="w-full bg-[url('./src/assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./src/assets/images/backgrounds/bg_primary.png')] bg-cover bg-center transition-all duration-500"
    >
        <div class="mx-auto max-w-5xl h-screen flex flex-col justify-between p-10 lg:p-20 text-center">
            <h1 class="text-4xl lg:text-6xl font-bold">HALLO!</h1>

            <p class="text-lg lg:text-4xl text-justify">
                Perkenalkan nama saya Esa Panganti, website ini dibuat sebagai bagian dari
                proses penelitian saya untuk melihat seberapa jauh urgensi penerapan
                Nationally Integrated Medical Records (NIMR) di Indonesia, partisipasi dan
                dukungan Anda sangat berarti bagi kelancaran dan keberhasilan penelitian
                ini.
            </p>

            <div class="flex flex-col items-center gap-y-5">
                <p class="text-2xl tracking-widest">Pemilihan Bahasa</p>
                <ChooseLanguage />
            </div>
        </div>      
    </section>
</template>

<style scoped></style>
