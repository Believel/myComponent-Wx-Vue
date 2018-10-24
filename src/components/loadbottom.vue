<template>
  <div class="loadbottom">
    <div class="showbottom">
      <img v-bind:style="[styleObject1, styletrans]"  src="../../static/img/bottom_left.png"/>
      <span v-bind:style="[stylespan, styletrans]">已经到底了</span>
      <img v-bind:style="[styleObject2, styletrans]"  src="../../static/img/bottom_right.png"/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'loadbottom',
  props : ['bindid'],
  data () {
    return {
      stylespan:{
        'top':'0'
      },
      styletrans:{
        '-webkit-transition':'0s'
      },
      styleObject1:{
        '-webkit-transform':'rotate(0deg)'
      },
      styleObject2:{
        '-webkit-transform':'rotate(0deg)',
      },
      startY:'',
      moveY:''
    }
  },
  methods : {
    startfn(e){
      let touch = e.touches[0]; 
      this.startY = touch.screenY;
      this.styletrans['-webkit-transition'] = '0s';
    },
    movefn(e){
      let touch = e.touches[0]; 
      this.moveY = touch.screenY-this.startY;
      // 向上滑动
      if(this.moveY<0&&this.moveY>-35){
        let move1 = this.moveY;
        let move2 = -this.moveY;

        this.stylespan['top'] = move1/40+'rem';
        this.styleObject1['-webkit-transform'] = 'rotate('+move1+'deg)';
        this.styleObject2['-webkit-transform'] = 'rotate('+move2+'deg)';
      }
    },
    endfn(e){
      this.styletrans['-webkit-transition'] = '0.5s';
      this.styleObject1['-webkit-transform'] = 'rotate(0deg)';
      this.styleObject2['-webkit-transform'] = 'rotate(0deg)';
      this.stylespan['top'] = '0';
    }
  },
  mounted(){
    // 从父级得到父级最外层盒子容器元素
    let _dom = document.getElementById(this.bindid);

    // 清除触摸事件
    _dom.removeEventListener("touchstart", this.startfn);
    _dom.removeEventListener("touchmove", this.movefn);
    _dom.removeEventListener("touchend", this.endfn);

    // 触发触摸事件
    _dom.addEventListener("touchstart", this.startfn);
    _dom.addEventListener("touchmove", this.movefn);
    _dom.addEventListener("touchend", this.endfn);

  }
}

</script>

<style lang="scss" scoped>
  .loadbottom{
    position:relative;
    width:100%;
    .showbottom{
      text-align: center;
      background-color: #f5f5f5;
      height: 86.4px;
      line-height: 86.4px;
      font-size: 28px;
      color: #999;
      >span{
        position:relative;
      }
      >img{
        position: relative;
        top: -3.2px;
        width: 8%;
      }
      >img:nth-child(1){
        right: 16px;
        transform-origin: left;
      }
      >img:nth-child(3){
        left: 16px;
        transform-origin: right;
      }
    }
  }
</style>
