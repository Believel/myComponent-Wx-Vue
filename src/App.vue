<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
import router from './router';
export default {
    name: 'App',
    data() {
        return {}
    },
    components: {},
    mounted() { },
    methods: {}
}
</script>

<style lang="scss">
/* 全局resetCss 重置 */
@import './assets/css/resetCss.css';
#app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
</style>
