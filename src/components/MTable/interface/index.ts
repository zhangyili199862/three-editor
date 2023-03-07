import { Column, TableColumnCtx } from "element-plus";

export interface EnumProps {
  label: string; // 选项框显示的文字
  value: any; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

export type SeacrhType =
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
  | "slider";

export type SeacrhDateType =
  | "year"
  | "month"
  | "date"
  | "datetime"
  | "week"
  | "datetimerange"
  | "daterange";
export type BreakPoint = "xs" | "sm" | "md" | "lg" | "xl";
export type Responsive = {
  span?: number;
  offset?: number;
};
export type SearchProps = {
  el: SeacrhType; // 当前搜索框的类型
  props?: any; //搜索项参数
  key?: string; //当搜索项不为prop属性时，可通过key指定
  order?: number; //搜索项所占用的列数，默认为1列
  span?: number; //搜索项所占用的列数，默认为1列
  offset?: number; //搜索字段左侧便宜列数
  defaultValue?: string | number | boolean | any[]; //设置搜索项默认值

  date?: {
    dateType?: SeacrhDateType;
    format?: string;
    valueFormat?: string;
  };
} & Partial<Record<BreakPoint, Responsive>>;

export interface ColumnProps<T = any>
  extends Partial<
    Omit<TableColumnCtx<T>, "children" | "renderHeader" | "renderCell">
  > {
  tag?: boolean; //是否是标签展示
  isShow?: boolean; //是否显示在表格当中
  search?: SearchProps | undefined; //搜索项配置
  enum?: EnumProps[] | ((params?: any) => Promise<any>); //枚举类型
  isFilterEnum?: boolean; //当前单元格值是否根据enum格式化
  fieldNames?: { label: string; value: string }; //指定label 和 value 的key值
  headerRender?: (row: ColumnProps) => any; //自定义表头内容渲染 tsx
  render?: (scope: { row: T }) => any; //自定义单元格内容
  _children?: ColumnProps<T>[]; //多级表头
}
