<script setup>
import { ref, onMounted, computed, onUnmounted } from "vue"
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
const scrollInterval = ref(null)
const touchStartY = ref(0)
const currentTouchY = ref(0)

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

// Auto-scroll functionality for touch devices
const handleTouchMove = (e) => {
    if (!draggedCard.value) return
    
    // Prevent default scrolling behavior
    e.preventDefault()
    
    const touch = e.touches[0]
    const scrollThreshold = 80 // pixels from edge to trigger scroll
    const scrollSpeed = 15
    
    const viewportHeight = window.innerHeight
    const touchY = touch.clientY
    
    currentTouchY.value = touchY
    
    // Clear any existing scroll interval
    if (scrollInterval.value) {
        clearInterval(scrollInterval.value)
        scrollInterval.value = null
    }
    
    // Scroll down if near bottom
    if (touchY > viewportHeight - scrollThreshold) {
        scrollInterval.value = setInterval(() => {
            window.scrollBy({
                top: scrollSpeed,
                behavior: 'auto'
            })
        }, 20)
    }
    // Scroll up if near top
    else if (touchY < scrollThreshold) {
        scrollInterval.value = setInterval(() => {
            window.scrollBy({
                top: -scrollSpeed,
                behavior: 'auto'
            })
        }, 20)
    }
}

const stopAutoScroll = () => {
    if (scrollInterval.value) {
        clearInterval(scrollInterval.value)
        scrollInterval.value = null
    }
}

// Drag and drop handlers
const startDrag = (card, e) => {
    draggedCard.value = card
    
    // For touch events, add touch move listener
    if (e.type === 'touchstart') {
        touchStartY.value = e.touches[0].clientY
        document.addEventListener('touchmove', handleTouchMove, { passive: false })
        document.addEventListener('touchend', handleTouchEnd)
    }
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
    stopAutoScroll()
    
    // Clean up touch listeners
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
}

// Touch-specific handlers for drop zones
const handleTouchEnd = (e) => {
    if (!draggedCard.value) return
    
    const touch = e.changedTouches[0]
    const element = document.elementFromPoint(touch.clientX, touch.clientY)
    
    // Check if the touch ended on a drop zone
    const dropZone = element?.closest('[data-drop-zone]')
    if (dropZone) {
        const dropTarget = dropZone.getAttribute('data-drop-zone')
        dropCard(dropTarget)
    } else {
        // Cancel the drag if not dropped on a valid zone
        draggedCard.value = null
        stopAutoScroll()
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
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

// Cleanup on unmount
onUnmounted(() => {
    stopAutoScroll()
    document.removeEventListener('touchmove', handleTouchMove)
    document.removeEventListener('touchend', handleTouchEnd)
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
                <div class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[800px]" 
                     data-drop-zone="A"
                     @drop="dropCard('A')" 
                     @dragover.prevent>
                    <h2 class="text-7xl font-bold mb-4">A</h2>
                    <p class="text-sm -mt-3 mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" 
                         :key="card.key" 
                         class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" 
                         draggable="true" 
                         @dragstart="startDrag(card, $event)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>

                <!-- Cards Section -->
                <div class="bg-sky-50 rounded-md p-4 min-h-[200px]" 
                     data-drop-zone="center"
                     @drop="dropCard('center')" 
                     @dragover.prevent>
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been placed
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" 
                             :key="card.key" 
                             class="min-h-24 p-3 bg-white shadow rounded text-center cursor-move flex items-center justify-center hover:shadow-lg transition-shadow" 
                             draggable="true" 
                             @dragstart="startDrag(card, $event)">
                            <span class="text-sm leading-tight">
                                {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                            </span>
                        </div>
                    </div>
                </div>
                
                <!-- Side B -->
                <div class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[800px]" 
                     data-drop-zone="B"
                     @drop="dropCard('B')" 
                     @dragover.prevent>
                    <h2 class="text-7xl font-bold mb-4">B</h2>
                    <p class="text-sm -mt-3 mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" 
                         :key="card.key" 
                         class="p-3 bg-white shadow rounded mb-2 text-center cursor-move" 
                         draggable="true" 
                         @dragstart="startDrag(card, $event)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>
            </div>

            <!-- Mobile Layout -->
            <div class="lg:hidden space-y-6">
                <!-- Side A -->
                <div class="border-2 border-black bg-pink-100 rounded-md p-4 min-h-[300px]" 
                     data-drop-zone="A"
                     @drop="dropCard('A')" 
                     @dragover.prevent>
                    <h2 class="text-5xl font-bold mb-2">A</h2>
                    <p class="text-xs mb-4">The information must be re-elicited manually.</p>

                    <div v-if="sideA.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideA" 
                         :key="card.key" 
                         class="p-3 bg-white shadow rounded mb-2 text-center touch-card hover:shadow-lg active:opacity-50 active:scale-95 transition-all" 
                         draggable="true" 
                         @dragstart="startDrag(card, $event)"
                         @touchstart="startDrag(card, $event)">
                        {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                    </div>
                </div>

                
                <!-- Cards Section -->
                <div class="bg-sky-50 rounded-md p-4 min-h-[200px]" 
                     data-drop-zone="center"
                     @drop="dropCard('center')" 
                     @dragover.prevent>
                    <h3 class="text-lg font-semibold mb-4 text-center">Available Cards</h3>
                    <div v-if="centerCards.length === 0" class="text-gray-400 text-center mt-8">
                        All cards have been sorted
                    </div>
                    <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div v-for="card in centerCards" 
                             :key="card.key"
                             class="p-3 bg-white shadow rounded text-center touch-card hover:shadow-lg active:opacity-50 active:scale-95 transition-all"
                             draggable="true"
                             @dragstart="startDrag(card, $event)"
                             @touchstart="startDrag(card, $event)">
                            {{ $t(`${caseKey}.${translationPrefix}.${card.key}`) }}
                        </div>
                    </div>
                </div>
                
                <!-- Side B -->
                <div class="border-2 border-black bg-teal-100 rounded-md p-4 min-h-[300px]" 
                     data-drop-zone="B"
                     @drop="dropCard('B')" 
                     @dragover.prevent>
                    <h2 class="text-5xl font-bold mb-2">B</h2>
                    <p class="text-xs mb-4">The information is automatically available within the system.</p>

                    <div v-if="sideB.length === 0" class="text-gray-400 text-center mt-8">
                        Drag cards here
                    </div>
                    <div v-for="card in sideB" 
                         :key="card.key" 
                         class="p-3 bg-white shadow rounded mb-2 text-center touch-card hover:shadow-lg active:opacity-50 active:scale-95 transition-all" 
                         draggable="true" 
                         @dragstart="startDrag(card, $event)"
                         @touchstart="startDrag(card, $event)">
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

.touch-card {
    cursor: move;
    user-select: none;
    -webkit-user-select: none;
    touch-action: none;
}

.touch-card:active {
    cursor: grabbing;
}
</style>