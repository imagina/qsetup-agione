<template>
    <master-modal
      v-model="showModal"
      title="Upload Contract Rules"
      custom-position
      :persistent="true"
      :loading="loadingModal"
      @hide="hide"
      :modalWidthSize="'90vw'"
      :maximized="$q.screen.lt.md"
    >
        <div class="tw-flex tw-justify-center">
            <div class="tw-space-y-3 tw-text-center">
                <q-uploader 
                    label="Select an Excel file" 
                    accept=".xls, .xlsx, .xlsm" 
                    @added="handleFileAdded"
                    hide-upload-btn
                    @removed="removeFile"
                    ref="uploaderFile"
                />
                <q-btn
                    v-if="isFile" 
                    color="primary"
                    label="Upload" 
                    icon="fa-light fa-cloud-arrow-up"
                    class="tw-my-4"
                    @click="saveContractRules"
                />
            </div>
        </div>
        <div>
            <uploadedRecordsTable />
        </div>
    </master-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import uploadContractRulesController from '../controllers/uploadContractRules'
import uploadedRecordsTable from '../components/uploadedRecordsTable.vue'

export default defineComponent({
    components:{
        uploadedRecordsTable,
    },
    setup() {
     return {...uploadContractRulesController()}   
    }
})
</script>

<style scoped></style>