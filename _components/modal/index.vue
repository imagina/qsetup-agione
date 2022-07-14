<template>
  <div>
    <master-modal
      id="modalComponent"
      v-model="visibleContract"
      v-bind="modalProps"
      custom-position
      :persistent="true"
      :loading="modalLoadingContract"
      @hide="hideVisibleContract"
      :width="'90vw'"
      :maximized="$q.screen.lt.md"
    >
      <basicData />
      <contractLineTable />
    </master-modal>
  </div>
</template>
<script>
import qSetupStore from "@imagina/qsetupagione/_store/qSetupStore.js";
import basicData from '@imagina/qsetupagione/_components/modal/basicData.vue';
import contractLineTable from '@imagina/qsetupagione/_components/modal/contractLineTable.vue';

export default {
  components: {
    basicData,
    contractLineTable
  },
  computed: {
    visibleContract: {
      get() {
        return qSetupStore().getVisibleContract();
      },
      set(value) {
        qSetupStore().setVisibleContract(value);
      },
    },
    modalProps() {
      return qSetupStore().getModalProps();
    },
    modalLoadingContract() {
      return qSetupStore().getModalLoadingContract();
    },
  },
  methods: {
    hideVisibleContract() {
      qSetupStore().hideVisibleContract();
      qSetupStore().resetBasicDataContract();
      qSetupStore().setContractLineList([]);
    },
  },
};
</script>