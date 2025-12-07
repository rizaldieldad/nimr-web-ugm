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
const autoScrollInterval = ref(null)

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
// =========== DOCUMENTATION =========== Yogis

// MARK: Drag and Drop Start

// For some browser the (e) parameter is not defined, so we need to check if it exists
const startDrag = (card, e) => {
    draggedCard.value = card
    if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = 'move'
        e.dataTransfer.setData('text/plain', card.key)
    }
}

const onDragEnd = () => {
    draggedCard.value = null
    stopAutoScroll()
}

const onDragOver = (e) => {
    e.preventDefault()
    if (e.dataTransfer) {
        e.dataTransfer.dropEffect = 'move'
    }
    handleAutoScroll(e)
}

const dropCard = (target, e) => {
    if (e) {
        e.preventDefault()
    }
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

    // Stop auto-scrolling
    stopAutoScroll()
}

// =========== DOCUMENTATION =========== Yogis
// Drag and drop for mobile/touch
// This touch is for mobile devices
// The touchStartY and touchStartX are used to calculate the distance between the touch start and the touch end

// Data ref for touch X and Y
const touchStartY = ref(0)
const touchStartX = ref(0)

// Where the touch started
const touchStart = (card, e) => {
    e.preventDefault()
    draggedCard.value = card
    const touch = e.touches[0]
    touchStartX.value = touch.clientX
    touchStartY.value = touch.clientY
    e.target.style.opacity = '0.5'
}

// When the touch moves
const touchMove = (e) => {
    if (!draggedCard.value) return
    e.preventDefault()
}

// Whene user drop/release their touch from card
const touchEnd = (e) => {
    if (!draggedCard.value) return
    
    const touch = e.changedTouches[0]
    const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY)
    
    if (e.target) {
        e.target.style.opacity = '1'
    }
    
    if (!dropTarget) {
        draggedCard.value = null
        return
    }
    
    const dropZone = dropTarget.closest('[data-drop-zone]')
    if (dropZone) {
        const zone = dropZone.getAttribute('data-drop-zone')
        dropCard(zone)
    } else {
        draggedCard.value = null
    }
}

// MARK: Drag and Drop End
// =========== DOCUMENTATION =========== Yogis

const handleAutoScroll = (e) => {
    const threshold = 100;
    const speed = 10;
    const viewportHeight = window.innerHeight;

    if (e.clientY < threshold) {
        startAutoScroll(-speed);
    } else if (e.clientY > viewportHeight - threshold) {
        startAutoScroll(speed);
    } else {
        stopAutoScroll();
    }
}

const startAutoScroll = (speed) => {
    if (autoScrollInterval.value) return // already scrolling

    autoScrollInterval.value = setInterval(() => {
        window.scrollBy(0, speed);
    }, 20);
}

const stopAutoScroll = () => {
    if (autoScrollInterval.value) {
        clearInterval(autoScrollInterval.value)
        autoScrollInterval.value = null
    }
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
                <div data-drop-zone="A" class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[800px]" 
                    @dragover="onDragOver" @drop.prevent="dropCard('A', $event)">
                    <h2 class="text-7xl font-bold mb-4">A</h2>
                    <p class="text-sm -mt-3 mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" :key="card.key"
                        class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true"
                        @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>

                <!-- Cards Section -->
                <div data-drop-zone="center" class="bg-sky-50 rounded-md p-4 min-h-[200px]" 
                    @dragover="onDragOver" @drop.prevent="dropCard('center', $event)">
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been placed
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" :key="card.key"
                            class="min-h-24 p-3 bg-white shadow rounded text-center cursor-move flex items-center justify-center hover:shadow-lg transition-shadow"
                            draggable="true" @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
                            <span class="text-sm leading-tight">
                                {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Side B -->
                <div data-drop-zone="B" class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[800px]" 
                    @dragover="onDragOver" @drop.prevent="dropCard('B', $event)">
                    <h2 class="text-7xl font-bold mb-4">B</h2>
                    <p class="text-sm -mt-3 mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" :key="card.key"
                        class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true"
                        @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="lg:hidden space-y-6">
                <!-- Side A -->
                <div data-drop-zone="A" class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[300px]" @dragover="onDragOver"
                    @drop.prevent="dropCard('A', $event)">
                    <h2 class="text-5xl font-bold mb-2">A</h2>
                    <p class="text-xs mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" :key="card.key"
                        class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true"
                        @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>


                <!-- Cards Section -->
                <div data-drop-zone="center" class="bg-sky-50 rounded-md p-4 min-h-[200px]" @dragover="onDragOver"
                    @drop.prevent="dropCard('center', $event)">
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been sorted
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" :key="card.key"
                            class="p-3 bg-white shadow rounded text-center cursor-move hover:shadow-lg transition-shadow"
                            draggable="true" @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
                            {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                        </div>
                    </div>
                </div>

                <!-- Side B -->
                <div data-drop-zone="B" class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[300px]" @dragover="onDragOver"
                    @drop.prevent="dropCard('B', $event)">
                    <h2 class="text-5xl font-bold mb-2">B</h2>
                    <p class="text-xs mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" :key="card.key"
                        class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" draggable="true"
                        @dragstart="startDrag(card, $event)" @dragend="onDragEnd" @touchstart="touchStart(card, $event)" @touchmove="touchMove" @touchend="touchEnd">
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
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    touch-action: none;
}


.cursor-move:active {
    cursor: grabbing;
}
</style>