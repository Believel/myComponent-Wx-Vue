<template>
  <div class="calendar-container">
    <div class="top">
      <li
        class="pre"
        @click="PreMonth(myDate,false)"
      >
      </li>
      <li class="toptext">{{dateTop}}</li>
      <li
        class="next"
        @click="NextMonth(myDate,false)"
      >
      </li>
    </div>
    <div class="content">
      <div
        class="content-item"
        v-for="(tag,index) in textTop"
      >
        <div class="tag">{{tag}}</div>
      </div>
    </div>
    <div class="content">
      <div
        class="content-item"
        v-for="(item,index) in list"
        :key="index"
        @click="clickDay(item,index)"
      >
        <div
          class="date"
          :class="{'isMark': item.isMark, 'istoday': item.isToday, 'isselect': item.chooseDay && !item.isToday, 'isSelecttoday': item.chooseDay && item.isToday,'istodayMark': todayMark && item.isToday,'ishide': item.otherMonth !== 'nowMonth', 'iswanthide': item.dayHide}"
        >
          {{item.isToday ? '今' : item.id}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import timeUtil from "@/util/tools/calendar.js";
export default {
  name: "calendar",
  props: {
    //  已经有的记录
    markDate: {
      type: Array,
      default: () => []
    },
    markDateMore: {
      type: Array,
      default: () => []
    },
    textTop: {
      type: Array,
      default: () => ["日", "一", "二", "三", "四", "五", "六"]
    },
    // 是否‘日’开头
    sundayStart: {
      type: Boolean,
      default: () => false
    },
    agoDayHide: {
      type: String,
      default: "0"
    },
    futureDayHide: {
      type: String,
      default: "2554387200"
    },
    todayMark: {
      // 默认今天选中
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      list: [],
      myDate: [],
      historyChose: [],
      dateTop: ""
    };
  },
  mounted() {
    this.intStart();
    this.myDate = new Date();
    this.getList(this.myDate);
  },
  methods: {
    intStart() {
      timeUtil.sundayStart = this.sundayStart;
    },
    setClass(data) {
      let obj = {};
      obj[data.markClassName] = data.markClassName;
      return obj;
    },
    clickDay: function(item, index) {
      if (item.otherMonth === "nowMonth" && !item.dayHide) {
        this.getList(this.myDate, item.date);
      }
      if (item.otherMonth !== "nowMonth") {
        item.otherMonth === "preMonth"
          ? this.PreMonth(item.date)
          : this.NextMonth(item.date);
      }
    },
    ChoseMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = new Date(date);
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    PreMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      // 上月日期
      this.myDate = timeUtil.getOtherMonth(this.myDate, "preMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    NextMonth: function(date, isChosedDay = true) {
      date = timeUtil.dateFormat(date);
      this.myDate = timeUtil.getOtherMonth(this.myDate, "nextMonth");
      this.$emit("changeMonth", timeUtil.dateFormat(this.myDate));
      if (isChosedDay) {
        this.getList(this.myDate, date, isChosedDay);
      } else {
        this.getList(this.myDate);
      }
    },
    forMatArgs: function() {
      let markDate = this.markDate;
      let markDateMore = this.markDateMore;
      markDate = markDate.map(k => {
        return timeUtil.dateFormat(k);
      });
      markDateMore = markDateMore.map(k => {
        k.date = timeUtil.dateFormat(k.date);
        return k;
      });
      return [markDate, markDateMore];
    },
    getList: function(date, chooseDay, isChosedDay = true) {
      // 转化格式都为：例如 2018/12/1
      const [markDate, markDateMore] = this.forMatArgs();

      // 获得顶部的年月分：例如 2018年12月
      this.dateTop = `${date.getFullYear()}年${date.getMonth() + 1}月`;

      // 获取要渲染的列表
      let arr = timeUtil.getMonthList(this.myDate);
      for (let i = 0; i < arr.length; i++) {
        let markClassName = "";
        let k = arr[i];
        k.chooseDay = false;
        const nowTime = k.date;
        const t = new Date(nowTime).getTime() / 1000;
        //看每一天的class
        for (const c of markDateMore) {
          if (c.date === nowTime) {
            markClassName = c.className || "";
          }
        }
        //标记选中某些天 设置class
        k.markClassName = markClassName;
        k.isMark = markDate.indexOf(nowTime) > -1;
        //无法选中某天
        k.dayHide = t < this.agoDayHide || t > this.futureDayHide;
        if (k.isToday) {
          this.$emit("isToday", nowTime);
        }
        // 如果是当前月
        let flag = !k.dayHide && k.otherMonth === "nowMonth";
        if (chooseDay && chooseDay === nowTime && flag) {
          // 派发当前月的选中天事件
          this.$emit("choseDay", nowTime);
          this.historyChose.push(nowTime);
          k.chooseDay = true;
        } else if (
          this.historyChose[this.historyChose.length - 1] === nowTime &&
          !chooseDay &&
          flag
        ) {
          k.chooseDay = true;
        }
      }
      this.list = arr;
    }
  },
  watch: {
    markDate: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    markDateMore: {
      handler(val, oldVal) {
        this.getList(this.myDate);
      },
      deep: true
    },
    agoDayHide: {
      handler(val, oldVal) {
        this.agoDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    futureDayHide: {
      handler(val, oldVal) {
        this.futureDayHide = parseInt(val);
        this.getList(this.myDate);
      },
      deep: true
    },
    sundayStart: {
      handler(val, oldVal) {
        this.intStart();
        this.getList(this.myDate);
      },
      deep: true
    }
  }
};
</script>
<style lang="scss" scoped>
.calendar-container {
  background-color: #ffffff;
  width: 100%;
  .top {
    text-align: center;
    display: flex;
    padding: 60px 0;
    li {
      list-style: none;
      flex: 1;
      align-items: center;
    }
    .pre {
      text-align: right;
      background-image: url("../assets/img/icon_zuo.png");
      background-size: 44px 44px;
      background-repeat: no-repeat;
      background-position: right center;
      // img {
      //     width: 44px;
      //     height: 44px;
      //     vertical-align: middle;
      // }
    }
    .toptext {
      font-size: 37px;
      font-weight: 500;
      color: #333333;
      flex: 0 0 302px;
      width: 302px;
      height: 44px;
      line-height: 44px;
      font-family: PingFangSC-Medium;
    }
    .next {
      text-align: left;
      background-image: url("../assets/img/icon_you.png");
      background-size: 44px 44px;
      background-repeat: no-repeat;
      background-position: left center;
      // img {
      //     width: 44px;
      //     height: 44px;
      //     vertical-align: middle;
      // }
    }
  }
  .content {
    padding-left: 40px;
    padding-right: 40px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    .content-item {
      text-align: center;
      margin-right: 16px;
      margin-bottom: 12px;
      &:nth-child(7n) {
        margin-right: 0;
      }
      .tag,
      .date {
        width: 80px;
        height: 80px;
        line-height: 80px;
        margin: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333333;
        font-size: 32px;
        box-sizing: border-box;
      }
      .date {
        border-radius: 50%;
      }
      .isMark {
        border: 3px solid rgba(0, 174, 102, 1);
        box-shadow: 0px 13px 18px 0px rgba(204, 204, 204, 1);
      }
      .istoday {
        color: #00ae66;
      }
      .isSelecttoday,
      .istodayMark {
        background-color: rgba(0, 174, 102, 1);
        box-shadow: 0px 13px 18px 0px rgba(204, 204, 204, 1);
        color: #ffffff;
      }
      .isselect {
        background-color: #efeff4;
        box-shadow: 0px 13px 18px 0px rgba(204, 204, 204, 1);
      }
      .ishide,
      .iswanthide {
        color: #999999;
      }
    }
  }
}
</style>