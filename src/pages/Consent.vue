<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const loadingAction = ref("");

const handleDecline = () => {
    // Set decline flag in sessionStorage
    loadingAction.value = "decline";
    sessionStorage.setItem("userDeclined", "true");
    sessionStorage.removeItem("userConsent");

    // Redirect to declined route
    setTimeout(() => {
        router.push("/not-participate");
    }, 500);
}

const handleAgree = () => {
    // Set consent flag in sessionStorage
    loadingAction.value = "agree";
    sessionStorage.setItem("userConsent", "true");
    sessionStorage.removeItem("userDeclined");

    // Redirect to personal data
    setTimeout(() => {
        router.push("/personal-data");
    }, 500);
    
}
</script>

<template>
    <section class="w-full bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_primary.png')] bg-cover bg-center transition-all duration-500">
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
        <!-- <RouterLink
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
        </RouterLink> -->
        <button
            @click="handleDecline"
            :disabled="loadingAction !== ''"
            :class="[
                'border border-sky-500 px-5 py-2 rounded-full font-semibold min-w-[140px]',
                'transition-all duration-200 ease-in-out flex items-center justify-center',
                loadingAction === 'decline'
                    ? 'bg-sky-50 text-sky-300 scale-95 cursor-wait' 
                    : loadingAction !== '' 
                        ? 'opacity-50 cursor-not-allowed' // Dim if the OTHER button is clicked
                        : 'hover:bg-rose-300 hover:text-white cursor-pointer active:scale-90 active:bg-rose-400'
            ]"
        >
            <svg v-if="loadingAction === 'decline'" class="animate-spin h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>
                {{ $t("buttons.disagree") }} ❌
            </span>
        </button>
        <button
            @click="handleAgree"
            :disabled="loadingAction !== ''"
            :class="[
                'border border-sky-500 px-5 py-2 rounded-full font-semibold min-w-[140px]',
                'transition-all duration-200 ease-in-out flex items-center justify-center',
                loadingAction === 'agree'
                    ? 'bg-sky-50 text-sky-300 scale-95 cursor-wait' 
                    : loadingAction !== '' 
                        ? 'opacity-50 cursor-not-allowed' // Dim if the OTHER button is clicked
                        : 'hover:bg-green-300 hover:text-white cursor-pointer active:scale-90 active:bg-green-400'
            ]"
        >
            <svg v-if="loadingAction === 'agree'" class="animate-spin h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span v-else>
                {{ $t("buttons.agree") }} ✅
            </span>
        </button>
      </div>
    </div>
        </div>
    </section>
</template>

<style scoped></style>