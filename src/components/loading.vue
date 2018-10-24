<template>
  <div class="loading">
    <div class="loadingimg">
      <img src="../../static/img/shuaxin1.gif" alt="">
      <p>努力加载中<span class="point">{{point}}</span></p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loading',
  props : [],
  data () {
    return {
       point: ''
    }
  },
  methods : {
    countSecond() {
      this.point = (this.point == '...') ? '.': (this.point + '.');
      
    }
  },
  mounted(){
    setInterval(this.countSecond, 300);
  }
}

</script>

<style lang="scss" scoped>
  .loading{
    z-index: 3000;
    position: fixed;
    width:100%;
    height:100%;
    .loadingimg{
      position:relative;
      top: 50%;
      left: 50%;
      margin-left: -130px;
      margin-top: -130px;
      width: 260px;
      height: 260px;
      background-color:#ffffff;
      box-shadow: 0px 0px 46px rgba(0, 0, 0, .2);
      border-radius: 50px;
      img {
        position: absolute;
        top: 16px;
        left: 50%;
        margin-left: -60px;
        width: 120px;
        height: 187px;
      }
      p {
        position: absolute;
        bottom: 16px;
        text-align: center;
        left: 50px;
        color: #666666;
        font-size: 28px;
      }
    }
  }
</style>
