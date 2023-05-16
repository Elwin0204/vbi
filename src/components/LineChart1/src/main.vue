<script setup>
import { onMounted, getCurrentInstance, ref, shallowRef, nextTick } from "vue";
import * as echarts from "echarts";
const { Bus }  = getCurrentInstance().appContext.config.globalProperties;

const REF_LineChart1 = shallowRef();
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
    legend: {
      top: 5,
      right: 30,
      data: [
        {
          name: "今日",
          textStyle: {
            color: "#94fbc0",
          },
        },
        {
          name: "昨日",
          textStyle: {
            color: "#99e9fd",
          },
        },
      ],
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
      splitLine: {
        lineStyle: {
          opacity: 0.3,
          width: 1,
        },
      },
    },
    series: [
      {
        name: "今日",
        data: [
          {
            value: 42,
            symbolSize: 0,
          },
          {
            value: 30,
            symbolSize: 10,
            symbol: "image://data:image/png;base64,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",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 38,
            symbolSize: 0,
          },
          {
            value: 60,
            symbolSize: 0,
          },
          {
            value: 50,
            symbolSize: 0,
          },
          {
            value: 40,
            symbolSize: 0,
          },
          {
            value: 50,
            symbolSize: 0,
          },
          {
            value: 85,
            symbolSize: 10,
            symbol: "image://data:image/png;base64,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",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 112,
            symbolSize: 0,
          },
          {
            value: 95,
            symbolSize: 10,
            symbol: "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAEIFJREFUeF7tXXlcU1f2P8nLRiAQFmVfJeAylnFB3FH6s59SW9paHbVFSdgURdRRp462dWn1V6tWRStlS4LSVkbHsbaV+XVBcVdcSv25kLDJImBZQgKBLO9lPi9KR62a7b0Qbd5/fHLu2b7cd+8799xzKGCjj+BG9kig06McqPRJVNCNUmHaQBoVQV0RRzWXxgYXmgONTWHQ2QiDiQBVbwUKGChRtUqpU2s6tT1amVYJHWg3Q4uhCJNKu40B5XIPpjkFGs0F0dAFV2zRdIqtKJVUn+eG9mBxTojDTA2GRnNoLDTMwYvKY3ly/Jlu4E3nAhthmKWuElVDk0YG9ap2kPa2KCQ9zZhC24vQqUhpF9pzCHGgHs33T243iznBg/odEH5F3hwnhLmgB1NPHsb2lUdygrnD2L7gSnMk2NSH2XVou+G6shHKFDWy68pGZwcq42QXqsoWhycfIFWwAeb9AkiyNNcPgJpGAyTdn+mOTXEJ50ZyQoBOQfrFFxodCmWKajjRWSGrV7VRtYDuAcCy8ngpDdZWyKqAzL+ZE+ZIZ65R67Tzop0Ha2K4Q5i+DFdr2/xUeY3qDiiR3VSVym/RGRTa/m6NavO+IakSaylpFUCSr+V60liMD7WA8qe7RtD/hzsMnBCmtWw0S04XqoIfZdfhu45yDQ0QsbZX/X7e8JQWs5iZMIh0QBIr81dQdZTNU52HQJzHCIYT1baBeNR3XZgKjrZeVR+X3wSMolsjDE3aboJ/TSYlDZDEivyJjjRmbgDT3XvOgCgXPxt7NZnqqQZ1Bxz49UJnnaqtqVurShGGJ502lYcx9KQAkliRu55Opa2OHzieOdE5zBg9nhma03IJFN49q9Jg2o+F4SnriVacUED4N7OCOAxOUSDTIzzRc5KLK41NtL42wa9DqwRhy6nO26rWCoVaMVs8JK2WKMUIAySxMj+WpqMWxbmP4Ex3jSBKP5vm811HORxtu6rQUrDZwtCkYiKUJQQQgTQ3jQ60HWneMcw/OwYQodczw+Pn7jrIaipRaUC7XMRLybJUcYsBEUjzPnBDnFYs9ZnmjIc4/ogPHpLZdecHeTvatV3ES95oiQ8sAiRFKtruRXdOXOkXy3VGHCzR45kfK0d7YFtDsaxZIxfm8gQrzDXIbEAWVIp2+jDcEv7mG8tlUenmyn+uxvViGviksVh2R91ekB0qWGaOcWYBkiQRfujHdE1f4/8ql0GhmSP3uR2j1mlhc/23sgZVx578sMT3TTXUZEASpbnLPBDn9e8HvO5i6+EPU51BFD0edvmw7uvOVlS+XshL2WkKX5MASZTkv8VC6Ps+8I9je9JdTJHzh6Nt0XTCxvqjyl5UM18YlvRPYx1gNCD8m6LhNER3ebnvS/ShbF9j+f+h6W4oG2FH4/caLUoZJR4iuGaMM4wGZElV4a033EeGx7gMMYYvaTRyuRwkEgnU1dVBS0sL4H/39vbq5bFYLHB2dgZPT08ICAiAsLAw/d/9+ZR03oQjbVcqdg+KH2yMHkYBsqiyICfCKWBuqucUJ2OYEknT3NwMxcXF8O+SH+D8+fPQ0tgEAwb5gZOvOzA8OEB1ZAAw728sVFrAutWgblVAV2Mb/FrVAJ6+3jB27Fh4OWYaxMbGgpeXF5HqGcUrt+VEd3lX3VefhSakGBpgEBC+JHeGG81R/HHQXzjWPNErLCyEnH1CKDt7HkKmjgBuVCh4jgwFLs/HkE0P/S6T3oGWK5Ugu1AJ1cevQuT4sZA6PxHi4+NN4mMJMX4iubr2H4p2bTdfHJZy+Gm8ngoIv0bEYqPUugXeMQNeYPtZopPRY7dt2wZbd34KLmE+4Pv6aAiOHQ1AMfh/Yxx/nQ5qii9B49eXoFNyB1Yt+yusXLnSuLEWUv2ibIDspuOtSgT1FwcL7r1jH/M81dKFUvHeMZwQvsBzEumf4QUFBfD3D9aCa0QQDOJPBY/hQRa64OnDW6/VQpX4OHSU18L/btwECQkJpMrDmYtaTvVcVFSLP+fxF5kMCL8iJ5KFME9uD57DYlPNS78xxsLbt2/DgoxFUHGnFgZnvALeY41a+4xhbRRN0/lbcCvzGIT7BEF25l4IDAw0apw5REpMDStqDvT2oqrJ4vDUMpNmSEZVYWmc24jJL3KHmiPbqDEHDx6ExNRkCOPHQMSiV40aQxZR+d5vQSIuAWFOHsyaNYssMfCT7AYcbb96KnNQ/GSjAeFX5L7iQed8tTV4Nml7xk2bNsGOrN0wetM74DOePNBN8eydszfg0tovYHnaEli7dq0pQ02iXVVTJG/VKOaKw1OOPTrwsWvIkqrCy3MGRI0czwk1SZCxxIsz0qH4YilEbk0ARy/bSgPqbu6AslUFEDsmGj7L3GOsSSbRnVVU4ufzV3YPih9lEJBEaf5L7ojjwU9Imh34K+pMdTmM25MKVOReTq6tPRiKwbn0HJgQEqF/hZHx/K2mSN6Gds8S8pK+f5D/72ZIRlVhyQz3UVOjXYhfXPGZ8eONCzAhayEZNhLO80za5/Di0CjYS8JMKe28BYfbLh/PHBQf80RAEq7nDHNksso+GzSP8G0uvmbkf3MAJoszbHZmPIooPlNO8jMh6bU5pKwpi6v293SreiMLhqVe75P90AxJlYp2THMdtmSmeyShSbb4bipt+RJ48auVNrdmGJpW+Jry09xtkLVjN+G7r0NtZegPHdd35/AEyx8LyAKpSLYu4A0XbwbXkJ5G/45/Z/zpzy/AhJ3JNrObMlr5+4T47uvssjy49vMvhH6nNKllsKHuSGc2T/Cbw3+bIXxp3mtBDPeCdQFvELrtefn16fBrCKPfvzNMBeFR+l/2fgcDqtVQ/PW3lrJ6aPyGuiMdteq2BDEv+Rv8h98AWVS578Cb7iNn44nQRD14OGT9nk9g6pd/JYplv/I58fYOWJe+itAwC57Q/a+2K0V7Q+fPeQiQVKlIviloJseDRlyE3SfQDyI+mmv1cAhZqOFhll/ePwCNtfWEiWjVdsHa2kOKHJ5A/xGunyEJt/ImeDGdv/04aBZhiwcetRWdPAJR2wWEKW8LjC6vLIB5k+IIjRKvrj0oa1bJXy0YnHxGD4hAkvfeNO6wtXMHjGURZbSnnw9EZSaRHrUlSl9j+eBR4rKlQmiqbzR2iEG6r3493/uD7PomUVjyR3pA0iv3nU3yih5HVBoofri0UbgTJmanGVTmWSS4sDAb/i7IIOyQC09HzW8uPbcndP54PSCpUpFya/BsB6KyDye/FAPI9DAIfiXyWfS3QZ1rjpUB5VgllPzfjwZpjSHAsx5X1RT15PAEbAp+749LZ1/aNegdjjGDDdHgZ+DBoSEw90omcSd9hoRa+3edDg6MXArVlVWEndEvrfpCIdMoR1PwM/OhDj75q/xeIWRBF4lEsO1wHkR9mmhtN1lV3pUV+2Dpm3wQCIjZtGxtOCa70XMniZIozV/9EvdPG2Z7jCHkWHD2vLehIZwO4bMfe/5iVaeRKayi6CSESHWwv2AfIWKKWi+qv5f9/zrK4qp9hTPdI9+ZQlB0N5AXAqN2CUzODiHEKisywbNZri4TQ42kihCpJzpvwaG2si8oS6oLz6Z4Ro8bTkBWCZ60NtDLE94uJ+dghxDLCWTyZUQ63G1uISQZ75qyAXJbSs9R0qv2V6/yjQ0OYLpbrOqlS5fgTcFcmHZ4tcW8ngUGP721Bf4p/BJGjx5tsbp1qjbY2lhcQ1koFbdtCprp5kZAbZHDhw/D2pxPYNxugwl6FhtgCwwuZuTDxpSVMGPGDIvVadd24yGUdkqKVNSzK+RtlgMBqT5ZWVnw+ZnDMGqdPk723D8/byiClAlvQlqa5R/APZgallZ/2YvvsrQ5g/gIQrH8fHvLli1woPokjFhp+X/Ms4Bm+fYj8JfgifDuu+9arC6qwyC1SoxSBJJ8TMhLJCRXc8OGDXimN4xYEmexgs8Cg593H4XX3UfCunXrCFE3USrU2QGxwJWkAGJ/ZZmPCCmvLPuibj4gpCzq9m2v+YCQsu21fxiaDwgpH4b20In5gJASOrEHF80DhLTgoj38bh4gpIXf7QdU5gFC2gGV/QjXDEDIPMLF1bEnOZgGCqlJDrgq9jQg0wAhPQ3InihnPCBWSZSzp5IaD4hVUknvryP2ZGsDuFgt2RrXw34dwfAssep1BPuFnacDYvULO7g69ittjwelX6603V9H7Jc+H8GkXy992q9FP4xGv1+LxtWxFw74Lyj9XjgAV8VeWgPApkpr4KCQXXxmUUY6/NvGi8+8PCaalJIauH9NKj6DD7CXZ7Kx8kz315KTcW4jJpFdwCxJX8DsRXhh0XTDX2YkUuDfGRLxT5BviwXM7s0S65X4W5ixWF/iLzwj1up32vFwSEVmsb7E3+eZnxFaOuPR/x+LSvzhzKxdBHPNuvfAIyIYAhOiSb9OjUdtbxeUQmt5DWze8BGh1RmeNJEtKoKpnyX6MrFI/QLvqR7WLBO7fdcOcAvzhYFxI0kpE3v36BVolzTCiqXLCS0A8LQ3KiFlYvWg9GMhZeF+MZw/cw7CYkaD45ggiwopd1+sBUnJJRg7YRwkzuMTdsfcmGWNsELKfcIWVxbk4qXGUzynkNsx+DHW9ZUaLzlxHE6fOwNNDXfAM9QfOL4ewHB3AooTE3SMe1cpKGoMdF0qULd1gaKxFVoq68HbzwcmjpsAMVOmPh+lxvt8ZC/Gb8xc+D0NKcX49a8ue7sKkxEhtV2FPqxib+hiNCikN3Tp08Te8sgwJlZredSnir0p2JNBsXpTsD5V7G3zfg9Kv7XN61MlVSr+1JPOEdgbSwL0NZZs0ShEOTy+2UUmLb59a2+9CmAzrVf7Zoq9ObENNSf+bfdlb99tO+27+0Dpa3AfxPIYLBg4yfl5bnAvuntKXtvbestmG9w/uOdIqsjbQKMi78YPHM+c6BxmeOP+DFGclkug8O5ZlRZDt+SHJxNTwuEB+y1e1J/ky8SK/ImONGZuIMvdZ7ZHlLMfg9AK5laHsEHdAUWtF+S3e9vudGtVKcLwpNNkKEEaIA+sLSuoOsrmGJch1NfcR9CcqEwy7CCNZxemgm/armpLOm9iGEW3RhiatJ00YQ/WfidTSPK1XE86i/GRBtCE6a4RdLy+vK13msbDH3hd9u86yjV0QAo0ver38oantJDpJ/0RAtkCHuSP32d0orPWqnSa+GjnwZoY7hCmr429yhrVHVAiu6kqld+iMyn0wi5N76Z9Q1Il1vKTVQHpMypZmusHQE2jAZLuz3THpriEcyM5IWDN1q4POhg/0StTVMOJzgpZvaqNqgV0DwCWlcdLabAWEH1y+gWQB43kV+TNcUKYC3ow9eRhbF95JCeYO4ztC64ElBx8mjM7tN1wXdkIZYoa2XVlo7MDlXGyC1Vli8OTD1gbhAfl9Tsgfcok1ee5oT1YnBPiMFODodEcGgsNc/Ci8lieHH+mG3jTucBGzCstrETV0KSR6UMc0t4WhaSnGVNoexE6FSntQnsOIQ7Uo/n+ye39CYTNzJAnOUFwI3sk0OlRDlT6JCroRqkwbSCNiqCuiKOaS2ODC82BxqYw6GyEwUTg3pk6ChgoUbVKqVNrOrU9WplWCR1oN0OLoQiTSruNAeVyD6Y5BRrNBdHQBVdsAYBHdfgPDOGCd9J2Q+oAAAAASUVORK5CYII=",
            label: {
              show: true,
              color: "#6df87f",
            },
          },
          {
            value: 60,
            symbolSize: 0,
          },
          {
            value: 32,
            symbolSize: 0,
          },
          {
            value: 45,
            symbolSize: 0,
          },
          {
            value: 58,
            symbolSize: 0,
          },
          {
            value: 22,
            symbolSize: 0,
          },
        ],
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#94fbc0",
          shadowColor: "#94fbc0",
          shadowBlur: 12,
        },
        itemStyle: {
          color: "#94fbc0",
        },
        
      },
      {
        name: "昨日",
        data: [60, 83, 96, 100, 92, 75, 60, 55, 68, 78, 70, 60, 80, 90, 63],
        type: "line",
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "#99e9fd",
          shadowColor: "#99e9fd",
          shadowBlur: 12,
        },
        itemStyle: {
          color: "#99e9fd",
        },
      },
    ],
  };
}

function initView(option) {
  if (!chartIns.value) {
    chartIns.value = echarts.init(REF_LineChart1.value);
  }
  chartIns.value.resize();
  option && chartIns.value.setOption(option);
}
</script>

<template>
  <div
    class="line-chart1"
    id="JS_LineChart1"
    ref="REF_LineChart1"
    :style="{width:  CW + 'px', height: CH + 'px'}"
  ></div>
</template>

<style lang="less" scoped>
@import "../style/index.less";
</style>
