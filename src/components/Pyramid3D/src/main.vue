<script setup>
import { onMounted } from "vue";
import * as echarts from "echarts";

const data = [
  {
    name: "管理",
    value: 30,
  },
  {
    name: "白领",
    value: 30,
  },
  {
    name: "技术",
    value: 25,
  },
  {
    name: "其他",
    value: 15,
  },
];
const defaultTheme = [
  ["#cfd62b", "#f6ff33", "#e8ff32", "#f6ff33"],
  ["#6ed660", "#7aec6a", "#7df36d", "#84ff73"],
  ["#64d185", "#68da8a", "#6ee793", "#7affa2"],
  ["#7eb8d4", "#86c3e0", "#93d6f6", "#98ddff"],
  ["#fce56b", "#d8ad2f", "#fce56b", "#e3b52e"],
  ["#497dff", "#304ccf", "#497dff", "#304ccf"],
];

const scale = "80%";
const angle1 = 30;
const angle2 = 60;

const labelOpts = [
  [5, -5],
  [60, 0]
];

const pyramid3dOpt = (function () {
  const cumArr = [];
  const percentArr = [];
  const sum = data.reduce(function (sum, cur) {
    const result = sum + cur.value;
    cumArr.push(result);
    return result;
  }, 0);
  const textArr = data.map(item => {
    return {
      name: item.name,
      percent: item.value / sum * 100 + '%'
    };
  });
  cumArr.forEach((v) => {
    percentArr.push(v / sum);
  });
  const pointsArr = [];

  function pyramid3dLayout(idx, topPoint, bottomPoint, angle1, angle2) {
    const points = [];
    const lpathPoints = [];
    const rpathPoints = [];
    const labelPoints = [];
    const textPoints = [];
    const sumLine = bottomPoint.y - topPoint.y;
    const curLine = percentArr[idx] * sumLine;
    const dx =
      (curLine * Math.sin(angle1)) /
      (Math.cos(angle1) * (1 + Math.tan(angle1) / Math.tan(angle2)));
    const dy = curLine / (1 + Math.tan(angle1) / Math.tan(angle2));
    const leftPoint = {
      x: topPoint.x - dx,
      y: topPoint.y + dy,
    };
    const rightPoint = {
      x: topPoint.x + dx,
      y: topPoint.y + dy,
    };
    const centerPoint = {
      x: topPoint.x,
      y: topPoint.y + curLine,
    };
    points.push(leftPoint);
    points.push(centerPoint);
    points.push(rightPoint);
    pointsArr.push(points);
    if (idx === 0) {
      lpathPoints.push([topPoint.x, topPoint.y]);
      lpathPoints.push([centerPoint.x, centerPoint.y]);
      lpathPoints.push([leftPoint.x, leftPoint.y]);
      rpathPoints.push([topPoint.x, topPoint.y]);
      rpathPoints.push([centerPoint.x, centerPoint.y]);
      rpathPoints.push([rightPoint.x, rightPoint.y]);
      labelPoints.push([
        (topPoint.x + rightPoint.x) / 2,
        (topPoint.y + rightPoint.y) / 2,
      ]);
      labelPoints.push([
        (topPoint.x + rightPoint.x) / 2 + labelOpts[0][0],
        (topPoint.y + rightPoint.y) / 2 + labelOpts[0][1],
      ]);
      labelPoints.push([
        (topPoint.x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0],
        (topPoint.y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1],
      ]);
      textPoints.push([
        (topPoint.x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0] - 25,
        (topPoint.y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1] + 5]);
      textPoints.push([
        (topPoint.x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0] - 25,
        (topPoint.y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1] - 15]);
    } else {
      lpathPoints.push([pointsArr[idx - 1][0].x, pointsArr[idx - 1][0].y]);
      lpathPoints.push([pointsArr[idx - 1][1].x, pointsArr[idx - 1][1].y]);
      lpathPoints.push([centerPoint.x, centerPoint.y]);
      lpathPoints.push([leftPoint.x, leftPoint.y]);
      rpathPoints.push([pointsArr[idx - 1][2].x, pointsArr[idx - 1][2].y]);
      rpathPoints.push([pointsArr[idx - 1][1].x, pointsArr[idx - 1][1].y]);
      rpathPoints.push([centerPoint.x, centerPoint.y]);
      rpathPoints.push([rightPoint.x, rightPoint.y]);
      if (idx % 2 === 0) {
        labelPoints.push([
          (pointsArr[idx - 1][2].x + rightPoint.x) / 2,
          (pointsArr[idx - 1][2].y + rightPoint.y) / 2,
        ]);
        labelPoints.push([
          (pointsArr[idx - 1][2].x + rightPoint.x) / 2 + labelOpts[0][0],
          (pointsArr[idx - 1][2].y + rightPoint.y) / 2 + labelOpts[0][1],
        ]);
        labelPoints.push([
          (pointsArr[idx - 1][2].x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0],
          (pointsArr[idx - 1][2].y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1],
        ]);
        textPoints.push([
          (pointsArr[idx - 1][2].x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0] - 25,
          (pointsArr[idx - 1][2].y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1] + 5,
        ]);
        textPoints.push([
          (pointsArr[idx - 1][2].x + rightPoint.x) / 2 + labelOpts[0][0] + labelOpts[1][0] - 25,
          (pointsArr[idx - 1][2].y + rightPoint.y) / 2 + labelOpts[0][1] + labelOpts[1][1] - 15,
        ]);
      } else {
        labelPoints.push([
          (pointsArr[idx - 1][0].x + leftPoint.x) / 2,
          (pointsArr[idx - 1][0].y + leftPoint.y) / 2,
        ]);
        labelPoints.push([
          (pointsArr[idx - 1][0].x + leftPoint.x) / 2 - labelOpts[0][0],
          (pointsArr[idx - 1][0].y + leftPoint.y) / 2 + labelOpts[0][1],
        ]);
        labelPoints.push([
          (pointsArr[idx - 1][0].x + leftPoint.x) / 2 - labelOpts[0][0] - labelOpts[1][0],
          (pointsArr[idx - 1][0].y + leftPoint.y) / 2 + labelOpts[0][1] - labelOpts[1][1],
        ]);
        textPoints.push([
          (pointsArr[idx - 1][0].x + leftPoint.x) / 2 - labelOpts[0][0] - labelOpts[1][0],
          (pointsArr[idx - 1][0].y + leftPoint.y) / 2 + labelOpts[0][1] - labelOpts[1][1] + 5,
        ]);
        textPoints.push([
          (pointsArr[idx - 1][0].x + leftPoint.x) / 2 - labelOpts[0][0] - labelOpts[1][0],
          (pointsArr[idx - 1][0].y + leftPoint.y) / 2 + labelOpts[0][1] - labelOpts[1][1] - 15,
        ]);
      }
    }

    return [lpathPoints, rpathPoints, labelPoints, textPoints];
  }

  return {
    series: {
      type: "custom",
      data: data,
      coordinateSystem: undefined,
      renderItem: function (params, api) {
        const idx = params.dataIndex;
        const viewSize = Math.min(api.getWidth(), api.getHeight());
        const cx = api.getWidth() * 0.5;
        const cy = api.getHeight() * 0.5;

        const r = ((parseFloat(scale) / 100) * viewSize) / 2;
        const topX = cx;
        const topY = cy - r;
        const bottomX = cx;
        const bottomY = cy + r;
        const topPoint = {
          x: topX,
          y: topY,
        };
        const bottomPoint = {
          x: bottomX,
          y: bottomY,
        };
        const points = pyramid3dLayout(
          idx,
          topPoint,
          bottomPoint,
          (angle1 / 180) * Math.PI,
          (angle2 / 180) * Math.PI
        );

        return {
          type: "group",
          children: [
            {
              type: "polygon",
              shape: {
                points: points[0],
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: defaultTheme[idx][0] },
                  { offset: 1, color: defaultTheme[idx][1] },
                ]),
              },
            },
            {
              type: "polygon",
              shape: {
                points: points[1],
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: defaultTheme[idx][2] },
                  { offset: 1, color: defaultTheme[idx][3] },
                ]),
              },
            },
            {
              type: "polyline",
              shape: {
                points: points[2],
              },
              style: {
                stroke: "#245184",
                lineWidth: 2,
              }
            },
            {
              type: "text",
              style: {
                text: textArr[idx].name,
                fill: "#a8caf5",
                x: points[3][0][0],
                y: points[3][0][1],
              },
            },
            {
              type: "text",
              style: {
                text: textArr[idx].percent,
                fill: "#a8caf5",
                x: points[3][1][0],
                y: points[3][1][1],
              },
            },
          ],
        };
      },
    },
  };
})();

