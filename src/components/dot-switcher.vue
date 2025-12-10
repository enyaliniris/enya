<template>
    <div class="dots" :class="directionClass">
        <div v-for="i in count" :key="'dot-' + i" class="dot" :class="{ active: i - 1 === activeIndex }"
            @click="onDotClick(i - 1)"></div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
    count: number;                 // 總點數
    activeIndex: number;           // 當前啟用 dot
    direction?: "horizontal" | "vertical";  // 排列方向
}>();

const emit = defineEmits<{
    (e: "update:index", index: number): void;
}>();

const onDotClick = (index: number) => {
    emit("update:index", index);
};

const directionClass = computed(() => {
    return props.direction === "vertical"
        ? "flex-row md:flex-col"
        : "flex-row";
});
</script>

<style scoped>
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
</style>
