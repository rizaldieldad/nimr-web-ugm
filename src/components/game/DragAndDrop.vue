<script setup>
import { ref, onMounted, computed } from "vue"
import NextButton from "../buttons/NextButton.vue"
import BackButton from "../buttons/BackButton.vue"

const props = defineProps({
    caseKey: {
        type: String,
        required: true
    },
    cards: {
        type: Array,
        required: true
    },
    backRoute: {
        type: String,
        required: true
    },
    nextRoute: {
        type: String,
        required: true
    },
    surveyState: {
        type: Object,
        required: true
    },
    translationPrefix: {
        type: String,
        default: "cards_text"
    }
})

const draggedCard = ref(null)

// Computed properties to get cards for each area
const centerCards = computed(() => {
    const placedCards = [
        ...props.surveyState.answers[props.caseKey].sideA,
        ...props.surveyState.answers[props.caseKey].sideB
    ]

    return props.cards.filter(card => !placedCards.some(placed => placed.key === card.key))
})

const sideA = computed(() => props.surveyState.answers[props.caseKey].sideA)
const sideB = computed(() => props.surveyState.answers[props.caseKey].sideB)

// Drag and drop handlers
const startDrag = (card) => {
    draggedCard.value = card
}

const dropCard = (target) => {
    if (!draggedCard.value) return

    const card = draggedCard.value

    // Remove card from all areas first
    props.surveyState.answers[props.caseKey].sideA = props.surveyState.answers[props.caseKey].sideA.filter(c => c.key !== card.key)
    props.surveyState.answers[props.caseKey].sideB = props.surveyState.answers[props.caseKey].sideB.filter(c => c.key !== card.key)

    // Add card to target area
    if (target === "A") {
        props.surveyState.answers[props.caseKey].sideA.push(card)
    } else if (target === "B") {
        props.surveyState.answers[props.caseKey].sideB.push(card)
    }

    // Calculate scores
    calculateScores()

    draggedCard.value = null
}

const calculateScores = () => {
    props.surveyState.answers[props.caseKey].sideAScore = props.surveyState.answers[props.caseKey].sideA.reduce((sum, card) => sum + card.point, 0)
    props.surveyState.answers[props.caseKey].sideBScore = props.surveyState.answers[props.caseKey].sideB.reduce((sum, card) => sum + card.point, 0)
}

// Initialize scores on mount
onMounted(() => {
    calculateScores()
})
</script>

<template>
    <div class="max-w-7xl mx-auto flex flex-col justify-center items-center min-h-screen p-4 md:p-8 space-y-6">
        <!-- Navigation Buttons -->
        <div class="w-full flex justify-between items-center">
            <BackButton :back-route="backRoute" />
            <NextButton :next-route="nextRoute" :disabled="centerCards.length > 0" />
        </div>

        <!-- Game Area -->
        <div class="w-full">
            <!-- Desktop Layout -->
            <div class="hidden lg:grid lg:grid-cols-[300px_1fr_300px] gap-6 items-start">
                <!-- Side A -->
                <div class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[800px]" @drop="dropCard('A')" @dragover.prevent>
                    <h2 class="text-7xl font-bold mb-4">A</h2>
                    <p class="text-sm -mt-3 mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" :key="card.key" class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true" @dragstart="startDrag(card)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>

                <!-- Cards Section -->
                <div class="bg-sky-50 rounded-md p-4 min-h-[200px]" @drop="dropCard('center')" @dragover.prevent>
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been placed
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" :key="card.key" class="min-h-24 p-3 bg-white shadow rounded text-center cursor-move flex items-center justify-center hover:shadow-lg transition-shadow" draggable="true" @dragstart="startDrag(card)">
                            <span class="text-sm leading-tight">
                                {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Side B -->
                <div class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[800px]" @drop="dropCard('B')" @dragover.prevent>
                    <h2 class="text-7xl font-bold mb-4">B</h2>
                    <p class="text-sm -mt-3 mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" :key="card.key" class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true" @dragstart="startDrag(card)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="lg:hidden space-y-6">
                <!-- Side A -->
                <div class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[300px]" @drop="dropCard('A')" @dragover.prevent>
                    <h2 class="text-5xl font-bold mb-2">A</h2>
                    <p class="text-xs mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" :key="card.key" class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true" @dragstart="startDrag(card)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>

                
                <!-- Cards Section -->
                <div class="bg-sky-50 rounded-md p-4 min-h-[200px]" @drop="dropCard('center')" @dragover.prevent>
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been sorted
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" :key="card.key"
                            class="p-3 bg-white shadow rounded text-center cursor-move hover:shadow-lg transition-shadow"
                            draggable="true"
                            @dragstart="startDrag(card)"
                        >
                            {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                        </div>
                    </div>
                </div>
                
                <!-- Side B -->
                <div class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[300px]" @drop="dropCard('B')" @dragover.prevent>
                    <h2 class="text-5xl font-bold mb-2">B</h2>
                    <p class="text-xs mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" :key="card.key" class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true" @dragstart="startDrag(card)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>
            </div>  
        </div>
    </div>
</template>

<style scoped>
.cursor-move {
    cursor: move;
}

.cursor-move:active {
    cursor: grabbing;
}
</style>