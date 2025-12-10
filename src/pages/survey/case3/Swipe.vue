<script setup>
import { useSurvey } from "../../../stores/useSurvey"
import SwipeCards from "../../../components/SwipeCards.vue"

const { surveyState } = useSurvey()
const cards = [
    { key: "card1", point: 5 },
    { key: "card2", point: 5 },
    { key: "card3", point: 6.667 },
    { key: "card4", point: 6.667 },
    { key: "card5", point: 5 },
    { key: "card6", point: 6.667 },
    { key: "card7", point: 6.667 },
    { key: "card8", point: 6.667 },
    { key: "card9", point: 8.333 },
    { key: "card10", point: 8.333 },
    { key: "card11", point: 6.667 },
    { key: "card12", point: 6.667 },
    { key: "card13", point: 8.333 },
    { key: "card14", point: 6.667 },
    { key: "card15", point: 6.667 },
]
</script>

<template>
    <SwipeCards :cards="cards" :survey-state="surveyState" case-key="case3" next-route="/survey/case3/score" />
</template>