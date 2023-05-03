<template></template>

<script>
export default {
  computed: {
    crudData() {
      return {
        crudId: this.$uid(),
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
              name: "Airline Name",
              label: "Airline Name",
              field: "airline",
              format: val => val ? val.airlineName : '' ,
              align: "left",
            },
            {
              name: "Status",
              label: "Status",
              field: "status",
              format: val => val ? this.$tr("isite.cms.label.enabled") : this.$tr("isite.cms.label.disabled"),
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          requestParams: {include: 'station,airline'},
        },
        create: {
          title: 'Create Passenger Carrier Station'
        },
        update: {
          title: 'Update Passenger Carrier Station'
        },
        delete: true,
        formLeft: {
          id: {
            value: null,
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
              config: {options: {label: 'stationName', value: 'id'}},
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
          status: {
            value: null,
            type: 'select',
            props: {
              label: 'Status',
              options:[
                { label:this.$tr("isite.cms.label.enabled"),value: true },
                { label:this.$tr("isite.cms.label.disabled"),value: false }]
            }
          },
        },
      };
    },
  },
};
</script>