<script>
export default {
    methods: {
        goHome() {
            this.$router.push('/');
        },
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>

<template>
    <section class="w-full bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
        <div class="mx-auto max-w-5xl h-screen flex flex-col justify-center items-center p-10">
            <!-- Bouncing Image -->
            <img 
                src="../assets/images/404.png" 
                class="w-80 h-80 animate-bounce mb-8" 
                alt="404 Error"
            >
            
            <!-- Message -->
            <h1 class="text-5xl font-bold text-gray-800 mb-4">Ooopss!</h1>
            <p class="tex-xl text-gray-600 mb-2 text-center">We can't seem to find the page you're looking for.</p>
            <p class="text-lg text-gray-500 mb-8">Error code: 404</p>
            
            <!-- Buttons -->
            <div class="flex gap-4 flex-wrap justify-center">
                <button 
                    @click="goHome" 
                    class="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                    >
                        Go Back Home
                    </button>
                <button 
                    @click="goBack"
                    class="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
                >
                    Go Back
                </button>
            </div>
        </div>
    </section>
</template>

<style scoped>
/* custom bounce animation with slower timing */
@keyframes gentle-bounce {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-20px);
    }
}

/* replace tailwind bounce with a custom bournce */
.animate-bounce {
    animation: gentle-bounce 2s ease-in-out infinite;
}
</style>