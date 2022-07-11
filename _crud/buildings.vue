<template></template>

<script>
export default {
  computed: {
    crudData() {
      return {
        //permission: 'setup.buildings.manage',
        crudId: this.$uid(),
        //entityName: config("main.qsetupagione.entityNames.companies"),
        apiRoute: "apiRoutes.qsetupagione.setupBuildings",
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "buildingName",
              label: "Building Name",
              field: "buildingName",
              align: "left",
            },
            {
              name: "StationName",
              label: "Station Name",
              field: "station",
              format: val => val ? val.stationName : '' ,
              align: "left",
            },
            {
              name: "address",
              label: "Address",
              field: "address",
              align: "left",
            },
            {
              name: "companyName",
              label: "Company Name",
              field: "company",
              format: val => val ? val.companyName : '',
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          requestParams: {include: "company,station"},
        },
        create: {
          title: 'New buildings'
        },
        update: {
          title: 'Edit buildings'
        },
        delete: true,
        formLeft: {
          buildingName: {
            name:'buildingName',
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'Building Name',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Building Name',
          },
          stationId: {
            value: '',
            type: 'select',
            props: {
              label: 'Station Name',
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.setupStations',
              select: {label: 'stationName', id: 'id'},
              requestParams: {refresh: true}
            }
          },
          address: {
            name:'address',
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'Address',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Address',
          },
          companyId: {
            value: '',
            type: 'select',
            props: {
              label: 'Company Name',
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.setupCompanies',
              select: {label: 'companyName', id: 'id'},
              requestParams: {refresh: true}
            }
          },
        },
      };
    },
  },
};
</script>