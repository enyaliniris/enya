<template>
    <div class="hero-wrapper">
    <LineAnimation></LineAnimation>
    <div>
        <div class="flex flex-col md:flex-row w-full md:max-w-[1100px] mx-auto min-h-9/10 items-center py-12">
            <div class="flex-1 p-2 md:p-2 order-2 md:order-1">
                <div>
                    <h1 class="text-4xl font-bold mb-4 text-blue-400">Hi，我是恩雅</h1>

                    <p class="text-lg leading-relaxed min-h-40 text-gray-600">
                        <template v-for="(text, index) in typingTexts" :key="index">
                            <span :ref="(el) => lineRefs[index] = el as HTMLElement"></span>
                            <br v-if="index < typingTexts.length - 1" />
                        </template>
                    </p>
                </div>
            </div>

            <div class="flex-1 flex items-center justify-center p-2 md:p-4 order-1 md:order-2">
                <img src="/images/Portfolio.jpg" alt="封面圖" class="max-w-full max-h-[90vh] object-contain rounded-xl" />
            </div>
        </div>

        <div class="flex justify-center mt-8">
            <button @click="$emit('scrollToWorks')"
                class="animate-bounce text-4xl text-gray-600 cursor-pointer p-4 relative overflow-hidden rounded-full z-10 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                    stroke="currentColor" class="relative z-20 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
                <span
                    class="absolute inset-0 rounded-full bg-radial-fade transition-opacity duration-300 opacity-0 group-hover:opacity-100 z-0"></span>
            </button>
        </div>
    </div>
    </div>

</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUpdate } from 'vue'
import Typed from "typed.js";
import LineAnimation from '@/components/line-animation.vue';

const typingTexts = [
    "2 年前端工程師經驗，專注打造高品質使用者介面與互動體驗。",
    "熟悉 Vue.js / jQuery / JavaScript / CSS / Tailwind / HTML / JavaScript / Figma  ",
    "具備 UI 到前端完整獨立開發能力，能與設計師和後端順暢協作。"
];

const lineRefs = ref<HTMLElement[]>([]);

onBeforeUpdate(() => {
    lineRefs.value = [];
});


const typeText = (element: HTMLElement, text: string) => {
    return new Promise<void>((resolve) => {
        new Typed(element, {
            strings: [text],
            typeSpeed: 45,
            showCursor: false,
            loop: false,
            onComplete: () => resolve()
        });
    });
};

onMounted(async () => {
    for (const [index, text] of typingTexts.entries()) {
        const element = lineRefs.value[index];
        if (element) {
            await typeText(element, text);
        }
    }
});
</script>

<style scoped>
.hero-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

</style>