<template>
    <nav class="fixed left-0 right-0 z-50 flex justify-center">
        <div class="p-4 md:px-6 backdrop-blur-md rounded-bl-5xl rounded-br-5xl shadow-lg shadow-blue-500/5
             flex justify-center space-x-8 max-w-lg w-full">
            <a v-for="item in navItems" :key="item.name" :href="item.href"
                class="text-base font-bold text-gray-800 tracking-wider relative cursor-pointer transition-colors duration-200 min-w-20 hover:text-gray-900">
                <span class="z-10 text-blue-400">{{ item.name }}</span>
                <span
                    class="absolute bottom-1 left-0 h-0.5 w-0 bg-gray-900 transition-all duration-300 group-hover:w-full">
                </span>
            </a>
        </div>
    </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const navItems = ref([
    { name: 'Home', href: '#home' },
    { name: 'Project', href: '#project' },
    { name: 'Contact', href: '#contact' },
])
</script>

<style scoped>
.is-active .transition-all {
    width: 100% !important;
}
</style>