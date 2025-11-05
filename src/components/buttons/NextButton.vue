<script setup>
import { useRouter } from "vue-router"

const router = useRouter();

const props = defineProps({
    nextRoute: {
        type: String,
        required: true
    }
})

const handleNext = () => {
    router.push(props.nextRoute);
}
</script>

<template>
    <div class="flex justify-center">
        <button
          @click="() => handleNext()"
          class="w-16 h-16 border-2 border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 font-semibold rounded-full transition-colors cursor-pointer"
        >
          {{ $t("buttons.next") }}
        </button>
      </div>
</template>

<style scoped></style>