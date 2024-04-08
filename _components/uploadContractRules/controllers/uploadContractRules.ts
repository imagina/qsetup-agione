import Vue, { computed, onBeforeMount, ref, getCurrentInstance } from "vue";
import * as XLSX from 'xlsx';
import uploadContractRulesStore from '../store/uploadContractRules'
import _ from 'lodash';
import baseService from '@imagina/qcrud/_services/baseService.js'
import alert from '@imagina/qsite/_plugins/alert';

export default function uploadContractRules(props: any = null) {
    const proxy = (getCurrentInstance() as any).proxy as any;
    const uploaderFile: any = ref(null);
    const isFile = ref(false);
    const reader = ref();
    const showModal = computed({
        get: () => uploadContractRulesStore.showModal,
        set: (value) => {
            uploadContractRulesStore.showModal = value;
        }
    })
    const loadingModal = computed({
        get: () => uploadContractRulesStore.loadingModal,
        set: (value) => {
            uploadContractRulesStore.loadingModal = value;
        }
    })
    const excelList = computed(() => uploadContractRulesStore.excelList);
    function handleFileAdded(file) {
        isFile.value = true;
        reader.value = new FileReader();
        reader.value.onload = (e: any) => {
            const data = new Uint8Array(e.target.result);
            processExcelData(data);
        };
        reader.value.readAsArrayBuffer(file[0]);
    }
    function processExcelData(data) {
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[1]];
        const jsonData: any = XLSX.utils.sheet_to_json(firstSheet);
        uploadContractRulesStore.excelList = jsonData;
    }
    async function saveContractRules() {
        try {
            loadingModal.value = true;
            await processAndLoadContractRulesFromExcel();
            uploaderFile.value?.reset()
            uploadContractRulesStore.excelList = []; 
            loadingModal.value = false;
            isFile.value = false;
            alert.success('I completed the upload of the records successfully'); 
        } catch (error) {
            console.log(error);
            loadingModal.value = false;
            isFile.value = false;
        }
    }
    async function updatePassengerContractRulesUpsert(data) {
        await baseService.put('apiRoutes.qramp.passengerContractRulesUpsert', { attributes: data })
    }

    async function processAndLoadContractRulesFromExcel() {
        const model = [
            "Contract",
            "Contract Line Workday ID",
            "Contract Line Name",
            "Contract Line Description",
            "SI",
            "Invoice Line Memo",
            "Rate",
        ];
        for (const item of uploadContractRulesStore.excelList) {
            const linesRulesList: any = item;
            const objKeys = Object.keys(linesRulesList);
            if (linesRulesList.Rate > 0 && !_.isEqual(objKeys, model)) {
                const modelOperationType = [...model, "Operation Types"];
                if (!_.isEqual(objKeys, modelOperationType)) {
                    try {
                        await updatePassengerContractRulesUpsert(item);
                        linesRulesList.message = { text: 'OK SUCCESS', color: 'green' };
                    } catch (error) {
                        console.error('Error updating passenger contract rules:', error);
                        linesRulesList.message = { text: error.message, color: 'red' };
                    }
                } else {
                    linesRulesList.message =  { text: "Ignored by operation Type", color: 'orange' };
                }
            } else {
                if (linesRulesList.Rate === 0) {
                    linesRulesList.message = { text: "Ignored by rate 0", color: 'orange' };
                }
                if (_.isEqual(objKeys, model)) {
                    linesRulesList.message = { text: "The rule is ignored because you have empty data", color: 'orange' }
                }
            }
            uploadContractRulesStore.tableData.push(linesRulesList);
        }
    }
    function removeFile() {
        uploadContractRulesStore.tableData = [];
        uploadContractRulesStore.excelList = [];
        reader.value = null;
        isFile.value = false;
    }
    function hide() {
        uploadContractRulesStore.reset()
        proxy.$root.$emit('crud.data.refresh');
    }
    onBeforeMount(() =>{
        uploadContractRulesStore.reset()
        isFile.value = false;
    })
    return { 
        showModal,
        loadingModal,
        hide,
        handleFileAdded,
        saveContractRules,
        excelList,
        removeFile,
        uploaderFile,
        isFile,
        uploadContractRulesStore,  
    }
}