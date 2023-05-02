<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="wrapper">
    <svg
      style="overflow: visible"
      viewBox="0 0 600 330"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <filter
          id="insetShadow"
          height="150%"
          width="150%"
          x="-25%"
          y="-25%"
          filterUnits="userSpaceOnUse"
        >
          <feFlood flood-color="#0240bd" />
          <feComposite in2="SourceGraphic" operator="out" />
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>
      <polyline
        points="0,25 15,0 600,0 600,30 585,50 60,50 45,65 0,65 0,25"
        style="stroke: #1a4db2; stroke-width: 2"
        fill="rgba(20, 29, 51, 0.5)"
      ></polyline>
      <polyline
        points="0,25 15,0 600,0 600,30 585,50 60,50 45,65 0,65 0,25"
        style="stroke: #1a4db2; stroke-width: 2"
        filter="url(#insetShadow)"
      ></polyline>
      <polyline
        points="0,75 50,75 65,60 600,60 600,305 575,335 0,335 0,75"
        style="stroke: #1a4db2; stroke-width: 2"
        fill="rgba(20, 29, 51, 0.5)"
      ></polyline>
      <polyline
        points="0,75 50,75 65,60 600,60 600,305 575,335 0,335 0,75"
        style="stroke: #1a4db2; stroke-width: 2"
        filter="url(#insetShadow)"
      ></polyline>
      <g>
        <path
          vector-effect="non-scaling-stroke"
          d="M23 20 L36 28 L49 20 L36 12 L23 20 Z"
          fill="#2e77f3"
          fill-opacity="0.6"
          stroke="#3283fc"
          stroke-width="1"
        />
        <path
          vector-effect="non-scaling-stroke"
          d="M23 24 L36 32 L49 24"
          fill="transparent"
          fill-opacity="0.6"
          stroke="#3283fc"
          stroke-width="2"
        />
        <path
          vector-effect="non-scaling-stroke"
          d="M23 29 L36 37 L49 29"
          fill="transparent"
          fill-opacity="0.6"
          stroke="#3283fc"
          stroke-width="2"
        />
      </g>
      <text x="65" y="32" fill="#fcfefc" style="font-size: 24px">
        {{ title }}
      </text>
    </svg>
    <div class="chart">
      <slot name="chart"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
