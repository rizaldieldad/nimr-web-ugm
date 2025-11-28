<script setup></script>

<template>
    <!-- <section 
        class="w-full min-h-screen bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_survey.png')] bg-cover bg-center transition-all duration-500"
    >
        <router-view></router-view>
    </section> -->

    <section class="relative min-h-screen">
        <!-- Background Layer -->
        <div class="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_survey.png')]"></div>

        <!-- Content with consisten container -->
        <div class="relative z-10">
            <router-view></router-view>
        </div>
    </section>
</template>

<style scoped></style>