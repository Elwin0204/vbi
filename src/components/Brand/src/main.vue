<script setup>
defineProps({
  title: String,
});
</script>

<template>
  <div class="brand">
    <svg
      style="overflow: visible"
      viewBox="0 0 1536 68"
      height="75"
      width="100%"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <defs>
        <polyline
          id="border"
          points="0,34 15,20 578,20 598,3 938,3 958,20 1521,20 1536,34"
          fill="transparent"
          style="stroke-width: 3"
          filter="url(#glow2)"
        ></polyline>
        <linearGradient id="linear" x1="100%" y2="100%">
          <stop offset="0%" style="stop-color: #3f61d1"></stop>
          <stop offset="100%" style="stop-color: #2b4198"></stop>
        </linearGradient>
        <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(25, 29, 46);stop-opacity:0" />
          <stop offset="100%" style="stop-color:rgb(31, 43, 87);stop-opacity:1" />
        </linearGradient>
        <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(31, 43, 87);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(25, 29, 46);stop-opacity:0" />
        </linearGradient>
        <linearGradient id="linear3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:rgb(31, 43, 87);stop-opacity:0" />
          <stop offset="50%" style="stop-color:rgb(45, 80, 143);stop-opacity:1" />
          <stop offset="100%" style="stop-color:rgb(31, 43, 87);stop-opacity:0" />
        </linearGradient>
        <filter
          id="glow"
          height="150%"
          width="150%"
          x="-25%"
          y="-25%"
          filterUnits="userSpaceOnUse"
        >
          <feMorphology
            operator="dilate"
            radius="1"
            in="SourceAlpha"
            result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
          <feFlood flood-color="#2f4f34" result="glowColor" />
          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlowColored"
          />
          <feComposite
            in="softGlowColored"
            in2="SourceGraphic"
            operator="out"
            result="outSoftGlowColored"
          />
          <feMerge>
            <feMergeNode in="outSoftGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter
          id="glow2"
          height="150%"
          width="150%"
          x="-25%"
          y="-25%"
          filterUnits="userSpaceOnUse"
        >
          <feMorphology
            operator="dilate"
            radius="1"
            in="SourceAlpha"
            result="thicken"
          />
          <feGaussianBlur in="thicken" stdDeviation="6" result="blurred" />
          <feFlood flood-color="#3527c4" result="glowColor" />
          <feComposite
            in="glowColor"
            in2="blurred"
            operator="in"
            result="softGlowColored"
          />
          <feComposite
            in="softGlowColored"
            in2="SourceGraphic"
            operator="out"
            result="outSoftGlowColored"
          />
          <feMerge>
            <feMergeNode in="outSoftGlowColored" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <use xlink:href="#border" class="stroke1"></use>
      <use
        xlink:href="#border"
        transform="rotate(180, 768, 34)"
        class="stroke2"
      ></use>
      <g>
        <polyline
          points="582,34 605,15 934,15 955,34 934,53 605,53 582,34"
          fill="url(#linear)"
          stroke="#3527c4"
          stroke-width="2"
          filter="url(#glow)"
        ></polyline>
        <text
          x="770"
          y="42"
          fill="#fcfefc"
          style="text-anchor: middle; font-size: 24px"
        >
          天津科技园区运营管理中心
        </text>
      </g>
      <polyline
        points="15,50 577,50 597,67 939,67 959,50 1521,50 1506,60 960,60 938,77 598,77 575,60 30,60 15,50"
        fill="url(#linear3)"
      ></polyline>
      <polyline
        points="30,64 574,64 591,76 30,76 30,64"
        fill="url(#linear1)"
      ></polyline>
      <polyline
        points="1505,64 961,64 945,76 1505,76 1505,64"
        fill="url(#linear2)"
      ></polyline>
      <polyline
        points="30,4 590,4 575,16 30,16 30,4"
        fill="url(#linear1)"
      ></polyline>
      <polyline
        points="1505,4 947,4 961,16 1505,16 1505,4"
        fill="url(#linear2)"
      ></polyline>
      <g>
        <polygon points="569,6 577,6 569,14 561,14" fill="#5681cd"></polygon>
        <polygon points="557,6 565,6 557,14 549,14" fill="#4e7cc1"></polygon>
        <polygon points="545,6 553,6 545,14 537,14" fill="#4a75b8"></polygon>
        <polygon points="533,6 541,6 533,14 525,14" fill="#4d70b3"></polygon>
        <polygon points="521,6 529,6 521,14 513,14" fill="#45659f"></polygon>
        <polygon points="509,6 517,6 509,14 501,14" fill="#415e98"></polygon>
        <polygon points="497,6 505,6 497,14 489,14" fill="#32477d"></polygon>
        <polygon points="485,6 493,6 485,14 477,14" fill="#2c3d6b"></polygon>
        <polygon points="473,6 481,6 473,14 465,14" fill="#26355b"></polygon>
        <polygon points="461,6 469,6 461,14 453,14" fill="#202c52"></polygon>
      </g>
      <g>
        <polygon points="960,6 968,6 976,14 968,14" fill="#5681cd"></polygon>
        <polygon points="972,6 980,6 988,14 980,14" fill="#4e7cc1"></polygon>
        <polygon points="984,6 992,6 1000,14 992,14" fill="#4a75b8"></polygon>
        <polygon points="996,6 1004,6 1012,14 1004,14" fill="#4d70b3"></polygon>
        <polygon points="1008,6 1016,6 1024,14 1016,14" fill="#45659f"></polygon>
        <polygon points="1020,6 1028,6 1036,14 1028,14" fill="#415e98"></polygon>
        <polygon points="1032,6 1040,6 1048,14 1040,14" fill="#32477d"></polygon>
        <polygon points="1044,6 1052,6 1060,14 1052,14" fill="#2c3d6b"></polygon>
        <polygon points="1056,6 1064,6 1072,14 1064,14" fill="#26355b"></polygon>
        <polygon points="1068,6 1076,6 1084,14 1076,14" fill="#202c52"></polygon>
      </g>
    </svg>
  </div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
