<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleNext = () => router.push("#");
</script>

<template>
    <section class="w-full bg-[url('./src/assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./src/assets/images/backgrounds/bg_primary.png')] bg-cover bg-center transition-all duration-500">
        <div class="max-w-5xl mx-auto flex items-center justify-center min-h-screen p-10 lg:p-20">
            <div class="w-full justify-between space-y-10 lg:space-y-20">
      <h1 class="text-4xl lg:text-6xl font-bold text-center">
        {{ $t("explanation_consent.title") }}
      </h1>

      <ol start="3" class="list-decimal space-y-5 pl-5">
        <li class="text-md lg:text-3xl text-justify font-light">
          {{ $t("explanation_consent.point3") }}
        </li>
        <li class="text-md lg:text-3xl text-justify font-light">
          {{ $t("explanation_consent.point4") }}
        </li>
        <li class="text-md lg:text-3xl text-justify font-light">
          {{ $t("explanation_consent.point5") }}
        </li>
        <li class="text-md lg:text-3xl text-justify font-light">
          {{ $t("explanation_consent.point6") }}
        </li>
      </ol>

      <p class="text-center text-xl">
        {{ $t("explanation_consent.description") }}
      </p>

      <div class="flex flex-col lg:flex-row justify-center items-center gap-2">
        <RouterLink
          to="/not-participate"
          class="border border-sky-500 hover:bg-rose-300 hover:text-white px-5 py-2 rounded-full cursor-pointer"
        >
          {{ $t("buttons.disagree") }} ❌
        </RouterLink>
        <RouterLink
          to="/personal-data"
          class="border border-sky-500 hover:bg-green-300 hover:text-white px-5 py-2 rounded-full cursor-pointer"
        >
          {{ $t("buttons.agree") }} ✅
        </RouterLink>
      </div>
    </div>
        </div>
    </section>
</template>

<style scoped></style>