function setGraphic (w, h, angle1, angle2) {
  const points = [];
  const viewSize = Math.min(w, h);
  const cx = w * 0.5;
  const cy = h * 0.5;

  const r = ((parseFloat(scale) / 100) * viewSize) / 2;
  const topX = cx;
  const topY = cy - r - 8;
  const bottomX = cx;
  const bottomY = cy + r + 5;
  const topPoint = {
    x: topX,
    y: topY,
  };
  const bottomPoint = {
    x: bottomX,
    y: bottomY,
  };
  const curLine = bottomPoint.y - topPoint.y;
  const dx =
    (curLine * Math.sin(angle1)) /
    (Math.cos(angle1) * (1 + Math.tan(angle1) / Math.tan(angle2)));
  const dy = curLine / (1 + Math.tan(angle1) / Math.tan(angle2));
  const leftPoint = {
    x: topPoint.x - dx,
    y: topPoint.y + dy,
  };
  const rightPoint = {
    x: topPoint.x + dx,
    y: topPoint.y + dy,
  };
  points.push([topPoint.x, topPoint.y]);
  points.push([rightPoint.x, rightPoint.y]);
  points.push([bottomPoint.x, bottomPoint.y]);
  points.push([leftPoint.x, leftPoint.y]);
  return {
    type: 'group',
    children: [
      {
        type: 'polygon',
        shape: {
          points: points
        },
        style: {
          fill: 'rgba(121, 173, 255, 0.6)',
          stroke: 'rgba(121, 173, 255, 1)'
        }     
      }
    ]   
  }
}

function initView(option) {
  const chartDom = document.getElementById("JS_Pyramid3D");
  const pyramid3d = echarts.init(chartDom);
  const w = pyramid3d.getWidth();
  const h = pyramid3d.getHeight();
  const graphic = setGraphic(w, h, (angle1 / 180) * Math.PI, (angle2 / 180) * Math.PI);
  option && (option.graphic = graphic) && pyramid3d.setOption(option);
}

onMounted(() => {
  initView(pyramid3dOpt);
});
</script>

<template>
  <div
    class="pyramid3d"
    id="JS_Pyramid3D"
    style="width: 382px; height: 180px"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
