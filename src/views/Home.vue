<template>
    <div class="w-full flex gap-[20px] p-[20px]">
        <div
            class="cursor-pointer hover:bg-[#272727] w-[300px] h-[50px] rounded-[4px] leading-[50px] text-center bg-[#181818] shadow-md"
            v-for="(item, index) in routes"
            @click="router.push(item.path)"
            :key="index"
        >
            {{ item.name }}
        </div>
    </div>
</template>

<script setup>
import { routes } from '@/router'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style lang="scss" scoped></style>
