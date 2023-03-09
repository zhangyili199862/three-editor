<template>
  <Top />
  <el-row type="flex" style="width: 100%; height: calc(100% - 50px)">
    <LeftPanel />
    <MyCanvas />
    <RightPanel />
  </el-row>
</template>
<script setup lang="ts">
import Top from "@/components/Top/Top.vue";
import LeftPanel from "@/components/LeftPanel/LeftPanel.vue";
import RightPanel from "@/components/RightPanel/RightPanel.vue";
import MyCanvas from "@/components/MyCanvas/MyCanvas.vue";
</script>
<style lang="scss"></style>
