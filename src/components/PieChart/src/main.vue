<script setup>
import { onMounted, getCurrentInstance, ref, shallowRef, nextTick } from "vue";
import * as echarts from "echarts";
const { Bus }  = getCurrentInstance().appContext.config.globalProperties;

const REF_PieChart = shallowRef();
const chartIns = shallowRef();
const CH = ref(0);
const CW = ref(0);

onMounted(() => {
  Bus.on('resize', async (res) => {
    const { chart: { chartW, chartH } } = res;
    CH.value = chartH;
    CW.value = chartW;
    await nextTick();
    initView(initOpt());
  });
});

const themes = [
  {
    c1: "rgba(148, 251, 192, 1)",
    c2: "rgba(40, 79, 107, 0.3)",
  },
  {
    c1: "rgba(246, 242, 147, 1)",
    c2: "rgba(86, 94, 95, 0.3)",
  },
  {
    c1: "rgba(157, 197, 255, 1)",
    c2: "rgba(42, 60, 120, 0.3)",
  },
  {
    c1: "rgba(165, 141, 67, 1)",
    c2: "rgba(207, 195, 57, 1)",
  },
  {
    c1: "rgba(27, 123, 209, 1)",
    c2: "rgba(41, 189, 220, 1)",
  },
  {
    c1: "rgba(24, 170, 86, 1)",
    c2: "rgba(40, 227, 213, 1)",
  },
];

function initOpt() {
  return {
    title: {
      text: "等级评分",
      textStyle: {
        color: "#f7f4f3",
        fontSize: 12,
      },
      left: "33%",
      bottom: 10,
    },
    legend: {
      orient: "vertical",
      right: 15,
      top: "middle",
      // doesn't perfectly work with our tricks, disable it
      selectedMode: false,
      textStyle: {
        color: "#fffcff",
      },
      icon: "circle",
    },
    series: [
      {
        type: "pie",
        emphasis: {
          scale: false
        },
        radius: ["50%", "70%"],
        center: ["40%", "55%"],
        startAngle: -171,
        label: {
          show: true,
          formatter: "{d}",
        },
        itemStyle: {
          color: function (params) {
            return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
              {
                offset: 0,
                color: themes[params.dataIndex].c1,
              },
              {
                offset: 1,
                color: themes[params.dataIndex].c2,
              },
            ]);
          },
        },
        data: [
          {
            value: 58,
            name: "道路安全",
            label: {
              show: true,
              color: themes[0].c1,
              formatter: "{d}",
            },
            labelLine: {
              lineStyle: {
                type: "dashed",
                width: 2,
                color: themes[0].c1,
              },
            },
          },
          {
            value: 43,
            name: "警报部署",
            label: {
              show: true,
              color: themes[1].c1,
              formatter: "{d}",
            },
            labelLine: {
              lineStyle: {
                type: "dashed",
                width: 2,
                color: themes[1].c1,
              },
            },
          },
          {
            value: 49,
            name: "电器设备",
            label: {
              show: true,
              color: themes[2].c1,
              formatter: "{d}",
            },
            labelLine: {
              lineStyle: {
                type: "dashed",
                width: 2,
                color: themes[2].c1,
              },
            },
          },
          {
            // make an record to fill the bottom 50%
            value: 38.22,
            itemStyle: {
              // stop the chart from rendering this piece
              color: "rgb(64, 79, 178, 0.2)",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
          {
            value: 48.22,
            itemStyle: {
              color: "none",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
          {
            value: 38.22,
            itemStyle: {
              color: "rgb(64, 79, 178, 0.2)",
              decal: {
                symbol: "none",
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
      {
        type: "gauge",
        startAngle: 270,
        endAngle: -89.9999,
        radius: "75%",
        center: ["40%", "55%"],
        detail: {
          offsetCenter: [0, 0],
          fontSize: 24,
          fontFamily: 'vbi',
          color: "#71e6b5",
        },
        data: [
          {
            value: 128,
            name: "",
          },
        ],
        pointer: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitNumber: 40,
        axisLine: {
          show: false,
          lineStyle: {
            color: [[1, "rgba(90, 200, 165,1)"]],
            width: 20,
          },
        },
        splitLine: {
          length: 1,
          lineStyle: {
            width: 2,
            color: "rgba(90, 200, 165,1)",
            distance: 10,
          },
        },
      },
    ],
  };
}

function initView(option) {
  if (!chartIns.value) {
    chartIns.value = echarts.init(REF_PieChart.value);
  }
  chartIns.value.resize();
  option && chartIns.value.setOption(option);
}
</script>

<template>
  <div
    class="pie-chart"
    id="JS_PieChart"
    ref="REF_PieChart"
    :style="{width:  CW + 'px', height: CH + 'px'}"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
