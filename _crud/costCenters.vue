<template></template>

<script>
export default {
  computed: {
    crudData() {
      return {
        crudId: this.$uid(),
        apiRoute: "apiRoutes.qsetupagione.setupCostCenters",
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "name",
              label: "Name",
              field: "name",
              align: "left",
            },
            {
              name: "workDayId",
              label: "WorkDay Id",
              field: "workDayId",
              align: "left",
            },
            {
              name: "buildingName",
              label: "Building Name",
              field: "building",
              format: val => val ? val.buildingName : '',
              align: "left",
            },
            {
              name: "businessUnitType",
              label: "Business Unit Type",
              field: "businessUnitType",
              format: val => val ? val.unitTypeName : '',
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          requestParams: {include: "building,businessUnitType"},
        },
        create: {
          title: 'Create Cost Centers'
        },
        update: {
          title: 'Update Cost Centers'
        },
        delete: true,
        formLeft: {
          id: {
            value: null,
          },
          name: {
            name: "name",
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'Name',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Building Name',
          },
          workDayId: {
            name: "workDayId",
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'WorkDay Id',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'workDay Id',
          },
          workDayWid: {
            name: "workDayWid",
            value: '',
            type: 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              label: 'workDayWid',
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: 'Building Name',
          },
          buildingId: {
            value: "",
            type: "select",
            props: {
              label: "building",
            },
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupBuildings",
              select: { label: "buildingName", id: "id" },
              requestParams: { refresh: true },
            },
          },
          companyId: {
            value: "",
            type: "select",
            props: {
              label: "company",
            },
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupCompanies",
              select: { label: "companyName", id: "id" },
              requestParams: { refresh: true },
            },
          },
          businessUnitTypeId: {
            value: "",
            type: "select",
            props: {
              label: "Business Unit Type",
            },
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.businessUnitTypes",
              select: { label: "unitTypeName", id: "id" },
              requestParams: { refresh: true },
            },
          },
          oldId: {
            value: null,
          },
          externalId: {
            value: null,
          },
          options: {
            value: null,
          },                  
        },
      };
    },
  },
};
</script>