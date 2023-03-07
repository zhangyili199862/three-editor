<template>
  <div class="self-table">
    <SearchForm
      :search="search"
      :reset="reset"
      :searchParam="searchParam"
      :columns="searchColumns"
      :searchCol="searchCol"
      v-show="isShowSearch"
    />
    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :data="tableData"
      :border="border"
      :row-key="getRowKeys"
      @selection-change="selectionChange"
    >
      <slot></slot>
      <template v-for="item in tableColumns" :key="item">
        <!-- selection || index-->
        <el-table-column
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
          v-if="item.type == 'selection' || item.type == 'index'"
        ></el-table-column>
        <!-- / selection || index-->
        <!-- other 循环递归 -->
        <table-column
          v-if="!item.type && item.prop && item.isShow"
          :column="item"
        >
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" :row="scope.row"></slot>
          </template>
        </table-column>
      </template>
      <template #append>
        <slot name="append"></slot>
      </template>
      <template #empty>
        <div class="table-empty">
          <slot name="empty">
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>
    <!-- 分页组件 -->
    <slot name="pagination">
      <Pagination
        v-if="pagination"
        :pageable="pageable"
        :handleSizeChange="handleSizeChange"
        :handleCurrentChange="handleCurrentChange"
      ></Pagination>
    </slot>
  </div>
</template>
<script setup lang="ts" name="MTable">
import SearchForm from "@/components/SearchForm/index.vue";
import TableColumn from "./components/TableColumn.vue";
import Pagination from "./components/Pagination.vue";

import { ref, watch, provide } from "vue";
import { ElTable, TableProps } from "element-plus";
import { BreakPoint, ColumnProps } from "./interface";
import { useSelection } from "@/hooks/useSelection";
import { useTable } from "@/hooks/useTable";
import { handleProp } from "@/utils/util";
interface MTableProps extends Partial<Omit<TableProps<any>, "data">> {
  columns: ColumnProps[]; //配置项
  requestApi: (params: any) => Promise<any>; //请求数据的api
  dataCallback?: (data: any) => any; //返回数据的回调函数
  title?: string;
  pagination?: boolean; //是否需要分页组件
  border?: boolean; //是否带有纵向边框 ==> 非必传
  selectId?: string; //当表格多选时，所指定的key(默认为id)
  isShowSearch?: boolean; //是否显示搜索项
  searchCol?: number | Record<BreakPoint, number>; //表格搜索项 占比配置
  initParam?:any; //初始化请求参数默认为 {}
}
const props = withDefaults(defineProps<MTableProps>(), {
  columns: () => [],
  pagination: true,
  initParam: {},
  border: true,
  selectId: "id",
  isShowSearch: true,
  searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});

//表格DOM元素
const tableRef = ref<InstanceType<typeof ElTable>>();

//表格多选hooks
const {
  selectionChange,
  getRowKeys,
  selectedList,
  selectedListIds,
  isSelected,
} = useSelection();

//表格操作Hooks
const {
  tableData,
  pageable,
  searchParam,
  searchInitParam,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
} = useTable(
  props.requestApi,
  props.initParam,
  props.pagination,
  props.dataCallback
);
//清空选中项
const clearSelection = () => tableRef.value!.clearSelection();

//监听initParam变化，重新获取数据
watch(() => props.initParam, getTableList, { deep: true });

//接收columns 并设置响应式
const tableColumns = ref<ColumnProps[]>(props.columns);

//设置enumMap的值并provide
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
provide("enumMap", enumMap);

const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return;
  if (typeof col.enum !== "function")
    return enumMap.value.set(col.prop!, col.enum!);
  const { data } = await col.enum();
  enumMap.value.set(col.prop!, data);
};

//扁平化column
const flatColumnFunc = (
  columns: ColumnProps[],
  flatArr: ColumnProps[] = []
) => {
  columns.forEach(async (col) => {
    if (col._children?.length) flatArr.push(...flatColumnFunc(col._children));
    flatArr.push(col);

    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    //设置enumMap
    setEnumMap(col);
  });
  return flatArr.filter((item) => !item._children?.length);
};

//flatColumns
const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnFunc(tableColumns.value);

//过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el);

//设置搜索表单排序默认值 && 设置搜索单项表单的默认值
searchColumns.forEach((column, index) => {
  column.search!.order = column.search!.order ?? index + 2;
  if (
    column.search?.defaultValue !== undefined &&
    column.search?.defaultValue !== null
  ) {
    searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
      column.search?.defaultValue;
  }
});

//排序搜索表单项
searchColumns.sort((a, b) => a.search!.order! - b.search!.order!);

//暴露给父组件的参数和方法
defineExpose({
  element: tableRef,
  tableData,
  searchParam,
  pageable,
  getTableList,
  reset,
  clearSelection,
  enumMap,
  isSelected,
  selectedList,
  selectedListIds,
});
</script>
<style lang="scss" scoped>
.self-table {
}
</style>
