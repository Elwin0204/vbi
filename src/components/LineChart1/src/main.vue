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
    legend: {
      right: 30,
      data: [
        {
          name: "今日",
          textStyle: {
            color: "#94fbc0",
          },
        },
        {
          name: "昨日",
          textStyle: {
            color: "#99e9fd",
          },
        },
      ],
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
      max: 120,
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
        name: "今日",
        data: [
          {
            value: 42,
            symbolSize: 0,
          },
          {
            value: 30,
            symbolSize: 10,
            symbol: "path://M0.5 50a49.5 50 0 1 0 99 0a49.5 50 0 1 0 -99 0z M20 50a30 30 0 1 0 60 0a30 30 0 1 0 -60 0z",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 38,
            symbolSize: 0,
          },
          {
            value: 60,
            symbolSize: 0,
          },
          {
            value: 50,
            symbolSize: 0,
          },
          {
            value: 40,
            symbolSize: 0,
          },
          {
            value: 50,
            symbolSize: 0,
          },
          {
            value: 85,
            symbolSize: 10,
            symbol: "path://M0.5 50a49.5 50 0 1 0 99 0a49.5 50 0 1 0 -99 0z M20 50a30 30 0 1 0 60 0a30 30 0 1 0 -60 0z",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 112,
            symbolSize: 0,
          },
          {
            value: 95,
            symbolSize: 10,
            symbol: "path://M0.5 50a49.5 50 0 1 0 99 0a49.5 50 0 1 0 -99 0z M20 50a30 30 0 1 0 60 0a30 30 0 1 0 -60 0z",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 60,
            symbolSize: 0,
          },
          {
            value: 32,
            symbolSize: 0,
          },
          {
            value: 45,
            symbolSize: 0,
          },
          {
            value: 58,
            symbolSize: 0,
          },
          {
            value: 22,
            symbolSize: 0,
          },
        ],
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#94fbc0",
          shadowColor: "#94fbc0",
          shadowBlur: 12,
        },
        itemStyle: {
          color: "#94fbc0",
        },
      },
      {
        name: "昨日",
        data: [60, 83, 96, 100, 92, 75, 60, 55, 68, 78, 70, 60, 80, 90, 63],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#99e9fd",
          shadowColor: "#99e9fd",
          shadowBlur: 12,
        },
        itemStyle: {
          color: "#99e9fd",
        },
      },
    ],
  };
}

function initView() {
  initOpt();
  const chartDom = document.getElementById("JS_LineChart1");
  const areaChart = echarts.init(chartDom);
  option && areaChart.setOption(option);
}
</script>

<template>
  <div
    class="line-chart1"
    id="JS_LineChart1"
    style="width: 382px; height: 180px"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
