import { ref } from "vue";

export const useTime = () => {
  const year = ref(0);
  const month = ref(0);
  const week = ref(""); //星期几
  const day = ref(0);
  const hour = ref<number | string>(0);
  const minute = ref<number | string>(0);
  const second = ref<number | string>(0);
  const nowTime = ref<string>(""); //当前时间

  const updateTime = () => {
    const date = new Date();
    year.value = date.getFullYear();
    month.value = date.getFullYear();
    week.value = "日一二三四五六".charAt(date.getDay());
    day.value = date.getDate();
    hour.value =
      (date.getHours() + "").padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getHours()
      );
    minute.value =
      (date.getMinutes() + "").padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getMinutes()
      );
    second.value =
      (date.getSeconds() + "").padStart(2, "0") ||
      new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2 }).format(
        date.getSeconds()
      );
    nowTime.value = `${year.value}年${month.value}月${day.value}日 ${hour.value}:${minute.value}:${second.value}`;
  };

  updateTime();

  return { year, month, day, hour, minute, second, week, nowTime };
};
