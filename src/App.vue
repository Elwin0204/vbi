<script setup>
import Brand from './components/Brand';
import Wrapper from './components/Wrapper';
import Ringlike from './components/Ringlike';
import AreaChart from './components/AreaChart';
import LineChart1 from './components/LineChart1';
import MixedLinebar from './components/MixedLinebar';
import Pyramid3D from './components/Pyramid3D';
import LineChart2 from './components/LineChart2';
import PieChart from './components/PieChart';
import useResize from './hooks/useResize';
useResize();
</script>

<template>
  <div class="vbi">
    <div class="vbi-header">
      <Brand />
    </div>
    <div class="vbi-left">
      <Wrapper title="分布汇总">
        <template #chart>
          <Ringlike></Ringlike>
        </template>
      </Wrapper>
      <Wrapper title="安全统计">
        <template #chart>
          <PieChart />
        </template>
      </Wrapper>
      <Wrapper title="消防统计">
        <template #chart>
          <MixedLinebar />
        </template>
      </Wrapper>
    </div>
    <div class="vbi-right">
      <Wrapper title="车辆统计">
        <template #chart>
          <AreaChart />
        </template>
      </Wrapper>
      <Wrapper title="考勤统计">
        <template #chart>
          <LineChart1 />
        </template>
      </Wrapper>
      <Wrapper title="人员类型">
        <template #chart>
          <Pyramid3D />
        </template>
      </Wrapper>
    </div>
    <div class="vbi-bottom">
      <LineChart2 />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./styles/vbi.less";
</style>
