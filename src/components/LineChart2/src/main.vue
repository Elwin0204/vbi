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
    title: {
      text: ["{a|人员流动}", "{b|}"].join('\n'),
      left: 30,
      textStyle: {
        rich: {
          a: {
            color: "#fff",
            fontSize: 16,
            fontWeight: 'bold',
            padding: [0, 0, 5, 0]
          },
          b:{
            width: 75,
            height: 0,
            borderWidth: 2,
            borderColor: '#4974ef'
          }
        },
      },
    },
    grid: {
      left: 30,
      right: 30,
      bottom: 15,
      top: 50,
      containLabel: true,
    },
    legend: {
      right: '10%',
      data: [
        {
          name: "来访",
          textStyle: {
            color: "#94fbc0",
          },
        },
        {
          name: "出行",
          textStyle: {
            color: "#99e9fd",
          },
        },
      ],
    },
    tooltip: {
      show: true,
      trigger: "axis",
      backgroundColor: "transparent",
      padding: 0,
      borderWidth: 0,
      formatter: function (params) {
        const text1 = `${params[0].seriesName}: ${params[0].data}`;
        const text2 = `${params[1].seriesName}: ${params[1].data}`;

        return (
          '<div style="margin: 0 -10px;padding: 6px 16px;color: #fff;font-size:14px;border-radius: 16px 0px 16px 16px;background-image: linear-gradient(to right bottom, #58a8f1, #3753cc);"><div>' +
          text1 +
          "</div><div>" +
          text2 +
          "</div></div>"
        );
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "02-02",
        "02-24",
        "03-09",
        "03-29",
        "04-28",
        "04-30",
        "05-06",
        "06-23",
        "06-29",
        "07-07",
      ],
    },
    yAxis: {
      type: "value",
      interval: 50,
      splitLine: {
        lineStyle: {
          opacity: 0.3,
          width: 1,
        },
      },
    },
    series: [
      {
        name: "来访",
        data: [150, 35, 60, 110, 50, 90, 25, 120, 85, 45],
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#94fbc0",
              },
              {
                offset: 1,
                color: "#121f35",
              },
            ],
            globalCoord: false,
          },
          opacity: 0.3,
        },
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
        name: "出行",
        data: [75, 55, 125, 85, 75, 15, 70, 102, 49, 128],
        type: "line",
        areaStyle: {
          color: {
            type: "linear",
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: "#99e9fd",
              },
              {
                offset: 1,
                color: "#121f35",
              },
            ],
            globalCoord: false,
          },
          opacity: 0.3,
        },
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
  const chartDom = document.getElementById("JS_LineChart2");
  const areaChart = echarts.init(chartDom);
  option && areaChart.setOption(option);
}
</script>

<template>
  <div class="line-chart2" id="JS_LineChart2" style="height: 180px"></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
