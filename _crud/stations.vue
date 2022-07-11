<template></template>

<script>
export default {
  computed: {
    crudData() {
      return {
        //permission: 'setup.stations.manage',
        crudId: this.$uid(),
        //entityName: config("main.qsetupagione.entityNames.stations"),
        apiRoute: "apiRoutes.qsetupagione.setupStations",
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "stationName",
              label: "Station Name",
              field: "stationName",
              field: 'workOrderStatus',
              align: "left",
            },
            {
              name: "stationCode",
              label: "Station Code",
              field: "stationCode",
              align: "left",
            },
            {
              name: "airportName",
              label: "Airport Name",
              field: "airport",
              format: val => val ? val.airportName: '',
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          requestParams: {include: 'airport'},
        },
        create: {
          title: 'Create station'
        },
        update: {
          title: 'Update companies'
        },
        delete: true,
        formLeft: {
          stationName: {
            name:'stationName',
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'Station Name',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Station Name',
          },
          stationCode: {
            name:'stationCode',
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'Station Code',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Station Code',
          },
          airportId: {
            value: '',
            type: 'select',
            props: {
              label: 'Airport Name',
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.airports',
              select: {label: 'airportName', id: 'id'},
              requestParams: {refresh: true}
            }
          },
        },
      };
    },
  },
};
</script>