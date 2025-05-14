<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
onMounted(() => {
    document.documentElement.setAttribute('theme-mode', 'dark')
})
</script>

<template>
    <RouterView />
</template>

<style scoped lang="css"></style>
