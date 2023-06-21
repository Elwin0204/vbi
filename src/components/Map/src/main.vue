<script setup>
import { onMounted, getCurrentInstance, ref, shallowRef, nextTick } from "vue";
import * as echarts from "echarts";
import axios from "axios";
import svgUrl from './map.svg';
const { Bus } = getCurrentInstance().appContext.config.globalProperties;
const REF_Map = shallowRef();
const chartIns = shallowRef();
const CH = ref(0);
const CW = ref(0);
let option;
onMounted(() => {
  Bus.on("resize", async (res) => {
    const {
      map: { mapW, mapH },
      screen: { w, h }
    } = res;
    CH.value = mapH;
    CW.value = mapW;
    await nextTick();
    initView();
  });
});

function initView() {
  if (!chartIns.value) {
    chartIns.value = echarts.init(REF_Map.value);
  }
  chartIns.value.resize();
  axios.get(svgUrl).then( res => {
    const svg = res.data;
    echarts.registerMap('industrial_park_svg', { svg: svg });
    option = {
      tooltip: {},
      geo: {
        tooltip: {
          show: true
        },
        map: 'industrial_park_svg',
        roam: true,
        left: 10,
        right: 10,
        bottom: 10,
        top: 10
      },
      series: {
        type: 'custom',
        coordinateSystem: 'geo',
        geoIndex: 0,
        zlevel: 1,
        renderItem(params, api) {}
      }
    }
    option && chartIns.value.setOption(option);
  })
  option && chartIns.value.setOption(option);
}
</script>

<template>
  <div 
    class="map"
    id="JS_Map"
    ref="REF_Map"
    :style="{width:  CW + 'px', height: CH + 'px'}"
  >
  </div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
