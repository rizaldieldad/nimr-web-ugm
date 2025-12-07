<script setup>
import { useRouter } from "vue-router"

const router = useRouter();

const props = defineProps({
    nextRoute: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const handleNext = () => {
    if (!props.disabled) {
        setTimeout(() => {
            router.push(props.nextRoute);
        }, 500);
    }
}
</script>

<template>
    <div class="flex justify-center">
        <button
          @click="() => handleNext()"
          :disabled="disabled"
           :class="[
            'w-16 h-16 border-2 font-semibold rounded-full transition-all duration-200',
            disabled 
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' 
              : 'border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 cursor-pointer hover:scale-105 active:scale-90 active:bg-sky-600 active:text-white'
          ]"
        >
          {{ $t("buttons.next") }}
        </button>
      </div>
</template>

<style scoped></style>