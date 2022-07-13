<template>
  <div>
    <master-modal
      id="modalComponent"
      v-model="visibleContract"
      v-bind="modalProps"
      :persistent="true"
      :loading="modalLoadingContract"
      @hide="hideVisibleContract"
      :width="'90vw'"
      :maximized="$q.screen.lt.md"
    >
      <basicData />
    </master-modal>
  </div>
</template>
<script>
import qSetupStore from "@imagina/qsetupagione/_store/qSetupStore.js";
import basicData from '@imagina/qsetupagione/_components/modal/basicData.vue';

export default {
  components: {
    basicData
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
    },
  },
};
</script>