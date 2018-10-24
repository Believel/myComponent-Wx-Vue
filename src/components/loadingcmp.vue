<template>
  <div class="loadingcmp">
    <div class="showloading"><img src="../../static/img/moreloading.gif" v-show="tiptext=='加载中...'"/>{{tiptext}}</div>
  </div>
</template>

<script>

export default {
  name: 'loadingcmp',
  props : ['tiptext'],
  data () {
    return {
      
    }
  },
  methods : {
    
  },
  mounted(){
      
  }
}

</script>

<style lang="scss" scoped>
  .loadingcmp{
    position:fixed;
    width:100%;
    bottom:0;
    .showloading{
      background-color:#f5f5f5;
      height: 86.4px;
      line-height: 86.4px;
      font-size: 28px;
      color: #999;
      text-align: center;
      >img:nth-child(1){
        position: relative;
        top: 9.6px;
        right: 16px;
        width: 5%;
      }
    }
  }
</style>
