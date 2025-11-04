<script setup>
const handleSubmit = () => {
  alert("Data saved");
};
</script>

<template>
  <section
    class="max-w-6xl mx-auto flex justify-center min-h-screen p-10 lg:p-20"
  >
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
                type="text"
                id="name"
                placeholder=" "
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-10 pb-2 focus:outline-none focus:border-pink-500"
              />
              <label
                for="name"
                class="absolute left-8 top-4 text-gray-500 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm"
              >
                {{ $t("personal_data.fields.fullname") }}
              </label>
            </div>

            <!-- Field: Email -->
            <div class="relative w-72">
              <input
                type="email"
                id="email"
                placeholder=" "
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-10 pb-2 focus:outline-none focus:border-pink-500"
              />
              <label
                for="email"
                class="absolute left-8 top-4 text-gray-500 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm"
              >
                {{ $t("personal_data.fields.email") }}
              </label>
            </div>

            <!-- Field: Gender -->
            <div class="relative w-72">
              <select
                name="gender"
                id="gender"
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-8 pb-2 appearance-none focus:outline-none focus:border-pink-500"
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
                class="absolute left-8 top-3 text-gray-500 italic text-sm transition-all peer-focus:top-1 peer-focus:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
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
            </div>
          </div>

          <!-- Right Column -->
          <div class="flex flex-col gap-y-8">
            <!-- Field: Age -->
            <div class="relative w-72">
              <input
                type="text"
                id="age"
                placeholder=" "
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-10 pb-2 focus:outline-none focus:border-pink-500"
              />
              <label
                for="age"
                class="absolute left-8 top-4 text-gray-500 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm"
              >
                {{ $t("personal_data.fields.age") }}
              </label>
            </div>

            <!-- Field: Affiliation -->
            <div class="relative w-72">
              <input
                type="text"
                id="affiliation"
                placeholder=" "
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-10 pb-2 focus:outline-none focus:border-pink-500"
              />
              <label
                for="affiliation"
                class="absolute left-8 top-4 text-gray-500 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm"
              >
                {{ $t("personal_data.fields.affiliation") }}
              </label>
            </div>

            <!-- Field: Occupation -->
            <div class="relative w-72">
              <select
                name="occupation"
                id="occupation"
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-8 pb-2 appearance-none focus:outline-none focus:border-pink-500"
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
                class="absolute left-8 top-3 text-gray-500 italic text-sm transition-all peer-focus:top-1 peer-focus:text-sm peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
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
            </div>

            <!-- Field: Length of Employment -->
            <div class="relative w-72">
              <input
                type="text"
                id="ln_of_employment"
                :placeholder="
                  $t('personal_data.fields.length_employment.placeholder')
                "
                class="peer w-full border-2 border-pink-300 rounded-full px-8 pt-10 pb-2 focus:outline-none focus:border-pink-500"
              />
              <label
                for="ln_of_employment"
                class="absolute left-8 top-4 text-gray-500 italic text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-sm"
              >
                {{ $t("personal_data.fields.length_employment.title") }}
              </label>
            </div>
          </div>
        </div>
      </form>

      <div class="flex justify-center">
        <button
          @click="() => handleSubmit()"
          class="w-16 h-16 border-2 border-sky-500 hover:bg-sky-500 hover:text-white text-pink-400 font-semibold rounded-full transition-colors cursor-pointer"
        >
          {{ $t("buttons.next") }}
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
