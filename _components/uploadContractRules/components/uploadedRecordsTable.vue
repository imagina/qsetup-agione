<template>
    <div class="q-pa-md">

      <q-table
        title="Contract rules upload status"
        :rows="tableData"
        :columns="columns"
        row-key="name"
        class="stick-table"
        :rows-per-page-options="[0]"
      >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="Contract Line Workday ID" :props="props">
            {{ props.row['Contract Line Workday ID'] }}
          </q-td>
          <q-td key="Invoice Line Memo" :props="props">
            {{ props.row['Invoice Line Memo'] }}
          </q-td>
          <q-td key="Message" :props="props">
            <q-badge :color="props.row.message.color">
              {{ props.row.message.text }}
            </q-badge>
          </q-td>
        </q-tr>
      </template>
      </q-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import uploadedRecordsTableController from '../controllers/uploadedRecordsTable'
export default defineComponent({
    setup () {
        return {...uploadedRecordsTableController()}
    }
})
</script>

<style scoped>

</style>
