<template>
    <div class="list-container" id="listcontainer">
        <!-- 
            v-infinite-scroll 无限滚动
            infinite-scroll-disabled:为true值，无限滚动不会触发
            infinite-scroll-immediate-check：为true,则指令被绑定到元素上后会立即检查是否需要执行加载方法。在初始状态下内容有可能撑不满容器时十分有用。
            infinite-scroll-distance="10" 触发加载方法的滚动距离阈值(像素)
         -->
        <ul
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-immediate-check="false"
            infinite-scroll-distance="10">
            <li v-for="(item, index) in insuranListResult" :key="index" class="insurancewrapper">
                <div class="insurancewrapper_top">
                    <div class="insuranceimg"><img :src="item.indexImage" alt=""/></div>
                    <div class="blank"></div>
                    <div class="insurancename">{{item.companyName}}</div>
                    <div class="insuracetitle">
                        <h2 v-html="item.productName"></h2>
                        <!-- <p class="line"></p> -->
                    </div>
                    <p class="desc" :class="{description: item.productName.indexOf('<br') != -1}">{{item.productSubtitle}}</p>
                    <div class="yuan"  :class="{yuan1: item.productName.indexOf('<br') != -1}"><span>￥</span>{{item.minPremium}}<span style="color:#2A2A2A">起</span></div>
                </div>
                <div class="insurancewrappernum">
                    <div class="numcontent">
                        <div class="num">{{item.maxGuarantee}}元</div>
                        <div class="desc">最高保障</div>
                    </div>
                    <div class="numcontent">
                        <div class="num">{{item.forPeople}}</div>
                        <div class="desc">保障范围</div>
                    </div>
                    <div class="numcontent numcontentnone">
                        <div class="num">{{item.insuranceDuration}}</div>
                        <div class="desc">保障期限</div>
                    </div>
                </div>
                <div class="insurancewrapperbtn">
                    了解详情
                </div>
            </li>
        </ul>
        <!-- 加载中组件 -->
        <div @click="loaderror"><loadingcmp v-show="loading" :tiptext="tipText"></loadingcmp></div>
        <!-- 加载结束组件 -->
        <loadbottom v-show="showbottom" :bindid="bindid"></loadbottom> 
    </div>
</template>
<script>
    import {get_InsuranceList} from '@/api.js';     // 获取列表接口
    import util from '@/util/util.js';              // 工具库
    import loadbottom from '@/components/loadbottom'; // 加载到底组件
    import loadingcmp from '@/components/loadingcmp'; // 加载中组件
    export default {
        name: 'list',
        data() {
            return {
                pagenum: 1,         // 第一页
                pageSize: 4,       // 每页的条数
                pages: '',          // 当页总条数

                lastnum: 'no',      // 最后滚动加载的条数
                showbottom: false,  // 是否显示已经到底了的页面
                bindid: 'listcontainer', // 本页面最外层的盒子id值

                tipText: '加载中...', // 滚动加载过程的文本
                tipStatus: 1,        // 加载过程的状态 1加载中，0加载失败，可以重新点击加载
                loading: false,      // 是否加载

                insuranList:[],             // 获取数据列表
                insuranListResult: []

            }
        },
        mounted() {
            // 首次请求列表接口
            util.vueEvent.$emit('showloading')
            this.getInsuranceList({
                "insuranceType": '1',
                "pageNum": this.pagenum,
                "pageSize": this.pageSize
            })
        },
        methods: {
             // 获取列表
            async getInsuranceList(params) {
                try {
                    // loading显示
                    let result = await get_InsuranceList(params);
                    // 如果是第一页，就让列表数据设置为空数组
                    if (params.pageNum === 1) {
                        this.insuranList = [];
                    }
                    if (result.data.code === 0) {
                        // 第一页有数据时
                        if (result.data.data.list.length > 0) {
                            // 拼接数组数据
                            this.insuranList = this.insuranList.concat(result.data.data.list);
                            this.insuranListResult = this.insuranList;
                            console.log( this.insuranListResult);
                            for (let i =0; i < this.insuranListResult.length; i++) {
                                let curInsurance = this.insuranListResult[i];
                                if (curInsurance.productName.length> 6) {
                                    curInsurance.productName = curInsurance.productName.substr(0, 6) + '<br>' + curInsurance.productName.substr(6);
                                    if (curInsurance.productName.indexOf('<br') != -1) {
                                        this.$nextTick(() => {
                                            $('.description').css({'top': '116px'});
                                            $('.yuan1').css({'top': '120px'});
                                        })
                                    }
                                }
                            }
                            // 滚动时的加载状态取消
                            this.loading = false;
                            // 设置当页总条数
                            this.pages = result.data.data.pages;
                            // 设置最后的数据为当前页的条数
                            this.lastnum = result.data.data.list.length;
                        } else {
                           // 第一页页无数据
                            this.insuranList = [];
                            this.insuranListResult = [];
                        }
                    }
                    
                } catch (error) {
                    this.tipText = '加载失败，点击重新加载';
                    this.tipstatus = 0;
                } finally {
                    // loading隐藏
                    util.vueEvent.$emit('disloading');
                }
            },
            // 加载更多
            loadMore() {
                if (this.lastnum != 'no') {
                    // 总页数不为空 并且 当前页小于总页数，说明还可以继续加载
                    if (this.pages != '' && this.pagenum < this.pages) {
                        this.loading = true;
                        this.pagenum++;
                        this.getInsuranceList({
                            "insuranceType": '1',
                            "pageNum": this.pagenum,
                            "pageSize": this.pageSize
                        })
                    } else {
                        // 显示到底样式
                        this.showbottom = true;
                    }
                } 
            },
            // 加载失败
            loaderror() {
                if (this.tipstatus=== 0) {
                    this.getInsuranceList({
                        "insuranceType": '1',
                        "pageNum": this.pagenum,
                        "pageSize": this.pageSize
                    })
                }
            }
        },
        components: {
            loadbottom,
            loadingcmp
        }
    }
