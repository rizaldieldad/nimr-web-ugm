<script setup>
import { useRouter } from "vue-router"

const router = useRouter();

const handleNext = () => {
    router.push("/survey/comitment");
}
</script>

<template>
    <div class="max-w-7xl mx-auto flex flex-col justify-center items-center h-screen p-10">
        <div class="w-full flex flex-col justify-center items-center lg:items-end lg:flex-row">
            <img
                class="w-60 h-60 lg:w-120 lg:h-120 object-cover lg:-mr-10 z-10" 
                src="../../assets/images/instructions/instruction1.png"
                alt=""
            >
            <div class="flex items-center px-4 lg:mb-12">   
                <p class="text-lg lg:text-3xl p-9 border-2 border-pink-300 rounded-2xl"
                v-html="$t('questionnaire_hint')">
                </p>
            </div>
        </div>

        <div class="flex justify-center my-10">
            <button
                @click="() => handleNext()"
                class="w-16 h-16 border-2 border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 font-semibold rounded-full transition-colors cursor-pointer"
            >
                {{ $t("buttons.next") }}
            </button>
        </div>
    </div>
</template>

<style scoped></style>