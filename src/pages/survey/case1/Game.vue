<script setup>
import { useSurvey } from "../../../stores/useSurvey"
import DragAndDrop from "../../../components/game/DragAndDrop.vue"

const { surveyState } = useSurvey()

const cards = [
    { key: "card1", point: 5},
    { key: "card2", point: 5},
    { key: "card3", point: 6.667},
    { key: "card4", point: 6.667},
    { key: "card5", point: 8.333},
    { key: "card6", point: 6.667},
    { key: "card7", point: 8.333},
    { key: "card8", point: 5},
    { key: "card9", point: 6.667},
    { key: "card10", point: 8.333},
    { key: "card11", point: 6.667},
    { key: "card12", point: 6.667},
    { key: "card13", point: 6.667},
    { key: "card14", point: 6.667},
    { key: "card15", point: 6.667},
]
</script>

<template>
    <DragAndDrop
        case-key="case1"
        :cards="cards"
        back-route="/survey/case1"
        next-route="/survey/case1/score"
        :survey-state="surveyState"
        translation-prefix="cards_text"
    />
</template>