</script>

<style lang="scss" scoped>
    .list-container {
        .insurancewrapper {
            margin: 30px 20px 0 20px;
            background: #ffffff;
            border-radius: 10px;
            padding-bottom: 30px;
            .insurancewrapper_top {
                height: 350px;
                padding-left: 40px;
                position: relative;
                .insuranceimg {
                    @include mask();
                    height: 350px;
                    width: 100%;
                    img {
                        width: 100%;
                        height: 100%; 
                    }
                }
                .blank {
                    height: 20px;
                }
                .insurancename {
                    position: absolute;
                    height: 34px;
                    line-height: 34px;
                    padding: 8px 10px;
                    border: 1px solid #10C485;
                    color: #10C485;
                    font-size: $font12;
                    text-align: center;
                    border-radius: 4px;
                }
                .insuracetitle {
                    position: absolute;
                    top: 106px;
                    display: inline-block;
                    h2 {
                        font-size: 40px;
                        color: #333333; 
                        font-family: 'PingFangSC-Semibold';
                    }
                    .line {
                        height: 12px;
                        width:100%;
                        border-radius: 8px;
                        background-color: #AFE7B9;
                    }
                }
                .desc {
                    position: absolute;
                    top: 178px;
                    color: $grey_c;
                    font-size: $font12;
                }
                .yuan {
                    position: absolute;
                    top: 210px;
                    line-height: 140px;
                    font-family: 'PingFangSC-Semibold';
                    font-size: 48px;
                    color: #009F5D;
                    span {
                        font-size: $font12;
                    }
                }
            }
            .insurancewrappernum {
                margin-top: 30px;
                display: flex;
                 .numcontent {
                    flex: 1;
                    border-right: 1px solid #D8D8D8;
                    text-align: center;
                    .num {
                        color: #333333;
                        font-size: 32px;
                    }
                    .desc {
                        margin-top: 20px;
                        color: #999999 ;
                        font-size: 24px;
                    }
                }
                .numcontentnone {
                    border-right: none;
                }
                
            }
            .insurancewrapperbtn {
                margin: 30px 30px 0 30px;
                background-color: #00AE66;
                color: #ffffff;
                height: 90px;
                line-height: 90px;
                border-radius: 10px;
                font-size: 36px;
                text-align: center;
            }
        }
    }
</style>