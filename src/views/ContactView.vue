<template>
    <div class="flex flex-col items-center justify-center min-h-screen w-full">

        <div class="orbit-container">
            <!--星球軌道-->
            <div v-for="(item, index) in links" :key="item.name" :id="`item-${index}`" class="orbit-item">
                <a :href="item.url" target="_blank" class="circle">
                    {{ item.name }}
                </a>
            </div>
        </div>

        <div class="switch-dots flex gap-3 mt-10">
            <div v-for="(d, i) in links" :key="'dot-' + i" class="switch-dot w-4 h-4 rounded-full cursor-pointer"
                :class="activeIndex === i ? 'bg-black' : 'bg-gray-400'" @click="switchTo(i)"></div>
        </div>
    </div>
</template>
<script lang="js" setup>
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

const links = ref([
    { name: 'LinkedIn', url: '...' },
    { name: 'Behance', url: '...' },
    { name: 'Github', url: '...' },
]);

// 軌道參數
const ORBIT_RADIUS_X = 180;
const ORBIT_RADIUS_Y = 100;

// 將軌道路徑字串化
const orbitPath = `M${ORBIT_RADIUS_X},0 A${ORBIT_RADIUS_X},${ORBIT_RADIUS_Y} 0 1,0 ${-ORBIT_RADIUS_X},0 A${ORBIT_RADIUS_X},${ORBIT_RADIUS_Y} 0 1,0 ${ORBIT_RADIUS_X},0`;

// 宣告一個全域的時間軸，並且設為暫停 (關鍵)
const orbitTimeline = gsap.timeline({ paused: true });
console.log("Orbit timeline initialized:", orbitTimeline);
// 追蹤當前啟動的索引
const activeIndex = ref(0);
// 每個項目佔據時間軸的間隔比例 (1/3)
const SEGMENT = 1 / links.value.length;



const setupOrbitAnimation = (timeline) => {
    links.value.forEach((item, i) => {
        const elementId = `#item-${i}`;

        // 使用 timeline.to() 將動畫加入時間軸
        timeline.to(elementId, {
            motionPath: {
                path: orbitPath,
                align: elementId,
                alignOrigin: [0.5, 0.5],
                // 確保它們在時間軸上正確分佈，並跑完一圈 (start: i/N, end: i/N + 1)
                start: i * SEGMENT,
                end: i * SEGMENT + 1
            },
            ease: "linear",
            duration: 1, // 佔用時間軸總長度的 100%

            onUpdate() {
                const y = gsap.getProperty(elementId, 'y');
                const scale = 1 + (y / (ORBIT_RADIUS_Y * 2)) * 0.5;
                gsap.set(elementId, { scale, zIndex: y > 0 ? 10 : 0 });
            }
        }, 0);
    });
};

/**
 * @param i 
 */
const switchTo = (i) => {
    activeIndex.value = i;

    const targetProgress = i * SEGMENT;

    gsap.to(orbitTimeline, {
        progress: targetProgress,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true
    });
};


onMounted(() => {
    setupOrbitAnimation(orbitTimeline);
    orbitTimeline.progress(0).invalidate().progress(0.3);
    switchTo(0);
});

</script>

<style scoped>
.orbit-container {
    position: relative;
    width: 360px;
    height: 200px;
    transform: translate(calc(50% - 180px), calc(50% - 100px));
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
    width: 80px;
    height: 80px;
    background-color: #f0f0f0;
    border-radius: 50%;
    text-align: center;
    font-size: 14px;
    color: #333;
}
</style>