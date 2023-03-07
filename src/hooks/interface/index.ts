export type anyObj = {
  [key: string]: any;
};
export namespace Table {
  export interface Pagetable {
    pageNum: number;
    pageSize: number;
    total: number;
  }
  export interface TableStateProps {
    tableData: any[];
    pageable: Pagetable;
    searchParam: anyObj;
    searchInitParam: anyObj;
    totalParam: anyObj;
    icon?: anyObj;
  }
}

export namespace HandleData {
  export type MessageType = "" | "success" | "warning" | "info" | "error";
}
