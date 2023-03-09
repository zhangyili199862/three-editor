<template>
  <Top />
  <el-row type="flex" style="width: 100%; height: calc(100% - 50px)">
    <ThreeTool />
    <Operate />
    <MyCanvas />
    <SelectTree />
  </el-row>
</template>
<script setup lang="ts">
import Top from "@/components/Top/Top.vue";
import ThreeTool from "@/components/ThreeTool/ThreeTool.vue";
</script>
<style lang="scss"></style>
