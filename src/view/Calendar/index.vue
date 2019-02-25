<template>
  <div class="helprecordlist">
    <calendar
      ref="calendar"
      :todayMark="todayMark"
      :sunday-start="true"
      :mark-date="arr"
      @choseDay="clickDay"
      @changeMonth="changeDate"
    ></calendar>
  </div>
</template>
<script>
import Calendar from "@/components/Calendar.vue";
import timeUtil from "@/util/tools/calendar.js";

export default {
  data() {
    return {
      arr: ["2019/2/10"], // 总的帮扶记录数据 例如['2018/12/11', '2018/12/12', '2018/12/22']
      todayMark: true // 默认是否选中今天
    };
  },
  computed: {},
  mounted() {},
  methods: {
    clickDay(data) {
      console.log("点击天获得日期是：" + data);
    },
    changeDate(data) {
      console.log("点击切换按钮获得下一月" + data);
    }
  },
  components: {
    Calendar
  }
};
</script>
<style lang="scss" scoped>
.helprecordlist {
  width: 100%;
  height: 100%;
}
</style>