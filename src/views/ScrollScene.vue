<template>
    <div class="ScrollScence">
        <div class="container">
            <div v-if="loading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <div class="viewport" v-show="!loading">
                <div v-for="(item, i) in works" :key="i" class="work" :ref="el => (workRefs[i] = el as HTMLElement)">
                    <div class="content">
                        <div class="image-box">
                            <img :src="item.image" @load="onImageLoad" />
                        </div>

                        <div class="text-box">
                            <div class="mt-4 pt-4">
                                <h3 class="text-base font-semibold text-gray-400 mb-2">專案時程</h3>
                                <p class="text-xl font-medium text-gray-400 border-t border-gray-700/50">
                                    {{ item.timeline }}</p>
                            </div>
                            <h1>{{ item.title }}</h1>
                            <p class="whitespace-pre-line">{{ item.desc }}</p>
                            <div class="mt-6">
                                <h3 class="text-base font-semibold text-gray-400 mb-2">使用技術</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in item.tags" :key="tag" class="
                                            px-3 py-1 text-sm font-medium 
                                            rounded-full 
                                             text-blue-300 
                                            border border-blue-600/50
                                          ">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="dots">
                    <div v-for="(w, i) in works" :key="'dot-' + i" class="dot" :class="{ active: i === currentIndex }"
                        @click="goToWork(i)"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
    title: string;
    desc: string;
    timeline: string;
    tags: string[];
    image: string;
}

const works = ref<WorkItem[]>([
    {
        title: "數位金融後台",
        desc: `1. 交易量數據圖表：透過 Echart 以動態數據圖，即時查詢特定時間的業務交易量。\n
               2. 表格查詢功能：內部系統的共用變數、API、客戶操作軌跡等資料整合成排序清晰的表格呈現。\n
               3. 登入權限：以 Pinia 制定角色規則，不同角色操作的權限不同。`,
        timeline: "2023/4 - 2024/5",
        tags: ["Vue 3", "Vite", "Ant Design", "Echart"],
        image: "/images/project-dashboard.jpg"
    },
    {
        title: "企業網路銀行",
        desc: `負責UI翻新:\n
               1.網站整體色調現代化、響應式設計，設計大量資訊在跨裝置上的樣式切換。\n
               FrontEnd：\n
               1.根據金融規範更新功能，例如外幣大額申報、告誡戶限制、信用卡查詢等等。\n
               2.重構程式碼，導入新語法套件，提升可維護性。\n
               3.排解弱點掃描問題，提升網站安全性。\n`,
        timeline: "2023/6 - 2025/6",
        tags: ["jQuery", "Figma", "javascript(ES6)", "Bootstrap"],
        image: "/images/project-ebank.jpg"
    },
    {
        title: "友善金融網",
        desc: `負責開發主軸為：\n
               1.新增外幣、貸款、定存、投資報告查詢功能。\n
               2.登入功能新增語音播報驗證碼。\n
               3.重構該網站查詢功能的流程，將步驟拆分為帳號選擇、日期選擇、表格顯示等功能相同的區塊，減少重複程式碼。\n`,
        timeline: "2023/6 - 2025/6",
        tags: ["jQuery", "javascript(ES6)", "Bootstrap"],
        image: "/images/project-freebank.jpg"
    },
    {
        title: "靜態網站",
        desc: "・CSS客製化RWD切版\n・Javascript製作橫向商品輪播牆邏輯\n\n・CSS Animation keyframe製作光暈特效",
        timeline: "2022/11 - 2022/11",
        tags: ["HTML", "CSS", "JavaScript"],
        image: "/images/project-singlepage.jpg"
    }
]);

const workRefs = ref<HTMLElement[]>([]);
const currentIndex = ref(0);

// 3D 偏移參數
const Z_OFFSET = 800;
const X_OFFSET = 500;

// Loading 控制
const loading = ref(false);
let loadedImages = 0;

function onImageLoad() {
    loadedImages++;
    if (loadedImages >= works.value.length) {
        loading.value = false;
        initWorksPosition();
        initScroll();
    }
}

// 初始作品位置
function initWorksPosition() {
    workRefs.value.forEach((el, i) => {
        const z = -Z_OFFSET * i;
        const x = -X_OFFSET * i;
        gsap.set(el, {
            z,
            x,
            opacity: i === 0 ? 1 : i === 1 ? 0.4 : 0,
            scale: i === 0 ? 1 : 0.7,
            filter: i === 0 ? "blur(0px)" : i === 1 ? "blur(6px)" : "blur(10px)",
            zIndex: i === 0 ? 10 : 1,
        });
    });
}

