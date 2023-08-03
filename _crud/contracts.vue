<template></template>

<script>
export default {
  computed: {
    crudData() {
      return {
        //permission: 'setup.stations.manage',
        crudId: this.$uid(),
        //entityName: config("main.qsetupagione.entityNames.stations"),
        apiRoute: "apiRoutes.qsetupagione.contracts",
        read: {
          columns: [
            {
              name: "id",
              label: this.$tr("isite.cms.form.id"),
              field: "id",
              style: "width: 50px",
            },
            {
              name: "contractName",
              label: "Contract Name",
              field: "contractName",
              align: "left",
            },
            {
              name: "customerName",
              label: "Customer Name",
              field: "customerName",
              align: "left",
            },
            {
              name: "building",
              label: "building Name",
              field: "building",
              format: val => val ? val.buildingName : '-',
              align: "left",
            },
            {
              name: "costCenter",
              label: "Cost Center name",
              field: "costCenter",
              format: val => val ? val.name : '-',
              align: "left",
            },
            {
              name: "workdayId",
              label: "Workday Id",
              field: "workdayId",
              align: "left",
            },
            {
              name: "contractEffectiveDate",
              label: "Contract Effective Date",
              field: "contractEffectiveDate",
              align: "left",
            },
            {
              name: "contractSignedDate",
              label: "Contract Signed Date",
              field: "contractSignedDate",
              align: "left",
            },
            {
              name: "actions",
              label: this.$tr("isite.cms.form.actions"),
              align: "left",
            },
          ],
          filters: {
            customerId: {
              quickFilter: true,
              value: null,
              type: "select",
              loadOptions: {
                apiRoute: "apiRoutes.qsetupagione.setupCustomers",
                select: { label: "customerName", id: "id" },
              },
              props: {
                label: "Customer",
                clearable: true,
              },
            },
            buildingId: {
              value: null,
              type: "select",
              quickFilter: true,
              loadOptions: {
                apiRoute: "apiRoutes.qsetupagione.setupBuildings",
                select: { label: "buildingName", id: "id" },
              },
              props: {
                label: "Building",
                clearable: true,
              },
            },
            costCenterId: {
              value: null,
              type: "select",
              quickFilter: true,
              loadOptions: {
                apiRoute: "apiRoutes.qsetupagione.setupCostCenters",
                select: { label: "name", id: "id" },
              },
              props: {
                label: "Cost Center",
                clearable: true,
              },
            },
            businessUnitId: {
              value: null,
              type: "select",
              quickFilter: true,
              loadOptions: {
                apiRoute: "apiRoutes.qsetupagione.businessUnits",
                select: { label: "workdayWid", id: "id" },
              },
              props: {
                label: "Business Unit Id",
                clearable: true,
              },
            },
          },
          requestParams: {},
        },
        create: {
          title: "Create contract",
        },
        update: {
          title: "Update contract",
        },
        delete: true,
        formLeft: {
          id: {
            value: null,
          },
          contractName: {
            value: "",
            type: "input",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: "Contract Name",
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
            label: "Contract Name",
          },
          contractDescription: {
            value: "",
            type: "input",
            props: {
              type: "textarea",
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: "Contract Description",
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
            label: "Contract Description",
          },
          readyToPostWd: {
            value: "false",
            type: "select",
            props: {
              label: "Ready To Post Wd",
              options: [
                { id: 0, value: "false", label: "false" },
                { id: 1, value: "true", label: "true" },
              ],
            },
          },
          oneClickPost: {
            value: "false",
            type: "select",
            props: {
              label: "One Click Post",
              options: [
                { id: 0, value: "false", label: "false" },
                { id: 1, value: "true", label: "true" },
              ],
            },
          },
        },
        formRight: {
          contractStatusId: {
            value: "",
            type: "input",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: "contract Status Id",
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
            label: "contract Status Id",
          },
          contractTypeId: {
            value: "",
            type: "select",
            props: {
              label: "Contract Type",
            },
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.contractType",
              select: { label: "typeName", id: "id" },
              requestParams: { refresh: true },
            },
          },
          contractEffectiveDate: {
            value: "",
            type: "fullDate",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: `* Contract Effective Date`,
              clearable: true,
              color: "primary",
              format24h: true,
            },
          },
          workdayId: {
            value: "",
            type: "input",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: "Workday Id",
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
            },
            label: "Workday Id",
          },
          customerId: {
            value: null,
            type: "select",
            quickFilter: true,
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupCustomers",
              select: { label: "customerName", id: "id" },
            },
            props: {
              label: "Customer",
              clearable: true,
            },
          },
          buildingId: {
            value: null,
            type: "select",
            quickFilter: true,
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupBuildings",
              select: { label: "buildingName", id: "id" },
            },
            props: {
              label: "Building",
              clearable: true,
            },
          },
          costCenterId: {
            value: null,
            type: "select",
            quickFilter: true,
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupCostCenters",
              select: { label: "name", id: "id" },
            },
            props: {
              label: "Cost Center",
              clearable: true,
            },
          },
          businessUnitId: {
            value: null,
            type: "select",
            quickFilter: true,
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.businessUnits",
              select: { label: "workdayWid", id: "id" },
            },
            props: {
              label: "Business Unit Id",
              clearable: true,
            },
          },
          companyId: {
            value: null,
            type: "select",
            quickFilter: true,
            loadOptions: {
              apiRoute: "apiRoutes.qsetupagione.setupCompanies",
              select: { label: "fullName", id: "id" },
            },
            props: {
              label: "Company",
              clearable: true,
            },
          },
        },
      };
    },
  },
};
</script>
