import { isArray } from "./is";
/**
 * @description 处理prop为多级嵌套的情况 例如 :prop:user.age
 * @param row
 * @param prop
 * @returns
 */
export function handleRowAccordingToProp(
  row: { [key: string]: any },
  prop: string
) {
  if (!prop.includes(".")) return row[prop] ?? "--";
  prop.split(".").forEach((item) => (row = row[item] ?? "--"));
  return row;
}

export function handleProp(prop: string) {
  const propArr = prop.split(".");
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

/**
 * @description 根据枚举列表查询当前的数据
 * @param callValue
 * @param enumData
 * @param fieldNames
 * @param type
 * @returns
 */
export function filterEnum(
  callValue: any,
  enumData: any[] | undefined,
  fieldNames?: { label: string; value: string },
  type?: string
): string {
  const value = fieldNames?.value ?? "value";
  const label = fieldNames?.label ?? "label";
  let filterData: { [key: string]: any } = {};
  if (Array.isArray(enumData))
    filterData = enumData.find((item: any) => item[value] == callValue);
  if (type == "tag") return filterData?.tagType ? filterData.tagType : "";
  return filterData ? filterData[label] : "--";
}

/**
 * @description 处理无数据的情况
 * @param callValue 需要处理的值
 * @returns
 */

export function formatValue(callValue: any) {
  if (isArray(callValue)) return callValue.length ? callValue.join("/") : "--";
  return callValue ?? "--";
}
