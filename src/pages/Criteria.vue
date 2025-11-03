<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const handleNext = () => router.push("/");
</script>

<template>
  <section
    class="mx-auto max-w-5xl flex items-center justify-center h-screen p-10 lg:p-20"
  >
    <div class="w-full justify-between space-y-20">
      <h1 class="text-4xl lg:text-6xl font-bold text-center">
        {{ $t("participation_criteria.title") }}
      </h1>

      <ol class="list-decimal space-y-5 pl-5">
        <li class="text-lg lg:text-4xl text-justify font-light">
          {{ $t("participation_criteria.criteria1") }}
        </li>
        <li class="text-lg lg:text-4xl text-justify font-light">
          {{ $t("participation_criteria.criteria1") }}
        </li>
      </ol>

      <div class="flex justify-center">
        <button
          @click="() => handleNext()"
          class="w-16 h-16 border-2 border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 font-semibold rounded-full transition-colors cursor-pointer"
        >
          {{ $t("buttons.next") }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
