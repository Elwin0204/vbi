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
      map: { mapW, mapH }
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
    },
    line: {
      points: [
        [0, 0],
        [-30, -5],
        [-65, 22],
        [-100, 20]
      ],
      color: '#6b91ff'
    }
  }],
  [330.3415644319939, 372.9672194986475, 0, {
    circle: {
      color: '#f5222d'
    },
    location: {
      color: '#f5222d'
    },
    line: {
      points: [
        [0, 0],
        [-26, 5],
        [-45, 20],
        [-70, 48],
        [-104, 75],
        [-130, 80]
      ],
      color: '#6b91ff'
    }
  }],
  [505.0329284196291, 403.6141808346214, 0, {
    circle: {
      color: '#18fbff'
    },
    location: {
      color: '#18fbff'
    },
    line: {
      points: [
        [0, 0],
        [-20, 5],
        [-40, 30],
        [-55, 65],
        [-95, 130],
        [-125, 135],
      ],
      color: '#ffae54'
    }
  }],
  [340.03790632245, 175.1985153835008, 0, {
    circle: {
      color: 'red'
    },
    location: {
      color: 'red'
    },
    line: {
      points: [
        [0, 0],
        [10, -17],
        [40, -40],
        [75, -60],
        [90, -90]
      ],
      color: '#6b91ff'
    }
  }],
  [362.98925630313, 245.3839988649537, 0, {
    circle: {
      color: '#ffb33f'
    },
    location: {
      color: '#ffb33f'
    },
    line: {
      points: [
        [0, 0],
        [70, -40],
        [150, -122],
        [200, -120],
      ],
      color: '#ffae54'
    }
  }],
  [445.9672194986475, 350.0329284196291, 0, {
    circle: {
      color: 'red'
    },
    location: {
      color: 'red'
    },
    line: {
      points: [
        [0, 0],
        [35, 5],
        [70, 0],
        [100, -5],
        [130, 15],
      ],
      color: '#ffae54'
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
          const points = data[params.dataIndex][3].line.points;
          const color3 = data[params.dataIndex][3].line.color || 'red';
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
              },
              {
                type: 'polyline',
                shape: {
                  points: points,
                  smooth: '0.5'
                },
                style: {
                  stroke: color3,
                  lineWidth: 2,
                  fill: 'transparent'
                }
              },
            ]
          }
        }
      }
    }
    option && chartIns.value.setOption(option);
  })
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
