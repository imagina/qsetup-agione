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
            <div class="tw-p-4 tw-mx-4 tw-mt-2 tw-rounded-md tw-border tw-shadow-md">
                <p class="tw-text-sm tw-pb-3 tw-font-semibold">Percentage of progress of contract rules</p>
                <q-linear-progress size="25px" :value="percentageCompleted" color="primary">
                    <div class="absolute-full flex flex-center">
                        <q-badge color="white" text-color="primary" :label="Math.floor(percentageCompleted * 100)" />
                    </div>
                </q-linear-progress>
            </div>
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