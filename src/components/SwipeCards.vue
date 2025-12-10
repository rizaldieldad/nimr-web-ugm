<script setup>
import { ref, computed, onMounted } from "vue";
import { useI18n } from "vue-i18n";
import NextButton from "../components/buttons/NextButton.vue";

const { t } = useI18n();

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const offset = ref(0)
const currentCardIndex = ref(0)
const isDescriptionOpen = ref(false)
const isCompleted = ref(false)

const props = defineProps({
    caseKey: {
        type: String,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
    surveyState: {
        type: Object,
        required: true
    },
    nextRoute: {
        type: String,
        required: true
    }
})

const toggleDescription = () => {
    isDescriptionOpen.value = !isDescriptionOpen.value
}

// Get current card
const currentCard = computed(() => props.cards[currentCardIndex.value])

// Get current card text based on locale
const currentCardText = computed(() => {
    return t(`${props.caseKey}.cards_text.${currentCard.value.key}`)
})

// Check if case is completed 
const checkIfCompleted = () => {
    const caseData = props.surveyState.answers[props.caseKey]
    const totalAnswered = caseData.sideA.length + caseData.sideB.length

    return totalAnswered === props.cards.length
}

// Reset case data if incomplete
const resetIfIncomplete = () => {
    const caseData = props.surveyState.answers[props.caseKey]
    const totalAnswered = caseData.sideA.length + caseData.sideB.length

    // If not all cards are answered, reset everything
    if (totalAnswered > 0 && totalAnswered < props.cards.length) {
        caseData.sideA = []
        caseData.sideB = []
        caseData.sideAScore = 0
        caseData.sideBScore = 0
    }
}

const handleTouchStart = (e) => {
    isDragging.value = true;
    startX.value = e.touches ? e.touches[0].clientX : e.clientX;
    currentX.value = startX.value;

    // Prevent scrolling on touch devices
    if (e.touches) {
        e.preventDefault();
    }
};

const handleTouchMove = (e) => {
    if (!isDragging.value) return;

    // Prevent default scrolling behavior
    e.preventDefault();

    currentX.value = e.touches ? e.touches[0].clientX : e.clientX;
    offset.value = currentX.value - startX.value;
};

const handleTouchEnd = (e) => {
    if (!isDragging.value) return;

    // Prevent default behavior
    if (e.cancelable) {
        e.preventDefault();
    }

    const swipeThreshold = 100;

    if (offset.value < -swipeThreshold) {
        // Swiped left - Choose A
        chooseOption('A');
    } else if (offset.value > swipeThreshold) {
        // Swiped right - Choose B
        chooseOption('B');
    } else {
        // Reset position
        offset.value = 0;
    }

    isDragging.value = false;
};

const chooseOption = (option) => {
    // Animate card out
    offset.value = option === 'A' ? -600 : 600;

    // Save the answer to state
    saveAnswer(option)

    calculateScores()

    setTimeout(() => {
        // Move to next card
        if (currentCardIndex.value < props.cards.length - 1) {
            currentCardIndex.value++;
        } else {
            // All cards completed
            isCompleted.value = true
            calculateScores()
        }

        // Reset card position
        offset.value = 0;
    }, 300);
};

const saveAnswer = (option) => {
    const card = currentCard.value
    const caseData = props.surveyState.answers[props.caseKey]

    if (option === 'A') {
        // Add to side A array
        caseData.sideA.push({
            cardKey: card.key,
            point: card.point
        })
    } else {
        // Add to side B array
        caseData.sideB.push({
            cardKey: card.key,
            point: card.point
        })
    }
}

const calculateScores = () => {
    const caseData = props.surveyState.answers[props.caseKey]

    caseData.sideAScore = caseData.sideA.reduce((sum, card) => sum + card.point, 0)
    caseData.sideBScore = caseData.sideB.reduce((sum, card) => sum + card.point, 0)
}

const getCardStyle = () => {
    const rotation = offset.value * 0.05;
    const opacity = 1 - Math.abs(offset.value) / 400;

    return {
        transform: `translateX(${offset.value}px) rotate(${rotation}deg)`,
        opacity: opacity,
        transition: isDragging.value ? 'none' : 'all 0.3s ease-out'
    };
};

const getOverlayStyle = (side) => {
    const isVisible = side === 'left' ? offset.value < -30 : offset.value > 30;
    const overlayOpacity = Math.min(Math.abs(offset.value) / 150, 1);

    return {
        opacity: isVisible ? overlayOpacity : 0,
        transition: isDragging.value ? 'none' : 'opacity 0.3s ease-out'
    };
};

onMounted(() => {
    // Check if completed on mount
    if (checkIfCompleted()) {
        isCompleted.value = true
        calculateScores()
    } else {
        // Reset if incomplete
        resetIfIncomplete()
        calculateScores()
    }
})
</script>

<template>
    <div class="max-w-3xl mx-auto min-h-screen flex flex-col justify-center  p-4 md:p-8 space-y-6">
        <!-- Page Header -->
        <div class="flex flex-col">
            <div class="flex items-center justify-between mb-4">
                <h1 class="text-3xl md:text-4xl font-bold text-indigo-600">
                    {{ t(`${caseKey}.title`) }}
                </h1>
                <button @click="toggleDescription"
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                    <svg :class="{ 'rotate-180': isDescriptionOpen }" class="w-5 h-5 transition-transform duration-300"
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                    <span>{{ isDescriptionOpen ? 'Hide' : 'Show' }} Case</span>
                </button>
            </div>

            <!-- Toggleable Case Description -->
            <Transition enter-active-class="transition-all duration-300 ease-out"
                leave-active-class="transition-all duration-300 ease-in" enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96" leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0">
                <div v-show="isDescriptionOpen" class="overflow-hidden">
                    <p
                        class="text-base lg:text-lg text-justify text-gray-600 leading-relaxed p-4 bg-indigo-50 rounded-lg">
                        {{ t(`${caseKey}.description`) }}
                    </p>
                </div>
            </Transition>
        </div>

        <!-- Progress Indicator -->
        <div v-if="!isCompleted" class="flex items-center justify-center space-x-2">
            <span class="text-sm text-gray-600">
                {{ currentCardIndex + 1 }} / {{ cards.length }}
            </span>
        </div>

        <!-- Completion Message & Results -->
        <div v-if="isCompleted" class="space-y-6">
            <!-- Completion Header -->
            <div class="text-center space-y-2">
                <div class="flex justify-center">
                    <svg class="w-16 h-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800"><span class="capitalize">{{ $t(`${caseKey}`) }}</span>
                    Completed!</h2>
            </div>

            <!-- Next Button -->
            <div class="flex justify-center pt-4">
                <NextButton :next-route="props.nextRoute" />
            </div>
        </div>

        <!-- Question Cards -->
        <div v-if="!isCompleted" class="relative overflow-hidden">
            <div :style="getCardStyle()" @touchstart.passive="handleTouchStart" @touchmove.prevent="handleTouchMove"
                @touchend.prevent="handleTouchEnd" @mousedown="handleTouchStart" @mousemove="handleTouchMove"
                @mouseup="handleTouchEnd" @mouseleave="handleTouchEnd"
                class="bg-amber-50 px-12 py-10 rounded-xl shadow-md shadow-slate-100 cursor-grab active:cursor-grabbing relative touch-none">
                <!-- Left Overlay (A) -->
                <div :style="getOverlayStyle('left')"
                    class="absolute inset-0 bg-green-300 rounded-xl flex items-center justify-center pointer-events-none">
                    <div class="text-6xl font-bold text-white">A</div>
                </div>

                <!-- Right Overlay (B) -->
                <div :style="getOverlayStyle('right')"
                    class="absolute inset-0 bg-red-300 rounded-xl flex items-center justify-center pointer-events-none">
                    <div class="text-6xl font-bold text-white">B</div>
                </div>

                <!-- Content -->
                <div class="relative z-10">
                    <h2 class="text-lg">
                        {{ currentCardText }}
                    </h2>
                </div>
            </div>
        </div>

        <!-- Buttons -->
        <div v-if="!isCompleted" class="flex justify-between mt-8 mb-4">
            <div class="flex flex-col items-center space-y-3">
                <button @click="chooseOption('A')"
                    class="w-12 h-12 rounded-full border border-gray-300 bg-green-300 flex items-center justify-center text-xl cursor-pointer hover:bg-green-400 active:scale-95 transition-all">
                    A
                </button>
                <p class="text-center text-slate-600 text-sm leading-tight">
                    {{ t('card_body.card_drop_a') }}
                </p>
            </div>

            <div class="flex flex-col items-center space-y-3">
                <button @click="chooseOption('B')"
                    class="w-12 h-12 rounded-full border border-gray-300 bg-red-300 flex items-center justify-center text-xl cursor-pointer hover:bg-red-400 active:scale-95 transition-all">
                    B
                </button>
                <p class="text-center text-slate-600 text-sm leading-tight">
                    {{ t('card_body.card_drop_b') }}
                </p>
            </div>
        </div>
    </div>
</template>