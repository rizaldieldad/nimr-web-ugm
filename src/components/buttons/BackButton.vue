<script setup>
import { useRouter } from "vue-router"

const router = useRouter();

const props = defineProps({
    backRoute: {
        type: String,
        required: true
    }
})

const handleBack = () => {
    router.push(props.backRoute);
}
</script>

<template>
    <div class="flex">
        <button
          @click="() => handleBack()"
          class="w-16 h-16 bg-rose-400 text-white font-semibold rounded-full transition-colors cursor-pointer"
        >
          {{ $t("buttons.back") }}
        </button>
      </div>
</template>

<style scoped></style>