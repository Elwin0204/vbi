<script setup>
import { onMounted, getCurrentInstance, ref, shallowRef, nextTick } from "vue";
import * as echarts from "echarts";
const { Bus }  = getCurrentInstance().appContext.config.globalProperties;

const REF_MixedLinebar = shallowRef();
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

function initOpt() {
  return {
    grid: {
      left: 30,
      right: 30,
      bottom: 0,
      top: 30,
      containLabel: true,
    },
    legend: {
      top: 5,
      right: 30,
      data: [
        {
          name: "1月",
          textStyle: {
            color: "#4e98f9",
          },
        },
        {
          name: "2月",
          textStyle: {
            color: "#4e98f9",
          },
        },
      ],
    },
    xAxis: {
      type: "category",
      data: [
        "A区",
        "B区",
        "C区",
        "D区",
        "E区",
        "F区",
        "G区",
        "H区",
        "I区",
        "J区",
      ],
      axisLabel:{
        align: 'center',
        rotate:45,
        margin: 16
      }
    },
    yAxis: {
      type: "value",
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#75fffb',
          opacity: 0.3,
          width: 1,
        },
      },
    },
    series: [
      {
        name: "1月",
        data: [3041, 1600, 2015, 2999, 4102, 4600, 4227, 3026, 2196, 1793],
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 8,
        label: {
          show: true,
          position: "top",
          fontSize: 12,
          color: "#75fffb"
        },
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
                color: "#25eaff",
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
          color: "#71f2f7",
          shadowColor: "#71f2f7",
          shadowBlur: 12,
        },
        itemStyle: {
          color: "#71f2f7",
        },
      },
      {
        name: "2月",
        data: [1990, 1420, 882, 2230, 5978, 975, 3756, 2103, 1823, 1435],
        type: "bar",
        barWidth: "40%",
        barGap: "10%",
        smooth: true,
        showSymbol: false,
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "#72f5f9",
            },
            {
              offset: 1,
              color: "#4984f9",
            },
          ],
        },
      },
    ],
  };
}

function initView(option) {
  if (!chartIns.value) {
    chartIns.value = echarts.init(REF_MixedLinebar.value);
  }
  chartIns.value.resize();
  option && chartIns.value.setOption(option);
}
</script>

<template>
  <div
    class="mixed-linebar"
    id="JS_MixedLinebar"
    ref="REF_MixedLinebar"
    :style="{width:  CW + 'px', height: CH + 'px'}"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
