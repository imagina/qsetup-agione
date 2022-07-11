<template>
  <master-modal v-model="form.show" custom-position :title="form.title">
    <form-contract-form :row="form.data"/>
  </master-modal>
</template>
<script>
//components
import formContractForm from "@imagina/qsetupagione/_components/formContractRules"

export default {
  components: {formContractForm},
  data() {
    return {
      crudId: this.$uid(),
      form: {
        title: '',
        show: false,
        data: null
      }
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qsetupagione.contractRules',
        permission: 'setup.contract-rules',
        create: {
          method: () => {
            this.form = {
              title: this.$tr('setupagione.cms.newContractRule'),
              show: true,
              data: null
            }
          }
        },
        read: {
          columns: [
            {
              name: 'id', label: this.$tr('isite.cms.form.id'),
              field: 'id',
              sortable: true,
            },
            {
              name: 'title', label: this.$tr('isite.cms.form.title'),
              field: 'title',
              align: 'left',
              sortable: true,
            },
            {
              name: 'createdAt', label: this.$tr('isite.cms.form.createdAt'), field: 'createdAt',
              format: val => val ? this.$trd(val) : '-',
              align: 'left', sortable: true
            },
            {
              name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'center'
            },
          ],
          requestParams: {},
          filters: {}
        },
        update: {
          method: (item) => {
            this.form = {
              title: this.$tr('setupagione.cms.updateContractRule'),
              show: true,
              data: item
            }
          }
        },
        delete: true,
        formLeft: {},
        formRight: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
