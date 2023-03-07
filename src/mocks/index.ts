import { MockMethod } from "vite-plugin-mock";
const mock: Array<MockMethod> = [
  {
    url: "/api/test",
    method: "get",
    response: () => {
      return {
        status: 200,
        message: "success",
        data: [],
      };
    },
  },
];

export default mock;
