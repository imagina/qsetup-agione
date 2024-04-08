import Vue, { computed, ref } from "vue";
import uploadContractRulesStore from '../store/uploadContractRules'
export default function uploadedRecordsTable(props: any = null) {
    const excelList = computed(() => uploadContractRulesStore.excelList);
    const tableData = computed(() => uploadContractRulesStore.tableData);
    const columns = [
      {
        name: "Contract Line Workday ID",
        label: "Contract Line Workday ID",
        align: "left",
        field: 'Contract Line Workday ID',
      },
      {
        name: "Invoice Line Memo",
        label: "Invoice Line Memo",
        align: "left",
        field: 'Invoice Line Memo',
      },
      {
        name: "Message",
        label: "Message",
        align: "left",
        field: 'message',
      },
    ]
    return { 
        excelList,
        columns,
        tableData
    }
}