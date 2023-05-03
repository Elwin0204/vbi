<script setup>
defineProps({
  charts: {
    type: Array,
    default: () => [
      {
        title: "园区A",
        color1: "#474c53",
        color2: "#faf294",
        percent: 60,
        size: 80,
      },
      {
        title: "园区B",
        color1: "#1f3847",
        color2: "#70fbc2",
        percent: 75,
        size: 110,
      },
      {
        title: "园区C",
        color1: "#4d5356",
        color2: "#8fc5ff",
        percent: 60,
        size: 80,
      },
    ],
  },
});
</script>

<template>
  <div class="ringlike">
    <div class="chart" v-for="(chart, index) in charts" :key="index" :style="{'--size': chart.size + 'px'}">
      <div class="ring">
        <svg
          viewBox="0 0 36 36"
          :height="chart.size"
          :width="chart.size"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="shadow" width="150%" height="150%" x="-25%" y="-25%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
              <feBlend in="SourceGraphic" mode="normal" />
            </filter>
            <linearGradient
              :id="`ringlike_linear_${index}`"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                :style="{ 'stop-color': chart.color2, 'stop-opacity': 1 }"
              />
              <stop
                offset="100%"
                :style="{ 'stop-color': chart.color2, 'stop-opacity': 0.1 }"
              />
            </linearGradient>
          </defs>
          <path
            :stroke="chart.color1"
            stroke-width="1.5"
            fill="none"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          ></path>
          <path
            class="circle"
            :stroke="chart.color2"
            stroke-width="2"
            :stroke-dasharray="`${chart.percent}, 100`"
            stroke-linecap="round"
            fill="none"
            filter="url(#shadow)"
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
          ></path>
          <text
            x="50%"
            y="50%"
            alignment-baseline="central"
            text-anchor="middle"
            font-size="8"
            :fill="`url(#ringlike_linear_${index})`"
          >
            {{ `${chart.percent}%` }}
          </text>
        </svg>
        <div class="dot" :style="{'--clr': chart.color2, '--percent': chart.percent}"></div>
      </div>
      <div style="height: 30px"></div>
      <div class="title">
        <i
          :style="{
            backgroundColor: chart.color2,
          }"
        ></i>
        {{ chart.title }}
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
