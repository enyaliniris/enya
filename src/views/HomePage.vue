<template>
    <div>
        <NavBar @navigate="scrollToSection" />

        <div ref="homeRef">
            <HeaderIntro @scrollToWorks="scrollToSection('works')" />
        </div>

        <div ref="worksRef">
            <ScrollScene />
        </div>

        <div ref="contactRef">
            <ContactView />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import NavBar from '@/components/nav-bar.vue'
import HeaderIntro from '@/views/HeaderIntro.vue'
import ScrollScene from '@/views/ScrollScene.vue'
import ContactView from '@/views/ContactView.vue'

const homeRef = ref<HTMLElement | null>(null)
const worksRef = ref<HTMLElement | null>(null)
const contactRef = ref<HTMLElement | null>(null)

const route = useRoute()
const router = useRouter()

// 平滑滾動到區塊
function scrollToSection(section: 'home' | 'works' | 'contact') {
    router.replace({ hash: `#${section}` })  // 更新 URL hash
    let el: HTMLElement | null = null
    if (section === 'home') el = homeRef.value
    if (section === 'works') el = worksRef.value
    if (section === 'contact') el = contactRef.value
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// 當 hash 改變時自動滾動
watch(
    () => route.hash,
    (newHash) => {
        const section = newHash.replace('#', '')
        scrollToSection(section as 'home' | 'works' | 'contact')
    }
)

// 頁面初次載入，根據 hash 自動滾動
onMounted(() => {
    if (route.hash) {
        const section = route.hash.replace('#', '')
        scrollToSection(section as 'home' | 'works' | 'contact')
    }
})
</script>
