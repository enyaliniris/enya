<template>
    <div>
        <!-- 封面區 -->
        <div class="flex flex-col md:flex-row w-full md:max-w-[1400px] mx-auto min-h-screen items-center py-12">
            <!-- 文字區 -->
            <div class="flex-1 p-4 md:p-8 order-2 md:order-1">
                <div>
                    <h1 class="text-4xl font-bold mb-4">歡迎來到我的作品</h1>
                    <p class="text-lg leading-relaxed">
                        這裡是一段你的介紹文字，可以寫你的簡歷、作品理念、喜歡畫漫畫等特色介紹。
                    </p>
                </div>
            </div>

            <!-- 圖片區 -->
            <div class="flex-1 flex items-center justify-center p-4 md:p-8 order-1 md:order-2">
                <img src="/images/Portfolio.jpg" alt="封面圖" class="max-w-full max-h-[90vh] object-contain rounded-xl" />
            </div>
        </div>

        <!-- 向下箭頭 -->
        <div class="flex justify-center mt-8">
            <button @click="scrollToScrollScene"
                class="animate-bounce text-4xl text-gray-600 cursor-pointer p-4 relative overflow-hidden rounded-full z-10 group">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3"
                    stroke="currentColor" class="relative z-20 w-8 h-8">
                    <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg> <span
                    class="absolute inset-0 rounded-full bg-radial-fade transition-opacity duration-00 opacity-0 group-hover:opacity-100 z-0"></span>

            </button>
        </div>

        <!-- ScrollScene 組件 -->
        <ScrollScene ref="scrollSceneRef" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrollScene from './ScrollScene.vue'

const scrollSceneRef = ref<InstanceType<typeof ScrollScene> | null>(null);

function scrollToScrollScene() {
    if (scrollSceneRef.value) {
        // 找到 ScrollScene 組件的根 DOM 元素
        const targetElement = scrollSceneRef.value.$el as HTMLElement;

        // 使用原生的 scrollIntoView
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop, // 滾動到目標元素的頂部位置
                behavior: 'smooth',
            });
        }
    }
}
</script>
