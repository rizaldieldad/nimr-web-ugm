<script setup>
import { useRouter} from "vue-router"
import { onMounted, ref } from "vue"
import { useI18n } from "vue-i18n"

// Add store
import { useSurvey } from "../stores/useSurvey"

const router = useRouter();
const { surveyState, startSurvey } = useSurvey()
const { t } = useI18n()

// Validation states
const errors = ref({
    fullNameTitle: '',
    email: '',
    gender: "",
    age: '',
    affiliation: '',
    occupation: "",
    lengthEmployment: ''
})

onMounted(() => {
    startSurvey()
})

// Function for validate full name - minimun 5 characters
const validateFullName = () => {
    const name = surveyState.respondentInfo.fullNameTitle
    if(!name) {
        errors.value.fullNameTitle = t('personal_data.errors.fullname.required')
        return false
    }

    if (name.length < 5) {
        errors.value.fullNameTitle = t('personal_data.errors.fullname.min')
        return false
    }

    errors.value.fullNameTitle = ''
    return true
}

// Function for validate affiliation - minimun 5 characters
const validateAffiliation = () => {
    const affiliation = surveyState.respondentInfo.affiliation
    if(!affiliation) {
        errors.value.affiliation = t('personal_data.errors.affiliation.required')
        return false
    }

    if (affiliation.length < 5) {
        errors.value.affiliation = t('personal_data.errors.affiliation.min')
        return false
    }

    errors.value.affiliation = ''
    return true
}

// Function for validate age - numbers only
const validateAge = () => {
    const age = surveyState.respondentInfo.age
    if (!age) {
        errors.value.age = t('personal_data.errors.age.required')
        return false
    }

    if (!/^\d+$/.test(age)) {
        errors.value.age = t('personal_data.errors.age.number')
        return false
    }

    const ageNum = parseInt(age)
    if (ageNum < 1 || ageNum > 120) {
        errors.value.age = t('personal_data.errors.age.min')
        return false
    }

    errors.value.age = ""
    return true
}

// Function for validate email format
const validateEmail = () => {
    const email = surveyState.respondentInfo.email
    if (!email) {
        errors.value.email = t('personal_data.errors.email.required')
        return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        errors.value.email = t('personal_data.errors.email.email')
        return false
    }

    errors.value.email = ""
    return true
}

// Function for validate gender
const validateGender = () => {
    const gender = surveyState.respondentInfo.gender
    if (!gender) {
        errors.value.gender = t('personal_data.errors.gender.required')
        return false
    }

    errors.value.gender = ""
    return true
}

// Function for validate occupation
const validateOccupation = () => {
    const occupation = surveyState.respondentInfo.occupation
    if (!occupation) {
        errors.value.occupation = t('personal_data.errors.occupation.required')
        return false
    }

    errors.value.occupation = ""
    return true
}

// Function for validate length of employment
const validateLengthEmployment = () => {
    const lengthEmployment = surveyState.respondentInfo.lengthEmployment
    if (!lengthEmployment) {
        errors.value.lengthEmployment = t('personal_data.errors.length_employment.required')
        return false
    }

    errors.value.lengthEmployment = ""
    return true
}

// Restrict age input to numbers only
const handleAgeInput = (event) => {
    const value = event.target.value

    // Remove any non-digit characters
    surveyState.respondentInfo.age = value.replace(/\D/g, '')
    validateAge()
}

const handleSubmit = () => {
    // Validate all required fields
    const isNameValid = validateFullName()
    const isEmailValid = validateEmail()
    const isGenderValid = validateGender()
    const isAgeValid = validateAge()
    const isOccupationValid = validateOccupation()
    const isAffiliationValid = validateAffiliation()
    const isLengthEmploymentValid = validateLengthEmployment()

    if ( !isNameValid || !isAgeValid || !isEmailValid || !isAffiliationValid || !isGenderValid || !isOccupationValid || !isLengthEmploymentValid ) {
        return
    }

    setTimeout(() => {
        router.push("/survey/instruction-1")
    }, 500);
};
</script>

