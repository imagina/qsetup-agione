<template>
  <div>
    <q-btn
      color="primary"
      label="Upload contract rules"
      icon="fa-light fa-cloud-arrow-up"
      class="tw-my-4"
      @click="visibleModal(true)"
    />
    <uploadContractRulesModal />
  </div>
</template>
<script>
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList.ts'
import qRampStore from 'src/modules/qramp/_store/qRampStore.js'
import uploadContractRulesStore  from '../_components/uploadContractRules/store/uploadContractRules.ts'
import uploadContractRulesModal from '../_components/uploadContractRules/components/index.vue'

export default {
  components: {
    uploadContractRulesModal,
  },
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  beforeCreated() {
    this.$nextTick(async () => {
      await qRampStore().setIsPassenger(false);
      await Promise.all([
        workOrderList().getACTypes(),
        workOrderList().getOperationType()
      ]);
    })
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qramp.passengerContractRules',
        permission: 'ramp.passenger-contract-rules',
        create: {
           title: 'Create passenger contract rules'
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
              action: (item) => false
            },
            {
              name: 'contractId',
              label: 'Contract',
              field: 'contract',
              format: (val) => (val ? val.contractName : "-"),
              popupEdit: true,
            },
            {
              name: 'contractLineWId',
              label: 'Contract Line WID',
              field: 'contractLine',
              format: (val) => (val ? val.contractLineWorkdayId : "-"),
              popupEdit: true,
            },
            {
              name: 'invoiceLineMemo',
              label: 'Invoice Line Memo',
              field: 'contractLine',
              format: (val) => (val ? val.invoiceLineMemo : "-"),
              popupEdit: true,
            },
            {
              name: 'products',
              label: 'Product',
              field: 'product',
              format: (val) => (val ? val.name : "-"),
              popupEdit: true,
            },
            {
              name: 'aircraftTypes',
              label: 'Aircraft Types',
              field: 'aircraftTypes',
              format: (val) => (val ? val : "-"),
              formatAsync: async item => {
                const response = await workOrderList().getACTypesList()
                  .filter(actypes => {
                      const aircraftTypes = Array.isArray(item.aircraftTypes) ?  item.aircraftTypes : [];
                      return aircraftTypes.includes(actypes.id);
                    })
                  .map(item => item.fullName).join(', ');
                return `${response || '-'}`;
              },
            },
            {
              name: 'operationTypes',
              label: 'Operation types',
              field: 'operationTypes',
              format: (val) => (val ? val : "-"),
              formatAsync: async item => {
                const response = await workOrderList().getOperationTypeList()
                  .filter(operationType => {
                    const operationTypesItem = Array.isArray(item.operationTypes) ? item.operationTypes : [];
                    operationTypesItem.includes(operationType.id)
                  })
                  .map(item => item.fullName).join(', ');
                return `${response || '-'}`;
              },
            },
            {
              name: 'delay',
              label: 'Delay',
              field: 'delay',
              format: (val) => {
                if(typeof val === 'boolean') {
                  return val ? 'Yes' : 'No'
                }
                return '-'
              },
            },
            {
              name: 'cancellationType',
              label: 'Cancellation type',
              field: 'cancellationType',
              format: (val) => (val ? val : "-"),
            },
            {
              name: 'valueRule',
              label: 'Value rule',
              field: 'valueRule',
              format: (val) => (val ? val : "-"),
            },
            {
              name: 'valueFrom',
              label: 'Value from',
              field: 'valueFrom',
              format: (val) => (val ? val : "-"),
            },
            {
              name: 'valueTo',
              label: 'Value to',
              field: 'valueTo',
              format: (val) => (val ? val : "-"),
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
          ],
          filters: {
            contractId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.contracts',
                select: {'label': 'contractName', 'id': 'id'},
              },
              props: {
                label: 'Contract',
                'clearable': true
              },
            },
            productId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.products',
                select: {'label': 'fullName', 'id': 'id'},
              },
              props: {
                label: 'Sales Item',
                'clearable': true
              },
            },
          },
          actions: [],
          requestParams: {
            include: 'contract,contractLine,product',
          }
        },
        update: {
          title: 'Update passenger contract rules'
        },
        delete: true,
        formLeft: {
          contractId: {
              value: null,
              type: 'select',
              loadOptions: {
                  apiRoute: 'apiRoutes.qramp.setupContracts',
                  select: {'label': 'contractName', 'id': 'id'},
                  filterByQuery: true,
              },
              props: {
                  label: 'Contract',
                  'clearable': true,
                  rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              },
          },
          contractLineId: {
              value: null,
              type: 'select',
              loadOptions: {
                  apiRoute: 'apiRoutes.qsetupagione.contractLines',
                  select: {'label': 'contractLineName', 'id': 'id'},
                  filterByQuery: true,
              },
              props: {
                  label: 'Contract Line',
                  'clearable': true,
                  rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              },
          },
          productId: {
              value: null,
              type: 'select',
              loadOptions: {
                  apiRoute: 'apiRoutes.qramp.products',
                  select: {'label': 'name', 'id': 'id'},
                  filterByQuery: true,
              },
              props: {
                  label: 'Product',
                  'clearable': true,
                  rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              },
          },
          aircraftTypes: {
            value: [],
            type: 'select',
            props: {
              label: 'Aircraft Types',
              multiple: true,
              useChips: true,
              clearable: true,
              color: "primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qfly.aircraftTypes',
              select: {label: 'fullNameWithType', id: 'id'},
            },
          },
          operationTypes: {
            value: [],
            type: 'select',
            props: {
              label: 'Operation Types',
              multiple: true,
              useChips: true,
              clearable: true,
              color: "primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.operationTypes',
              select: {label: 'operationName', id: 'id'},
            }
          },
          delay: {
            value: null,
            type: "select",
            props: {
              label: 'Delay',
              options: [
                {label: 'Yes', value: true},
                {label: 'No', value: false},
              ],
            },
          },
          cancellationType: {
            value: null,
            type: 'select',
            props: {
              label: 'Cancellation type',
              clearable: true,
              color:"primary",
              options: [
                {label: 'Cancelled Flight', value: 'cancelledFlight'},
                {label: 'Cancelled Flight W/Services', value: 'cancelledFlightWServices'}
              ]
            },
          },
          valueRule: {
            value: null,
            type: 'select',
            props: {
              label: 'Value rule',
              clearable: true,
              color:"primary",
              options: [
                {label: 'Greater Than', value: 'Greater Than'},
                {label: 'Greater than or equal', value: 'Greater than or equal'},
                {label: 'Less than', value: 'Less than'},
                {label: 'Less than or equal', value: 'Less than or equal'},
                {label: 'Between', value: 'Between'},
                {label: 'Equal', value: 'Equal'}
              ]
            },
          },
          valueFrom: {
            value: null,
            type: "input",
            props: {
              label: 'Value from',
            },
          },
          valueTo: {
            value: null,
            type: "input",
            props: {
              label: 'Value to',
            },
          },
        },
        formRight: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods: {
    visibleModal(show = false) {
      uploadContractRulesStore.showModal = show
    }
  }
}
</script>
<style lang="stylus">
</style>