// 滾輪控制
function initScroll() {
    window.addEventListener(
        "wheel",
        (e: WheelEvent) => {
            // 只有當頁面滾動到 ScrollScene 內部時，才執行滾輪劫持邏輯。判斷方式：當前滾動位置是否大於 ScrollScene 頂部位置減去一個安全緩衝區。
            const scrollSceneElement = document.querySelector('.ScrollScence') as HTMLElement;
            if (!scrollSceneElement) return;

            const sceneTop = scrollSceneElement.offsetTop;
            const scrollPosition = window.scrollY;

            // 檢查是否在 ScrollScene 區域內
            const isInScene = scrollPosition >= (sceneTop - 100);

            if (!isInScene) {
                // 如果不在區域內，則不執行任何操作，讓頁面自由滾動
                return;
            }

            // 【滾動事件處理】

            // 正在動畫中，直接阻止滾輪並返回
            if (gsap.isTweening(workRefs.value)) {
                e.preventDefault();
                return;
            }

            if (e.deltaY > 0) {
                // 往下滾動 (Next)
                if (currentIndex.value < works.value.length - 1) {
                    e.preventDefault(); // 阻止頁面滾動
                    goToWork(currentIndex.value + 1);
                }
                // 【關鍵修改 B】：滑到最後一張，不阻止預設行為，讓頁面向下滾動
                // else: 不做 e.preventDefault()，讓頁面繼續向下滾動

            } else {
                // 往上滾動 (Prev)
                if (currentIndex.value > 0) {
                    e.preventDefault(); // 阻止頁面滾動
                    goToWork(currentIndex.value - 1);
                } else {
                    // 【關鍵修改 C】：滑到第一張 (currentIndex.value === 0)
                    // 釋放滾輪！
                    // 不執行 e.preventDefault()，讓頁面向上滾動回 HomeCover
                    // 額外強制滾動到 ScrollScene 頂部，確保滾輪釋放是乾淨的。
                    if (scrollPosition > sceneTop) {
                        // 避免在 HomeCover 區域時再次執行此邏輯
                        window.scrollTo({ top: sceneTop - 1, behavior: 'auto' });
                    }
                }
            }
        },
        { passive: false }
    );
}

// 切換作品（滾輪 + 點點共用）
function goToWork(newIndex: number) {
    //if (newIndex < 0 || newIndex >= works.value.length) return;
    if (newIndex === currentIndex.value) return;

    const oldIndex = currentIndex.value;
    currentIndex.value = newIndex;

    const prevEl = workRefs.value[oldIndex];
    const nextEl = workRefs.value[newIndex];
    if (!prevEl || !nextEl) return;

    // 前一個退後
    gsap.to(prevEl, {
        z: -Z_OFFSET,
        x: -X_OFFSET,
        scale: 0.7,
        opacity: 0.3,
        filter: "blur(6px)",
        duration: 0.9,
        ease: "power3.inOut",
        zIndex: 1,
    });

    // 新的往前
    gsap.to(nextEl, {
        z: 0,
        x: 0,
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        duration: 1,
        ease: "power3.out",
        zIndex: 10,
    });
}
</script>


<style scoped>
body {
    overflow: hidden;
}

.ScrollScence {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container {
    width: 100vw;
    height: 100vh;
    color: rgb(72, 72, 72);
    overflow: hidden;
}

.viewport {
    width: 100%;
    height: 100%;
    position: relative;
    perspective: 1600px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.work {
    position: absolute;
    width: 100%;
    max-width: 1000px;
    transform-style: preserve-3d;
}

.content {
    display: flex;
    gap: 50px;
    align-items: center;
}

.image-box {
    flex: 1.1;
}

.image-box img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.text-box {
    flex: 0.9;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.text-box h1 {
    font-size: 2.6rem;
    margin: 0;
}

.text-box p {
    opacity: 0.8;
    line-height: 1.2em;
    font-size: 1.1rem;
}

/* Loading 遮罩 */
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(17, 17, 17, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
}

.spinner {
    width: 60px;
    height: 60px;
    border: 6px solid #555;
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

/* dots 可點擊切換 */
.dots {
    position: absolute;
    right: 40px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 12px;
    z-index: 999;
}

.dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #777;
    opacity: 0.4;
    transition: 0.3s;
    cursor: pointer;
}

.dot.active {
    opacity: 1;
    background: #fff;
    transform: scale(1.4);
}
</style>
