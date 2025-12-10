<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
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
const history = ref([]) // Track decision history for undo
const isSoundEnabled = ref(true)

// Audio context for sound effects
let audioContext = null;

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

// Initialize audio context
const initAudio = () => {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// Play swipe sound
const playSwipeSound = (option) => {
    if (!isSoundEnabled.value) return;

    try {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Different frequencies for A and B
        oscillator.frequency.value = option === 'A' ? 523.25 : 392.00; // C5 for A, G4 for B
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.warn('Audio playback failed:', error);
    }
}

// Play completion sound
const playCompletionSound = () => {
    if (!isSoundEnabled.value) return;

    try {
        initAudio();
        const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 - major chord

        notes.forEach((freq, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = freq;
            oscillator.type = 'sine';

            const startTime = audioContext.currentTime + (index * 0.1);
            gainNode.gain.setValueAtTime(0.2, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

            oscillator.start(startTime);
            oscillator.stop(startTime + 0.5);
        });
    } catch (error) {
        console.warn('Audio playback failed:', error);
    }
}

// Play undo sound
const playUndoSound = () => {
    if (!isSoundEnabled.value) return;

    try {
        initAudio();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 440; // A4
        oscillator.type = 'triangle';

        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (error) {
        console.warn('Audio playback failed:', error);
    }
}

// Toggle sound
const toggleSound = () => {
    isSoundEnabled.value = !isSoundEnabled.value
}

const toggleDescription = () => {
    isDescriptionOpen.value = !isDescriptionOpen.value
}

// Get current card
const currentCard = computed(() => props.cards[currentCardIndex.value])

// Get current card text based on locale
const currentCardText = computed(() => {
    return t(`${props.caseKey}.cards_text.${currentCard.value.key}`)
})

// Check if undo is available
const canUndo = computed(() => history.value.length > 0 && !isCompleted.value)

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
        history.value = []
    }
}

const handleTouchStart = (e) => {
    isDragging.value = true;
    startX.value = e.touches ? e.touches[0].clientX : e.clientX;
    currentX.value = startX.value;
};

const handleTouchMove = (e) => {
    if (!isDragging.value) return;

    currentX.value = e.touches ? e.touches[0].clientX : e.clientX;
    offset.value = currentX.value - startX.value;
};

const handleTouchEnd = (e) => {
    if (!isDragging.value) return;

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
    // Play swipe sound
    playSwipeSound(option);

    // Animate card out
    offset.value = option === 'A' ? -600 : 600;

    // Save the answer to state
    saveAnswer(option)

    calculateScores()

    history.value.push({
        cardIndex: currentCardIndex.value,
        option: option,
        card: currentCard.value
    })

    setTimeout(() => {
        // Move to next card
        if (currentCardIndex.value < props.cards.length - 1) {
            currentCardIndex.value++;
        } else {
            // All cards completed
            isCompleted.value = true
            calculateScores()
            playCompletionSound()
        }

        // Reset card position
        offset.value = 0;
    }, 300);
};

const undoLastChoice = () => {
    if (!canUndo.value) return;

    playUndoSound();

    // Get last decision
    const lastDecision = history.value.pop()

    // Remove from state
    const caseData = props.surveyState.answers[props.caseKey]

    if (lastDecision.option === 'A') {
        caseData.sideA.pop()
    } else {
        caseData.sideB.pop()
    }

    // Recalculate scores
    calculateScores()

    // Go back to that card
    currentCardIndex.value = lastDecision.cardIndex
    offset.value = 0
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

const handleKeydown = (e) => {
    if (isCompleted.value) return;

    if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        chooseOption('A');
    } else if (e.key === 'ArrowRight' || e.key === 'b' || e.key === 'B') {
        e.preventDefault();
        chooseOption('B');
    } else if ((e.key === 'z' || e.key === 'Z') && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        undoLastChoice();
    }
}

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

    // Add global listeners
    document.addEventListener('keydown', handleKeydown);
})

onUnmounted(() => {
    // Clean up audio context
    if (audioContext) {
        audioContext.close();
    }

    // Remove global listeners
    document.removeEventListener('keydown', handleKeydown);
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
                <div class="flex items-center gap-2">
                    <!-- Sound Toggle -->
                    <button @click="toggleSound"
                        class="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer"
                        :class="isSoundEnabled ? 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100' : 'text-gray-400 bg-gray-50 hover:bg-gray-100'"
                        :aria-label="isSoundEnabled ? 'Mute sounds' : 'Unmute sounds'">
                        <svg v-if="isSoundEnabled" class="w-5 h-5" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                    </button>


                    <button @click="toggleDescription"
                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer">
                        <svg :class="{ 'rotate-180': isDescriptionOpen }"
                            class="w-5 h-5 transition-transform duration-300" fill="none" stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                        <span>{{ isDescriptionOpen ? 'Hide' : 'Show' }} Case</span>
                    </button>
                </div>
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

        <!-- Progress Indicator & Undo Button -->
        <div v-if="!isCompleted" class="flex items-center justify-center space-x-4">
            <span class="text-sm text-gray-600" role="status" aria-live="polite">
                Card {{ currentCardIndex + 1 }} of {{ cards.length }}
            </span>

            <!-- Undo Button -->
            <button @click="undoLastChoice" :disabled="!canUndo"
                class="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition-all" :class="canUndo
                    ? 'text-orange-600 bg-orange-50 hover:bg-orange-100 active:scale-95'
                    : 'text-gray-300 bg-gray-50 cursor-not-allowed'"
                :aria-label="canUndo ? 'Undo last choice' : 'No actions to undo'">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                </svg>
                <span>Undo</span>
            </button>
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
                <h2 class="text-2xl font-bold text-gray-800">Case {{ caseKey.substring(4) }} Completed!</h2>
            </div>

            <!-- Next Button -->
            <div class="flex justify-center pt-4">
                <NextButton :next-route="props.nextRoute" />
            </div>
        </div>

        <!-- Question Cards -->
        <div v-if="!isCompleted" class="relative overflow-hidden">
            <div :style="getCardStyle()" @touchstart.prevent="handleTouchStart" @touchmove.prevent="handleTouchMove"
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
                    class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black bg-green-300 font-bold flex items-center justify-center text-xl cursor-pointer hover:bg-green-400 active:scale-95 transition-all">
                    A
                </button>
                <p class="text-center text-slate-600 text-sm leading-tight">
                    {{ t('card_body.card_drop_a') }}
                </p>
            </div>

            <div class="flex flex-col items-center space-y-3">
                <button @click="chooseOption('B')"
                    class="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-black bg-red-300 font-bold flex items-center justify-center text-xl cursor-pointer hover:bg-red-400 active:scale-95 transition-all">
                    B
                </button>
                <p class="text-center text-slate-600 text-sm leading-tight">
                    {{ t('card_body.card_drop_b') }}
                </p>
            </div>
        </div>
    </div>
</template>