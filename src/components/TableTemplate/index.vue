<template>
  <div class="slef-tableTamplate">
    <MTable
      :request-api="getDevicePage"
      :initParam="initParam"
      :columns="columns"
      ref="mTable"
      :data-callback="dataCallback"
    ></MTable>
  </div>
</template>
<script setup lang="tsx" name="TableTemplate">
import MTable from "@/components/MTable/index.vue";
import { getDevicePage } from "@/api/modules/device";
import { ColumnProps } from "@/components/MTable/interface";
import { ref } from "vue";
const dataCallback = (data: any) => {
  return {
    list: data.data,
    total: data.totalCount,
    pageNum: data.pageNum,
    pageSize: data.pageSize,
  };
};
const initParam = ref({
  classType: "product",
});
const columns: ColumnProps[] = [
  { type: "index", label: "序号", width: 80 },
  { type: "expand", label: "Expand", width: 100 },
  {
    prop: "name",
    label: "设备名称",
    search: {
      el: "input",
    },
  },
  {
    prop: "classID",
    label: "设备编码",
    search: {
      el: "input",
    },
  },
  {
    prop: "className",
    label: "设备原型",
    search:{
      el:"input"
    }
  },
  {
    prop: "area",
    label: "设备区域",
    tag: true,
  },
  {
    prop: "description",
    label: "设备描述",
  },
  {
    prop: "creationTime",
    label: "创建时间",
  },
  {
    prop: "modificationTime",
    label: "修改时间",
    search: {
      el: "date-picker",
      dateType:"year"
    },
  },
  //只用于搜索，但不显示在表格中
  {
    prop: "online",
    label: "设备状态",
    isShow: false,
    enum: [
      { label: "在线", value: 1 },
      { label: "离线", value: 0 },
    ],
    search: {
      el: "select",
    },
  },
];
</script>
