<template>
    <div id="homePage">
        <div>项目使用库 mint-ui z-zepto vuex sass axios remtopx</div>
        <img class="titleImg" src="../assets/logo.png"> 1.vue图标为750px自动转换为23.4375rem
        <p>------------------------------</p>
        <div class="center">2.我使用sass @include center居中</div>
        <HelloWorld title="组件:HelloWorld"></HelloWorld>
        <p>------------------------------</p>
        <p>4.这里使用了vuex name: {{name}}</p>
        <p>------------------------------</p>
        <button v-on:click="changeName('改变了值')">5.点击我改变vuex值</button>
        <p>------------------------------</p>
        <button v-on:click="getBaidu()">6.点击发送get请求 并且打印config.js</button>
        <p>------------------------------</p>
        <button v-on:click="postBaidu()">7.点击发送post请求</button>
        <p>------------------------------</p>
        <p>--------- 通用组件样例 ---------</p>
        <p>------------------------------</p>
        <p>图片上传组件</p>
        <UploadImg @changeImg="getImg"></UploadImg>
        <UploadImg @changeImg="getImg2"></UploadImg>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import config from '@/config.js';
import { setTimeout } from 'timers';

//引入vuex
import { mapMutations, mapState } from 'vuex'

import HelloWorld from "@/components/HelloWorld.vue";
import UploadImg from "@/components/common/UploadImg.vue";

import {
    get_baidu,
    post_baidu
} from '@/api.js';

export default {
    name: 'HomePage',
    props: [],
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },
    computed: {
        /* 使用mapMutaions遍历vuex里的mutations */
        ...mapState([
            'name'
        ])
    },
    components: {
        HelloWorld,
        UploadImg
    },
    mounted() {
        Toast('欢迎使用基础模板!本模板根据设计图输入2X,px即可，会自动转换rem。');
    },
    methods: {
        /* 使用mapMutaions遍历vuex里的mutations */
        ...mapMutations([
            'changeName'
        ]),
        async getBaidu() {
            /* ajax请求演示 使用es7 async await */
            try {
                var result = await get_baidu({ hehe: 1 });
            } catch (error) {
                console.log(error);
            }
            /* 这里使用了config 会合成环境静态变量以及通用静态变量 */
            Toast("发送ajax请求，打印全局静态变量去控制台查看");
            console.log("全局静态变量", config);
        },
        async postBaidu() {
            /* ajax请求演示 使用es7 async await */
            try {
                var result = await post_baidu({ hehe: 1 });
            } catch (error) {
                console.log(error);
            }
        },
        getImg({ base64,blob,imgFile }) {
            /* 获取压缩后的图片 base64格式 blob格式 和imgFile */
            /* 建议只是用blob格式上传图片 base64文件过大在某些手机上会上传失败 */
            console.log(base64,blob,imgFile);
        },
        getImg2({ base64,blob,imgFile }) {
            /* 获取压缩后的图片 base64格式 blob格式 和imgFile */
            /* 建议只是用blob格式上传图片 base64文件过大在某些手机上会上传失败 */
            console.log(base64,blob,imgFile);
        }
    },
}
</script>

<style lang="scss" scope>
#homePage {
    text-align: center;
    .center {
        @include center();
        color: $black_c;
    }
    .titleImg {
        width: 750px;
    }
    button {
        border: 1px solid;
        cursor: pointer;
        background: $white_b;
    }
}
</style>
