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

const data = [
  [238.2358421078053, 269.70913833075736, 0, {
    circle: {
      color: 'red'
    },
    location: {
      color: 'red'
    }
  }],
  [330.3415644319939, 372.9672194986475, 0, {
    circle: {
      color: '#f5222d'
    },
    location: {
      color: '#f5222d'
    }
  }],
  [505.0329284196291, 403.6141808346214, 0, {
    circle: {
      color: '#18fbff'
    },
    location: {
      color: '#18fbff'
    }
  }],
  [340.03790632245, 175.1985153835008, 0, {
    circle: {
      color: 'red'
    },
    location: {
      color: 'red'
    }
  }],
  [362.98925630313, 245.3839988649537, 0, {
    circle: {
      color: '#ffb33f'
    },
    location: {
      color: '#ffb33f'
    }
  }],
  [445.9672194986475, 350.0329284196291, 0, {
    circle: {
      color: 'red'
    },
    location: {
      color: 'red'
    }
  }]
];

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
        data: data,
        renderItem(params, api) {
          const coord = api.coord([
            api.value(0, params.dataIndex),
            api.value(1, params.dataIndex)
          ]);
          const color1 = data[params.dataIndex][3].circle.color || 'red';
          const color2 = data[params.dataIndex][3].location.color || 'red';
          const circles = [];
          for (let i = 0; i < 5; i++) {
            circles.push({
              type: 'circle',
              shape: {
                cx: 0,
                cy: 0,
                r: 30
              },
              style: {
                stroke: color1,
                fill: 'none',
                lineWidth: 2
              },
              // Ripple animation
              keyframeAnimation: {
                duration: 4000,
                loop: true,
                delay: (-i / 4) * 4000,
                keyframes: [
                  {
                    percent: 0,
                    scaleX: 0,
                    scaleY: 0,
                    style: {
                      opacity: 1
                    }
                  },
                  {
                    percent: 1,
                    scaleX: 1,
                    scaleY: 0.4,
                    style: {
                      opacity: 0
                    }
                  }
                ]
              }
            });
          }
          return {
            type: 'group',
            x: coord[0],
            y: coord[1],
            children: [
              ...circles,
              {
                type: 'path',
                shape: {
                  d: 'M16 0c-5.523 0-10 4.477-10 10 0 10 10 22 10 22s10-12 10-22c0-5.523-4.477-10-10-10zM16 16c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6z',
                  x: -10,
                  y: -35,
                  width: 20,
                  height: 40
                },
                style: {
                  fill: color2
                },
                // Jump animation.
                keyframeAnimation: {
                  duration: 1000,
                  loop: true,
                  delay: Math.random() * 1000,
                  keyframes: [
                    {
                      y: -10,
                      percent: 0.5,
                      easing: 'cubicOut'
                    },
                    {
                      y: 0,
                      percent: 1,
                      easing: 'bounceOut'
                    }
                  ]
                }
              }
            ]
          }
        }
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
