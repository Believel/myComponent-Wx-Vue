<template>
    <div class="adsorb-container" ref="container">
        <div class="header">
            <img src="../../assets/img/banner.png" alt="" class="imgs">
        </div>
        <mt-navbar v-model="selected" ref="tabs" :class="{'searchtab':searchBarFixed}">
            <mt-tab-item id="1">未缴费</mt-tab-item>
            <mt-tab-item id="2">已缴费</mt-tab-item>
            <mt-tab-item id="3">待审核</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected" >
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 30" :key="n" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :key="n" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :key="n" :title="'content ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '1',
                searchBarFixed: false,   // tab标签是否固定
            }
        },
        created() {
            
        },
        mounted() {
            console.log('mounted')
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed () {
            console.log('destroyed')
            // 离开页面移除滚动事件
            window.removeEventListener('scroll', this.handleScroll)

        },
        methods: {
            // 滚动事件
            handleScroll() {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                let offsetTop = this.$refs.tabs.$el.offsetTop;
                // 当滚动高度大于比较元素滚动的高度，就设置比较元素为固定顶部
                console.log(scrollTop)
                if (scrollTop > offsetTop) {
                    this.searchBarFixed = true;
                } else {
                    this.searchBarFixed = false;
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .adsorb-container {
        .header {
            width: 100%;
            .imgs {
                height: 440px;
                width: 100%;
            }
        }
        .searchtab {
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 9999;
        }
    }
</style>
