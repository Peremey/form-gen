<template>
    <div class="loader">
        <div :style="'--i:' + i" v-for="i of 8"></div>
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/loader';
</style>
