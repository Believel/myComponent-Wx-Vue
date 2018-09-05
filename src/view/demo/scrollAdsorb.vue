<template>
    <div class="adsorb-container">
        <div class="header">
            <img src="../../assets/img/banner.png" alt="" class="imgs">
        </div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">未缴费</mt-tab-item>
            <mt-tab-item id="2">已缴费</mt-tab-item>
            <mt-tab-item id="3">待审核</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <mt-cell v-for="n in 10" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-cell v-for="n in 4" :title="'content ' + n" />
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-cell v-for="n in 6" :title="'content ' + n" />
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                selected: '1'
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
    }
</style>
