<script setup>
import { onMounted, getCurrentInstance, ref, shallowRef, nextTick } from "vue";
import * as echarts from "echarts";
const { Bus }  = getCurrentInstance().appContext.config.globalProperties;

const REF_AreaChart = shallowRef();
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
      bottom: 15,
      top: 30,
      containLabel: true,
    },
    tooltip: {
      show: true,
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
        showSymbol: false,
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
        },
        itemStyle: {
          color: "#99e9fd",
        },
      },
      {
        data: [0, 22, 60, 43, 41, 55, 80, 100, 80, 52, 38, 47, 68, 50, 0],
        type: "line",
        smooth: true,
        showSymbol: false,
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
        },
        itemStyle: {
          color: "#94fbc0",
        },
      },
    ],
  };
}

function initView(option) {
  if (!chartIns.value) {
    chartIns.value = echarts.init(REF_AreaChart.value);
  }
  chartIns.value.resize();
  option && chartIns.value.setOption(option);
}
</script>

<template>
  <div
    class="area-chart"
    id="JS_AreaChart"
    ref="REF_AreaChart"
    :style="{width:  CW + 'px', height: CH + 'px'}"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
