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
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.setupStations',
                select: { 'label': 'fullName', 'id': 'id' },
                requestParams: {
                  filter: {
                    companyId: 30,
                  },
                },
              },
              props: {
                label: 'Station',
                'clearable': true
              },
          },
          airlineId: {
              value: null,
              type: 'select',
              props: {
                label: 'Carrier',
              },
              loadOptions: {
                apiRoute: 'apiRoutes.qfly.airlines',
                select: {
                  label:'airlineName',
                  id: 'id'
                },
                refresh: true,
              }
          },
        },
      };
    },
  },
};
</script>