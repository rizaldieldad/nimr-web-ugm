<script setup></script>

<template>
    <section
        class="w-full bg-[url('./assets/images/backgrounds/bg_secondary.png')] bg-cover bg-center"
    >
        <div class="max-w-6xl mx-auto flex items-center min-h-screen p-10">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:gap-x-5">
                <img
                    class="w-60 h-60 lg:w-100 lg:h-100 mb-8 lg:mb-0 object-cover"
                    src="../assets/images/thankyou/thankyou2.png"
                    alt=""
                />
                <p class="text-2xl md:text-3xl lg:text-5xl text-[#8ca6e3] font-extrabold">
                    {{ $t("thank_you.participate") }}
                </p>
            </div>
        </div>   
    </section>
</template>

<style scoped></style>