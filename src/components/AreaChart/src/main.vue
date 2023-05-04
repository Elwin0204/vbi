<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";
let option;
defineProps({
  charts: String,
});

onMounted(() => {
  initView();
});

function initOpt() {
  option = {
    grid: {
      left: 30,
      right: 30,
      bottom: 15,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "transparent",
      padding: 0,
      borderWidth: 0,
      formatter: function (params) {
        const oldVal = params[0].data;
        const newVal = params[1].data;
        let result = '';
        if (oldVal == 0) {
          result = '分母为0';
        } else if (newVal - oldVal > 0) {
          result = `同比增长${Math.floor(((newVal-oldVal) / oldVal) * 100)}%`;
        } else {
          result = `同比下降${Math.floor(((oldVal - newVal) / oldVal) * 100)}%`;
        }
        
        return '<div style="margin: 0 -10px;padding: 6px 16px;color: #fff;font-size:14px;border-radius: 16px 0px 16px 16px;background-image: linear-gradient(to right bottom, #58a8f1, #3753cc);">' + result + '</div>';
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
      ],
    },
    yAxis: {
      type: "value",
      max: 100,
      min: 0,
      interval: 20,
      splitLine: {
        lineStyle: {
          opacity: 0.3,
          width: 1,
        },
      },
    },
    series: [
      {
        data: [0, 48, 46, 38, 65, 90, 65, 35, 45, 70, 56, 40, 30, 40, 0],
        type: "line",
        smooth: true,
        areaStyle: {
          color: "#60a6ef",
        },
        lineStyle: {
          color: "#60a6ef",
        },
        itemStyle: {
          color: "#60a6ef",
        },
      },
      {
        data: [0, 22, 60, 43, 41, 55, 80, 100, 80, 52, 38, 47, 68, 50, 0],
        type: "line",
        smooth: true,
        areaStyle: {
          color: "#5fbc89",
        },
        lineStyle: {
          color: "#5fbc89",
        },
        itemStyle: {
          color: "#5fbc89",
        },
      },
    ],
  };
}

function initView() {
  initOpt();
  const chartDom = document.getElementById("JS_AreaChart");
  const areaChart = echarts.init(chartDom);
  option && areaChart.setOption(option);
}
</script>

<template>
  <div
    class="area-chart"
    id="JS_AreaChart"
    style="width: 382px; height: 180px"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
