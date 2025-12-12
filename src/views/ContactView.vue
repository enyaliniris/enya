<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full overflow-x-hidden">
        <!-- Contact 標題區 -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-blue-400 mb-2">Contact</h1>
            <p class="text-lg text-gray-700">enyaliniris@gmail.com</p>
        </div>

        <div class="orbit-container">
            <svg data-v-ae84ca9b="" class="orbit-path" width="380" height="220">
                <defs>
                    <linearGradient id="gradientColor" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgb(223, 232, 255);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgb(193, 212, 239);stop-opacity:1" />
                    </linearGradient>
                </defs>

                <ellipse data-v-ae84ca9b="" cx="185" cy="105" rx="180" ry="95" stroke="url(#gradientColor)"
                    stroke-width="3" fill="none">
                </ellipse>
            </svg>

            <!-- 星球軌道 -->
            <div v-for="(item, index) in links" :key="item.name" :id="`item-${index}`" class="orbit-item">
                <a :href="item.url" target="_blank" class="circle">
                    {{ item.name }}
                </a>
            </div>
        </div>

        <DotSwitcher :count="links.length" :activeIndex="activeIndex" direction="horizontal" @update:index="switchTo"
            class="mt-10" />
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import DotSwitcher from '@/components/dot-switcher.vue';

gsap.registerPlugin(MotionPathPlugin);

/* ----------------------------------------------
 * 型別定義
 * ----------------------------------------------*/
interface LinkItem {
    name: string;
    url: string;
}

/* ----------------------------------------------
 * 資料
 * ----------------------------------------------*/
const links: Ref<LinkItem[]> = ref([
    { name: 'Resume', url: 'https://www.cake.me/resumes/enya-lin' },
    { name: 'Behance', url: 'https://www.behance.net/enyalin?tracking_source=search_users|enya' },
    { name: 'Github', url: 'https://github.com/enyaliniris' },
]);

/* ----------------------------------------------
 * 軌道參數
 * ----------------------------------------------*/
const ORBIT_RADIUS_X = 200;
const ORBIT_RADIUS_Y = 90;

const orbitPath: string =
    `M${ORBIT_RADIUS_X},0 ` +
    `A${ORBIT_RADIUS_X},${ORBIT_RADIUS_Y} 0 1,0 ${-ORBIT_RADIUS_X},0 ` +
    `A${ORBIT_RADIUS_X},${ORBIT_RADIUS_Y} 0 1,0 ${ORBIT_RADIUS_X},0`;

/* ----------------------------------------------
 * GSAP 時間軸（強型別）
 * ----------------------------------------------*/
const orbitTimeline: gsap.core.Timeline = gsap.timeline({ paused: true });

/* ----------------------------------------------
 * 狀態
 * ----------------------------------------------*/
const activeIndex = ref(0);
const SEGMENT = 1 / links.value.length;

/* ----------------------------------------------
 * 設定軌道動畫（加入 TS 型別）
 * ----------------------------------------------*/
const setupOrbitAnimation = (timeline: gsap.core.Timeline): void => {
    links.value.forEach((_item: LinkItem, i: number) => {
        const elementId = `#item-${i}`;

        timeline.to(
            elementId,
            {
                motionPath: {
                    path: orbitPath,
                    align: elementId,
                    alignOrigin: [0.5, 0.5],
                    start: i * SEGMENT,
                    end: i * SEGMENT + 1,
                },
                ease: 'linear',
                duration: 1,

                onUpdate() {
                    const y = Number(gsap.getProperty(elementId, 'y'));
                    const scale = 1 + (y / (ORBIT_RADIUS_Y * 2)) * 0.5;

                    gsap.set(elementId, {
                        scale,
                        zIndex: y > 0 ? 10 : 0,
                    });
                },
            },
            0
        );
    });
};

/* ----------------------------------------------
 * 切換 Dot / 星球位置（父層 emit 觸發）
 * ----------------------------------------------*/
const switchTo = (i: number): void => {
    activeIndex.value = i;

    const targetProgress = i * SEGMENT;

    gsap.to(orbitTimeline, {
        progress: targetProgress,
        duration: 1,
        ease: 'power2.inOut',
        overwrite: true,
    });
};

/* ----------------------------------------------
 * 初始化
 * ----------------------------------------------*/
onMounted((): void => {
    setupOrbitAnimation(orbitTimeline);
    orbitTimeline.progress(0).invalidate().progress(0.3);
    switchTo(0);
});
</script>

<style scoped>
.orbit-container {
    position: relative;
    left: 160px;
    width: 360px;
    height: 200px;
}

.orbit-path {
    position: absolute;
    top: 0;
    left: -180px;
    width: 380px;
    height: 220px;
    pointer-events: none;
    z-index: -1;
}

.orbit-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.circle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border-radius: 50%;

    text-align: center;
    font-size: 14px;
    color: #ffffff;


    background: url(../images/ball.png) no-repeat center/cover;
    background-size: cover;
}

/* --- (可選) 增加一個文字陰影，讓文字嵌在球體上 --- */
.circle span {
    text-shadow: 1px 1px 2px rgba(198, 228, 255, 0.6),
        -1px -1px 2px rgba(141, 219, 255, 0.2);
}

.circle::before {
    content: '';
    position: absolute;
    top: 15%;
    left: 15%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: radial-gradient(white, rgba(255, 255, 255, 0) 70%);
    filter: blur(2px);
    /* 輕微模糊高光 */
}
</style>
