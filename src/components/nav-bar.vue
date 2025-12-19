<template>
    <nav class="fixed left-0 right-0 z-50">

        <div class="w-full mx-auto px-4 md:px-6 mt-2 py-2 justify-center flex mt-2">
            <div
                class="w-full max-w-[80%] p-2 rounded-5xl shadow-lg shadow-blue-500/5 flex flex-col md:flex-row md:justify-center justify-center backdrop-blur ">
                <div class="flex justify-between items-center md:hidden">
                    <button @click="toggleMenu" class="text-gray-800 focus:outline-none">
                        <svg v-show="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <svg v-show="isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <div :class="{ 'hidden': !isMenuOpen }" class="
                    flex-col space-y-2 mt-4 
                    md:flex md:flex-row md:justify-center md:space-x-8 md:space-y-0 md:mt-0 
                    transition-all duration-300 ease-in-out">
                    <a v-for="item in navItems" :key="item.name" @click="navigateTo(item.section)" class="text-base font-bold tracking-wider relative cursor-pointer 
                              transition-colors duration-200 min-w-20 hover:text-gray-900 
                              py-2 md:py-0 text-center group block w-full">

                        <span
                            class="z-10 text-gray-800 group-hover:text-blue-500 transition-colors duration-200 inline-block pb-1">
                            {{ item.name }}
                        </span>
                        <span
                            class="absolute left-1/2 -translate-x-1/2 bottom-0 h-0.5 w-0 bg-blue-500 transition-all duration-300 group-hover:w-[90%]">
                        </span>
                    </a>
                </div>

            </div>

        </div>
    </nav>
</template>

<script lang="ts" setup>
import { ref } from 'vue'


const navItems = ref<Array<{ name: string; section: 'home' | 'works' | 'contact' }>>([
    { name: 'Home', section: 'home' },
    { name: 'Project', section: 'works' },
    { name: 'Contact', section: 'contact' },
])

const isMenuOpen = ref(false)
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits<{
    (e: 'navigate', section: 'home' | 'works' | 'contact'): void
}>()
const navigateTo = (section: 'home' | 'works' | 'contact') => {
    // 關閉手機選單
    isMenuOpen.value = false

    // 更新 URL hash
    router.replace({ hash: `#${section}` })

    emit('navigate', section)
}
</script>

<style scoped>
.backdrop-blur {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);

    background-color: rgba(255, 255, 255, 0.5);
}
</style>