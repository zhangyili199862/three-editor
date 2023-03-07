import { Table, anyObj } from "./interface";

import { reactive, computed, toRefs, onMounted } from "vue";

/**
 * @description table 页面操作方法封装
 * @param {Function} api 获取表格数据 api 方法(必传)
 * @param {Object} initParam 获取数据初始化参数(非必传，默认为{})
 * @param {Boolean} isPageable 是否有分页(非必传，默认为true)
 * @param {Function} dataCallBack 对后台返回的数据进行处理的方法(非必传)
 * */

export const useTable = (
  api: (params: any) => Promise<any>,
  initParam: object = {},
  isPageable: boolean = true,
  dataCallBack?: (data: any) => any
) => {
  const state = reactive<Table.TableStateProps>({
    //表格数据
    tableData: [],

    //分页数据
    pageable: {
      // 当前页数
      pageNum: 1,
      // 每页显示条数
      pageSize: 10,
      //总条数
      total: 0,
    },
    //查询参数
    searchParam: {},
    //初始化默认的查询参数
    searchInitParam: {},
    //总参数
    totalParam: {},
  });

  const pageParam = computed({
    get: () => {
      return {
        pageNum: state.pageable.pageNum,
        pageSize: state.pageable.pageSize,
      };
    },
    set: (_newVal: any) => {},
  });

  /**
   *获取表格数据
   */
  const getTableList = async () => {
    try {
      //整合参数
      Object.assign(
        state.totalParam,
        initParam,
        isPageable ? pageParam.value : {}
      );
      let { data } = await api(state.totalParam);
      dataCallBack && (data = dataCallBack(data));
      state.tableData = isPageable ? data.list : data;
      const { pageNum, pageSize, total } = data;
      isPageable && updatePageable({ pageNum, pageSize, total });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * 更新查询参数
   * @return void
   */
  const updatedTotalParam = () => {
    state.totalParam = {};
    // 处理查询参数，可以给查询参数加自定义前缀操作
    let nowSearchParam: anyObj = {};
    // 防止手动清空输入框携带参数
    for (let key in state.searchParam) {
      if (
        state.searchParam[key] ||
        state.searchParam[key] === false ||
        state.searchParam[key] === 0
      ) {
        nowSearchParam[key] = state.searchParam[key];
      }
    }
    Object.assign(
      state.totalParam,
      nowSearchParam,
      isPageable ? pageParam.value : {}
    );
  };

  /**
   * @description 更新分页信息
   * @param {Object} resPageable 后台返回的分页数据
   * @return void
   */
  const updatePageable = (resPageable: Table.Pagetable) => {
    Object.assign(state.pageable, resPageable);
  };

  /**
   * @description 表格数据查询
   * @return viod
   */
  const search = () => {
    state.pageable.pageNum = 1;
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 表格数据重置
   * @return void
   */
  const reset = () => {
    state.pageable.pageNum = 1;
    state.searchParam = {};
    //还原默认设置的搜索参数
    Object.keys(state.searchInitParam).forEach((key) => {
      state.searchParam[key] = state.searchInitParam[key];
    });
    updatedTotalParam();
    getTableList();
  };

  /**
   * @description 每页条数改变
   * @param val
   */
  const handleSizeChange = (val: number): void => {
    state.pageable.pageNum = 1;
    state.pageable.pageSize = val;
    getTableList();
  };

  const handleCurrentChange = (val: number): void => {
    state.pageable.pageNum = val;
    getTableList();
  };

  onMounted(() => {
    reset();
  });
  return {
    ...toRefs(state),
    getTableList,
    search,
    reset,
    handleSizeChange,
    handleCurrentChange,
  };
};
