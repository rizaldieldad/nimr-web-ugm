<script setup>
import { useRouter } from "vue-router"
import { ref, computed } from "vue" // Import ref

const router = useRouter();
const isLoading = ref(false); // Track loading state

const props = defineProps({
    nextRoute: {
        type: String,
        required: true
    },
    disabled: {
        type: Boolean,
        default: false
    },
    mode: {
        // This is for timeout navigation speed depending on which page (description/nav just need 200, and question need 500)
        type: String,
        default: 'nav',
        validator: (value) => ['nav', 'submit'].includes(value)
    }
})

const transitionDelay = computed(() => props.mode === 'submit' ? 500 : 200);

const handleNext = () => {
    if (!props.disabled && !isLoading.value) {
        isLoading.value = true; // Start loading
        
        // Wait 0.5s (500ms) to show animation before moving
        setTimeout(() => {
            router.push(props.nextRoute);
        }, transitionDelay.value);
    }
}
</script>

<template>
    <div class="flex justify-center">
        <button
          @click="handleNext"
          :disabled="disabled || isLoading"
           :class="[
            'w-16 h-16 border-2 font-semibold rounded-full transition-all duration-200 ease-in-out flex items-center justify-center',
            disabled 
              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed opacity-60' 
              : (isLoading && mode === 'submit') // Only show 'waiting' style if submitting
                 ? 'border-sky-500 bg-sky-50 text-sky-300 cursor-wait scale-95' 
                 : 'border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 cursor-pointer hover:scale-105 active:scale-90 active:bg-sky-600 active:text-white'
          ]"
        >
          <svg v-if="isLoading && mode === 'submit'" class="animate-spin h-6 w-6 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>

          <span v-else>{{ $t("buttons.next") }}</span>
        </button>
      </div>
</template>

<style scoped></style>