<script setup></script>

<template>
  <section
    class="mx-auto max-w-5xl flex items-center min-h-screen p-10 lg:p-20"
  >
    <div class="w-full flex flex-col items-center space-y-20">
      <img
        class="w-60 h-60 lg:w-80 lg:h-80 object-cover"
        src="../assets/images/thankyou1.png"
        alt=""
      />
      <p class="text-lg lg:text-3xl text-justify">
        {{ $t("thank_you.not_participate") }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>