<template>
    <section 
        class="w-full bg-[url('./assets/images/backgrounds/bg_secondary.png')] lg:bg-[url('./assets/images/backgrounds/bg_respondent.png')] bg-cover bg-center transition-all duration-500"
    >
        <div class="max-w-6xl mx-auto flex justify-center min-h-screen p-10 lg:p-20">
            <div class="w-full space-y-8 lg:space-y-10">
                <h1 class="text-4xl lg:text-6xl font-bold text-center">
                    {{ $t("personal_data.title") }}
                </h1>

                <p class="text-lg lg:text-3xl text-center text-slate-600">
                    {{ $t("personal_data.description") }}
                </p>

                <form v-on:submit.prevent="">
                    <div
                        class="lg:max-w-4xl mx-auto flex flex-col lg:flex-row justify-between items-center lg:items-start space-y-8"
                    >
                    <!-- Left Column -->
                    <div class="flex flex-col gap-y-8">
                        <!-- Field: Full name and Academic Title -->
                        <div class="relative w-72">
                        <input
                            v-model="surveyState.respondentInfo.fullNameTitle"
                            @blur="validateFullName"
                            @input="validateFullName"
                            type="text"
                            id="name"
                            placeholder=" "
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-10 pb-2 focus:outline-none',
                              errors.fullNameTitle ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        />
                        <label
                            for="name"
                            :class="[
                              'absolute left-8 top-4 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
                              errors.fullNameTitle ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.fullname") }}
                        </label>
                        <p v-if="errors.fullNameTitle" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.fullNameTitle }}
                        </p>
                        </div>

                        <!-- Field: Email -->
                        <div class="relative w-72">
                        <input
                            v-model="surveyState.respondentInfo.email"
                            @blur="validateEmail"
                            @input="validateEmail"
                            type="email"
                            id="email"
                            placeholder=" "
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-10 pb-2 focus:outline-none',
                              errors.email ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        />
                        <label
                            for="email"
                            :class="[
                              'absolute left-8 top-4 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
                              errors.email ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.email") }}
                        </label>
                        <p v-if="errors.email" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.email }}
                        </p>
                        </div>

                        <!-- Field: Gender -->
                        <div class="relative w-72">
                        <select
                            v-model="surveyState.respondentInfo.gender"
                            @change="validateGender"
                            @blur="validateGender"
                            name="gender"
                            id="gender"
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-8 pb-2 appearance-none focus:outline-none',
                              errors.gender ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        >
                            <option value="" disabled selected>...</option>
                            <option value="male">
                            {{ $t("personal_data.fields.gender.male") }}
                            </option>
                            <option value="female">
                            {{ $t("personal_data.fields.gender.female") }}
                            </option>
                        </select>

                        <!-- floating label -->
                        <label
                            for="gender"
                            :class="[
                              'absolute left-8 top-3 italic text-sm transition-all peer-focus:top-1 peer-focus:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
                              errors.gender ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.gender.title") }}
                        </label>

                        <!-- custom arrow -->
                        <div
                            class="pointer-events-none absolute inset-y-0 right-5 flex items-center"
                        >
                            <svg
                            class="w-4 h-4 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </div>
                        <p v-if="errors.gender" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.gender }}
                        </p>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="flex flex-col gap-y-8">
                        <!-- Field: Age -->
                        <div class="relative w-72">
                        <input
                            v-model="surveyState.respondentInfo.age"
                            @input="handleAgeInput"
                            @blur="validateAge"
                            type="text"
                            inputmode="numeric"
                            id="age"
                            placeholder=" "
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-10 pb-2 focus:outline-none',
                              errors.age ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        />
                        <label
                            for="age"
                            :class="[
                              'absolute left-8 top-4 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
                              errors.age ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.age") }}
                        </label>
                        <p v-if="errors.age" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.age }}
                        </p>
                        </div>

                        <!-- Field: Affiliation -->
                        <div class="relative w-72">
                        <input
                            v-model="surveyState.respondentInfo.affiliation"
                            @blur="validateAffiliation"
                            @input="validateAffiliation"
                            type="text"
                            id="affiliation"
                            placeholder=" "
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-10 pb-2 focus:outline-none',
                              errors.affiliation ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        />
                        <label
                            for="affiliation"
                            :class="[
                              'absolute left-8 top-4 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
                              errors.affiliation ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.affiliation") }}
                        </label>
                        <p v-if="errors.affiliation" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.affiliation }}
                        </p>
                        </div>

                        <!-- Field: Occupation -->
                        <div class="relative w-72">
                        <select
                            v-model="surveyState.respondentInfo.occupation"
                            @change="validateOccupation"
                            @blur="validateOccupation"
                            name="occupation"
                            id="occupation"
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-8 pb-2 appearance-none focus:outline-none',
                              errors.occupation ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        >
                            <option value="" disabled selected>...</option>
                            <option value="male">
                            {{ $t("personal_data.fields.occupation.doctor") }}
                            </option>
                            <option value="female">
                            {{ $t("personal_data.fields.occupation.non_doctor") }}
                            </option>
                        </select>

                        <!-- floating label -->
                        <label
                            for="occupation"
                            :class="[
                              'absolute left-8 top-3 italic text-sm transition-all peer-focus:top-1 peer-focus:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base',
                              errors.occupation ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.occupation.title") }}
                        </label>

                        <!-- custom arrow -->
                        <div
                            class="pointer-events-none absolute inset-y-0 right-5 flex items-center"
                        >
                            <svg
                            class="w-4 h-4 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            stroke-width="2"
                            >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                            </svg>
                        </div>
                        <p v-if="errors.occupation" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.occupation }}
                        </p>
                        </div>

                        <!-- Field: Length of Employment -->
                        <div class="relative w-72">
                        <input
                            v-model="surveyState.respondentInfo.lengthEmployment"
                            @blur="validateLengthEmployment"
                            @input="validateLengthEmployment"
                            type="text"
                            id="ln_of_employment"
                            :placeholder="
                            $t('personal_data.fields.length_employment.placeholder')
                            "
                            :class="[
                              'peer w-full border-2 rounded-full px-8 pt-10 pb-2 focus:outline-none',
                              errors.lengthEmployment ? 'border-red-500 focus:border-red-500' : 'border-pink-300 focus:border-pink-500'
                            ]"
                        />
                        <label
                            for="ln_of_employment"
                            :class="[
                              'absolute left-8 top-4 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:text-sm',
                              errors.lengthEmployment ? 'text-red-500' : 'text-gray-500 peer-placeholder-shown:text-gray-400'
                            ]"
                        >
                            {{ $t("personal_data.fields.length_employment.title") }}
                        </label>
                        <p v-if="errors.lengthEmployment" class="text-red-500 text-xs mt-1 ml-8">
                          {{ errors.lengthEmployment }}
                        </p>
                        </div>
                    </div>
                    </div>
                </form>

                <div class="flex justify-center">
                    <button
                    @click="() => handleSubmit()"
                    class="w-16 h-16 border-2 border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 font-semibold rounded-full transition-colors cursor-pointer active:scale-90 active:bg-sky-600 active:text-white"
                    >
                    {{ $t("buttons.next") }}
                    </button>
                </div>
                </div>
        </div>
    </section>
</template>

<style scoped></style>