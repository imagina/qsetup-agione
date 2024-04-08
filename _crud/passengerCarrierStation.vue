<template></template>

<script>
import { COMPANY_PASSENGER } from 'src/modules/qramp/_components/model/constants.js'
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList.ts'
import qRampStore from 'src/modules/qramp/_store/qRampStore.js'
export default {
  async beforeCreate() {
   await qRampStore().setIsPassenger(true)
   await workOrderList().getCustomerWithContract()
  },
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    companies() {
      const passengerCompanies = this.$getSetting('ramp::passengerCompanies') || []
      return passengerCompanies.length > 0 ? passengerCompanies : COMPANY_PASSENGER;
    },
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    },
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: "apiRoutes.qsetupagione.passengerCarrierStations",
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "StationName",
              label: "Station Name",
              field: "station",
              format: val => val ? val.stationName : '' ,
              align: "left",
            },
            {
              name: "airlineName",
              label: "Airline Name",
              field: "airline",
              format: val => val ? val.airlineName : '' ,
              align: "left",
            },
            {
              name: "codeShares",
              label: "Code Shares",
              field: "airline",
              formatAsync: async item => {
                const response = await workOrderList().getAirlinesList().find(airline => airline.id == item.codeShares);
                return response ? response.airlineName : '-'
              },
              align: "left",
            },
            {
              name: 'Customer/Contract',
              label:'Customer/Contract',
              field: item => item.customCustomerName || item.customerId,
              formatAsync: async item => {
                  const response = await this.findCustomerContracts(item) || {label: '-'}
                  return `${response.label || '-'}`;
                },
                align: 'left'
              },
            {
              name: "status",
              label: this.$tr('isite.cms.form.status'),
              field: "status",
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          requestParams: {include: 'station,airline'},
          filters: {
            status: {
              value: null,
              type: 'select',
              props: {
                label: `${this.$tr('isite.cms.form.status')}:`,
                clearable: true,
                options: [
                  {label: this.$tr('isite.cms.label.enabled'), value: true},
                  {label: this.$tr('isite.cms.label.disabled'), value: false},
                ]
              }
            },
            stationId: {
              value: null,
              type: 'crud',
              props: {
                crudType: 'select',
                crudData: import('../_crud/stations'),
                crudProps: {
                  label: 'Station Name',
                  clearable: true,
                },
                config: {
                  options: {label: 'fullName', value: 'id'},
                  requestParams: {filter: {companyId: this.companies}}
                },
              },
            },
          }
        },
        create: {
          title: 'Create Passenger Carrier Station'
        },
        update: {
          title: 'Update Passenger Carrier Station',
          mapData: (data) => {
            data.customerContract = this.findCustomerContracts(data)
            return data
          }
        },
        delete: true,
        formLeft: {
          id: {
            value: null,
          },
          customerId: {
            value: null,
          },
          contractId: {
            value: null,
          },
          customerContract: {
              value: null,
              type: 'select',
              props: {
                label: 'Customer/Contract',
                clearable: true,
                options: workOrderList().getCustomerWithContractLists(),
                emitValue: false,
              },
          },
          stationId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('../_crud/stations'),
              crudProps: {
                label: 'Station Name',
              },
              config: {
                options: {label: 'fullName', value: 'id'},
                requestParams: {filter: {companyId: this.companies }}
              },
            },
          },
          airlineId: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('src/modules/qfly/_crud/airline'),
              crudProps: {
                label: 'Airline',
              },
              config: {options: {label: 'airlineName', value: 'id'}},
            },
          },
          codeShares: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('src/modules/qfly/_crud/airline'),
              crudProps: {
                label: 'Code Shares',
              },
              config: {options: {label: 'airlineName', value: 'id'}},
            },
          },
          separationHours: {
            value: null,
            type: 'input',
            props: {
              label: `Flight Schedule Inbound/Outbound separation by Hours`,
              type: "number",
              step: "0.1",
            },
          },
          status: {
            value: true,
            type: 'select',
            props: {
              label: `${this.$tr('isite.cms.form.status')}:`,
              options: [
                {label: this.$tr('isite.cms.label.enabled'), value: true},
                {label: this.$tr('isite.cms.label.disabled'), value: false},
              ]
            }
          },
        },
        getDataForm: (formData, type) => {
          return new Promise(resolve => {
            const customerContract = workOrderList().getCustomerWithContractLists().find(item => {
              if(formData.customerContract) {
                return item.value === formData.customerContract.value
              }
            })
            if(customerContract) {
              formData.contractId = customerContract.contractId;
              formData.customerId = customerContract.id;
              delete formData.customerContract;
            }
            resolve(formData);
          })
        }
      };
    },
  },
  methods:{
    findCustomerContracts(formData) {
      const customerContract = workOrderList().getCustomerWithContractLists().find(item => {
            if(formData.customerId && formData.contractId) {
              return item.id == formData.customerId && item.contractId == formData.contractId
            }
            return item.id == formData.customerId;
      });
      return customerContract
    }
  }
};
</script>
