import {reactive, computed} from 'vue';

const state  = reactive({
  excelList: [],
  showModal: false,
  loadingModal: false,
  tableData: [],
});

const store = computed(() => ({
  get excelList() {
    return state.excelList;
  },
  set excelList(value) {
    state.excelList = value;
  },
  get showModal() {
    return state.showModal;
  },
  set showModal(value) {
    state.showModal = value;
  },
  get loadingModal() {
    return state.loadingModal;
  },
  set loadingModal(value) {
    state.loadingModal = value;
  },
  get tableData() {
    return state.tableData;
  },
  set tableData(value: any) {
    state.tableData = value;
  },
  reset() {
    state.tableData = [];
    state.excelList = [];
    state.showModal = false
    state.loadingModal = false
  }
})).value;

export default store;