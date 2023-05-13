<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

const data = [
  {
    name: '管理',
    value: 30
  },
  {
    name: '白领',
    value: 30
  },
  {
    name: '技术',
    value: 25
  },
  {
    name: '其他',
    value: 15
  },
];
const defaultTheme = [
  ['#cfd62b', '#f6ff33', '#e8ff32', '#f6ff33'],
  ['#6ed660', '#7aec6a', '#7df36d', '#84ff73'],
  ['#64d185', '#68da8a', '#6ee793', '#7affa2'],
  ['#7eb8d4', '#86c3e0', '#93d6f6', '#98ddff'],
  ['#fce56b', '#d8ad2f', '#fce56b', '#e3b52e'],
  ['#497dff', '#304ccf', '#497dff', '#304ccf']
];

const scale = '80%';
const angle1 = 30;
const angle2 = 60;

const pyramid3dOpt = (function () {
  const sum = data.reduce(function (sum, cur) {
    return sum + cur.value;
  }, 0);

  const pointsArr = [];

  function pyramid3dLayout (idx, pointsArr, top, bottom, angle1, angle2) {
    if (idx === 0) {

    } else {
      const prevPoints = pointsArr[idx];
    }
    let points = [];

    return points;
  }

  return {
    series: {
      type: 'custom',
      data: data,
      coordinateSystem: undefined,
      renderItem: function (params, api) {
        const idx = params.dataIndex;
        const viewSize = Math.min(api.getWidth(), api.getHeight());
        const cx = api.getWidth() * 0.5;
        const cy = api.getHeight() * 0.5;

        const r = (parseFloat(scale) / 100) * viewSize / 2;
        const topX = cx;
        const topY = cy - r;
        const bottomX = cx;
        const bottomY = cy + r;
        const topPoint = {
          x: topX,
          y: topY
        };
        const bottomPoint = {
          x: bottomX,
          y: bottomY
        };
        // console.log('idx', idx);
        // console.log('viewSize', viewSize);
        console.log('topY', topY);
        console.log('bottomY', bottomY);
        let points = pyramid3dLayout(idx, pointsArr, topPoint, bottomPoint, angle1, angle2);

        return {
          type: 'group',
          children: points.map(function (opt) {
            return {
              type: 'polygon',
              shape: {
                points: []
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: defaultTheme[index][0] },
                  { offset: 1, color: defaultTheme[index][1] },
                ])
              }
            }
          })
        };
      }
    }
  };
})();

function initView (option) {
  const chartDom = document.getElementById("JS_Pyramid3D");
  const pyramid3d = echarts.init(chartDom);
  option && pyramid3d.setOption(option);
}

onMounted(() => {
  initView(pyramid3dOpt);
});

</script>

<template>
  <div class="pyramid3d" id="JS_Pyramid3D" style="width: 382px; height: 180px">
  </div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
