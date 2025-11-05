<script setup></script>

<template>
    <section
        class="w-full bg-[url('./src/assets/images/backgrounds/bg_secondary.png')] bg-cover bg-center"
    >
        <div class="max-w-6xl mx-auto flex items-center min-h-screen p-10">
            <div class="flex flex-col lg:flex-row items-center justify-center lg:gap-x-5">
                <p class="text-lg lg:text-4xl text-justify">
                    {{ $t("thank_you.not_participate") }}
                </p>
                <img
                    class="w-60 h-60 lg:w-100 lg:h-100 object-cover"
                    src="../assets/images/thankyou/thankyou1.png"
                    alt=""
                />
            </div>
        </div>   
    </section>
</template>

<style scoped></style>

<!-- <section
    class="mx-auto max-w-5xl flex items-center min-h-screen p-10 lg:p-20"
  >
    <div class="w-full flex flex-col items-center space-y-20">
      <img
        class="w-60 h-60 lg:w-80 lg:h-80 object-cover"
        src="../assets/images/thankyou1.png"
        alt=""
      />
      <p class="text-lg lg:text-3xl text-justify">
        {{ $t("thank_you.not_participate") }}
      </p>
    </div>
  </section> -->