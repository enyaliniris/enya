<template>
    <div class="ScrollScence">
        <div class="container">
            <div v-if="loading" class="loading-overlay">
                <div class="spinner"></div>
            </div>

            <div class="viewport" v-show="!loading">
                <div v-for="(item, i) in works" :key="i" class="work" :ref="el => (workRefs[i] = el as HTMLElement)">
                    <div class="content md:flex md:gap-[50px] flex-col md:flex-row">

                        <a :href="item.url" target="_blank" class="image-box order-1 md:order-0 w-full reflection-box">
                            <img :src="item.image" @load="onImageLoad" :alt="item.title" />
                        </a>

                        <div class="text-box order-2 md:order-0 w-full">

                            <div class="flex items-start justify-between mb-2 md:flex-row">
                                <a :href="item.url" target="_blank"
                                    class="grow font-bold text-blue-400 hover:underline">
                                    <h1>{{ item.title }}</h1>
                                </a>
                                <p
                                    class="text-base md:text-xl font-medium text-gray-400 pt-1 md:pt-0 whitespace-nowrap **flex-shrink-0**">
                                    {{ item.timeline }}
                                </p>
                            </div>

                            <p class="whitespace-pre-line md:max-w-3xl">{{ item.desc }}</p>

                            <div class="mt-1 pt-4 border-t border-gray-700/50"></div>
                            <div class="mt-3">
                                <h3 class="text-base font-semibold text-gray-400 mb-1">使用技術</h3>
                                <div class="flex flex-wrap gap-2">
                                    <span v-for="tag in item.tags" :key="tag"
                                        class="px-3 py-1 text-sm font-medium rounded-full  text-blue-300 border border-blue-600/50">
                                        {{ tag }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <DotSwitcher :count="works.length" :activeIndex="currentIndex" direction="vertical"
                    @update:index="goToWork"
                    class="absolute md:right-10 md:top-1/2 md:translate-y-[-50%] bottom-8 md:bottom-auto left-1/2 md:left-auto translate-x-[-50%] md:translate-x-0" />
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import DotSwitcher from "@/components/dot-switcher.vue";

gsap.registerPlugin(ScrollTrigger);

interface WorkItem {
    title: string;
    desc: string;
    timeline: string;
    tags: string[];
    image: string;
    url: string;
}


const works = ref<WorkItem[]>([
    {
        title: "數位金融後台",
        desc: `1. 交易量數據圖表：透過 Echart 以動態數據圖，即時查詢特定時間的業務交易量。\n2. 表格查詢功能：內部系統的共用變數、API、客戶操作軌跡等資料整合成排序清晰的表格呈現。\n3. 登入權限：以 Pinia 制定角色規則，不同角色操作的權限不同。`,
        timeline: "2023/4 - 2024/5",
        tags: ["Vue 3", "Vite", "Ant Design", "Echart"],
        image: "/images/project-dashboard.jpg",
        url: "https://enyadashboard.netlify.app/"
    },
    {
        title: "企業網路銀行",
        desc: `UI:\n1.網站整體色調現代化、響應式設計，設計大量資訊在跨裝置上的樣式切換。\n
               FrontEnd：\n1.根據金融規範更新功能，例如外幣大額申報、告誡戶限制、信用卡查詢等等。\n2.重構程式碼，導入新語法套件，提升可維護性。\n3.排解弱點掃描問題，提升網站安全性。\n`,
        timeline: "2023/6 - 2025/6",
        tags: ["jQuery", "Figma", "javascript(ES6)", "Bootstrap"],
        image: "/images/project-ebank.jpg",
        url: "https://myebank.ubot.com.tw/ebankC/#"
    },
    {
        title: "友善金融網",
        desc: `負責開發主軸為：\n1.新增外幣、貸款、定存、投資報告查詢功能。\n2.登入功能新增語音播報驗證碼。\n3.重構該網站查詢功能的流程，將步驟拆分為帳號選擇、日期選擇、表格顯示等功能相同的區塊，減少重複程式碼。\n`,
        timeline: "2023/6 - 2025/6",
        tags: ["jQuery", "javascript(ES6)", "Bootstrap"],
        image: "/images/project-freebank.jpg",
        url: "https://freebank.ubot.com.tw/MBAF/"
    },
    {
        title: "靜態網站",
        desc: `1.CSS客製化RWD切版。\n 2.Javascript製作橫向商品輪播牆邏輯。\n3.CSS Animation keyframe製作光暈特效。`,
        timeline: "2022/11 - 2022/11",
        tags: ["HTML", "CSS", "JavaScript"],
        image: "/images/project-singlepage.jpg",
        url: "https://enyacolorfulworld.netlify.app/"
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

function onImageLoad(e: Event) {
    loadedImages++;
    const target = e.target as HTMLImageElement;
    const url = target?.src;
    if (target?.parentElement) {
        target.parentElement.style.setProperty(
            "--reflection-img",
            `url(${url})`
        );
    }
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
    //console.log("workRefs", workRefs.value);
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
                    console.log("Releasing scroll at first work");
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

const animating = ref(false);


// 切換作品（滾輪 + 點點共用）
function goToWork(newIndex: number) {
    if (animating.value) return;               // 防止多次觸發
    console.log("goToWork triggered", { from: currentIndex.value, to: newIndex });
    //if (newIndex < 0 || newIndex >= works.value.length) return;
    if (newIndex === currentIndex.value) return;
    animating.value = true;                   // 鎖住

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
        onComplete: () => {
            animating.value = false;       // 解鎖
        }
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
    padding: 0 40px;
    transform-style: preserve-3d;
}

.content {
    max-width: 1300px;
    align-items: center;
    margin: 0 auto
}

.image-box img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}

.text-box {
    /* flex: 0.9; */
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.text-box h1 {
    /* 最小 1.8rem, 理想值 3vw, 最大 2.4rem */
    font-size: clamp(1.8rem, 3vw, 2.4rem);
    margin: 0;
}

.text-box p {
    opacity: 0.8;
    line-height: 1.3em;
    /* 調整行高以適應 pre-line */
    /* 最小 0.9rem, 理想值 3vw, 最大 1.1rem */
    font-size: clamp(0.9rem, 3vw, 1.1rem);
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
    display: flex;
    gap: 12px;
    z-index: 999;
}

.dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #777;
    opacity: 0.4;
    transition: 0.3s;
    cursor: pointer;
}

.dot.active {
    opacity: 1;
    background: #8ec5ff;
    transform: scale(1.4);
}

.reflection-box {
    position: relative;
}

.reflection-box img {
    display: block;
}

/* 反射 */
.reflection-box::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    /* 往下放 */
    height: 100%;
    /* 反射高度 = 原圖高度 */
    background-size: cover;
    background-repeat: no-repeat;
    transform: scaleY(-1);
    /* 垂直翻轉 */
    opacity: 0.25;
    /* 透明度 */
    mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 1) 100%);

    -webkit-mask-image: linear-gradient(to bottom,
            rgba(0, 0, 0, 0) 0%,
            rgba(0, 0, 0, 0) 60%,
            rgba(0, 0, 0, 1) 100%);
}

.reflection-box::after {
    background-image: var(--reflection-img);
}

@media screen and (max-width: 768px) {
    .reflection-box::after {
        display: none;
    }
}
</style>
