import { ref, computed } from "vue";

export const useSelection = (selectId: string = "id") => {
  //是否选中数据
  const isSelected = ref<boolean>(false);

  //选中的数据列表
  const selectedList = ref([]);

  //当前选中的所有ids，可配置
  const selectedListIds = computed((): string[] => {
    let ids: string[] = [];
    selectedList.value.forEach((item) => {
      ids.push(item[selectId]);
    });
    return ids;
  });
  /**
   * 获取行数据的Key ，优化Table的渲染；跨页多选
   * @param row
   * @returns
   */
  const getRowKeys = (row: any) => {
    return row[selectId];
  };

  /**
   * @description 多选操作
   * @param rowArr
   */
  const selectionChange = (rowArr: any) => {
    rowArr.length === 0
      ? (isSelected.value = false)
      : (isSelected.value = true);
    selectedList.value = rowArr;
  };
  return {
    isSelected,
    selectedList,
    selectedListIds,
    getRowKeys,
    selectionChange,
  };
};
