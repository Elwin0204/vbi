<script setup>
import Brand from './components/Brand';
import Wrapper from './components/Wrapper';
import Ringlike from './components/Ringlike';
import AreaChart from './components/AreaChart';
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
      <Wrapper title="安全统计" />
      <Wrapper title="消防统计" />
    </div>
    <div class="vbi-right">
      <Wrapper title="车辆统计">
        <template #chart>
          <AreaChart />
        </template>
      </Wrapper>
      <Wrapper title="考勤统计" />
      <Wrapper title="人员类型" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "./styles/vbi.less";
</style>
