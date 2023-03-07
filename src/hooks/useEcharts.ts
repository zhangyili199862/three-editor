import { onBeforeUnmount, onActivated, onDeactivated } from "vue";
import { useDebounceFn } from "@vueuse/core";
import * as echarts from "echarts";

export const useEcharts = (
  myChart: echarts.ECharts,
  options: echarts.EChartsCoreOption
) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }
  const echartsResize = useDebounceFn(() => {
    myChart && myChart.setOption(options);
  });

  window.addEventListener("resize", echartsResize);

  onBeforeUnmount(() => {
    window.removeEventListener("resize", echartsResize);
  });

  onActivated(() => {
    window.addEventListener("resize", echartsResize);
  });

  onDeactivated(() => {
    window.removeEventListener("resize", echartsResize);
  });
};
