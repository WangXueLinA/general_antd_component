import QueryTable from './index.vue';
import { h, ref, reactive } from 'vue';
import type { QueryTableProps } from './types';

export const useQueryTable = (props: QueryTableProps) => {
  const queryTableRef = ref();
  // @ts-ignore
  const Component = (_, { slots }) => {
    // @ts-ignore
    return h(QueryTable, { ...reactive(props), ref: queryTableRef }, slots);
  };

  return {
    QueryTable: Component,
    handleRefresh: queryTableRef.value?.handleRefresh,
    handleReset: queryTableRef.value?.handleReset,
    getFormValues: queryTableRef.value?.getFormValues,
    getTableData: queryTableRef.value?.getTableData,
  };
};
