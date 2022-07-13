<template>
  <div>
    <master-modal
      id="modalComponent"
      v-model="visibleContract"
      v-bind="modalProps"
      :persistent="true"
      :loading="Loading"
      @hide="hideVisibleContract"
      :width="'90vw'"
      :maximized="$q.screen.lt.md"
    >
      <div class="q-py-lg">
        <q-card class="my-card">
          <q-card-section>
            <div class="row q-px-md">
              <div
                :class="{
                  'col-6': isDesktop,
                  'col-12': !isDesktop,
                }"
              >
                <p>Name: {{ basicDataContract.contractName }}</p>
                <p>Customer: {{ basicDataContract.customer.customerName }}</p>
                <p>Status: {{ basicDataContract.contractStatus.statusName }}</p>
              </div>
              <div
                :class="{
                  'col-6': isDesktop,
                  'col-12': !isDesktop,
                }"
              >
                <p>Cost Center: {{ basicDataContract.costCenter.name }}</p>
                <p>WorkDay: {{ basicDataContract.workdayId }}</p>
                <p>Work Tag: {{ basicDataContract.worktag }}</p>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </master-modal>
  </div>
</template>
<script>
import qSetupStore from "@imagina/qsetupagione/_store/qSetupStore.js";
export default {
  data() {
    return {};
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
    isDesktop() {
      return window.innerWidth >= "900";
    },
    basicDataContract() {
      return qSetupStore().getBasicDataContract();
    },
    Loading() {
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