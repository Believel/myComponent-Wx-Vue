<template>
    <div id="app">
        <loading v-show="showLoading"></loading>
        <router-view/>
    </div>
</template>

<script>
import router from './router';
import loading from '@/components/loading';
import util from './util/util.js'
export default {
    name: 'App',
    data() {
        return {
            showLoading: false
        }
    },
    components: {
        loading
    },
    created() {
        util.vueEvent.$on("showloading", () => {
            this.showLoading = true;
        });
        util.vueEvent.$on("disloading", () => {
            this.showLoading = false;
        });
    },
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
