export default {
  companies: {
    activated: true,
    authenticated: true,
    path: '/setup/companies',
    name: 'qsetupagione.admin.companies',
    crud: import('@imagina/qsetupagione/_crud/companies'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'isetup.cms.sidebar.companies',
    icon: 'fas fa-briefcase',
    subHeader: {
      refresh: true,
    }
  },
  stations: {
    activated: true,
    authenticated: true,
    path: '/setup/stations',
    name: 'qsetupagione.admin.stations',
    crud: import('@imagina/qsetupagione/_crud/stations'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'isetup.cms.sidebar.stations',
    icon: 'fas fa-briefcase',
    subHeader: {
      refresh: true,
    }
  },
  buildings: {
    activated: true,
    authenticated: true,
    path: '/setup/buildings',
    name: 'qsetupagione.admin.buildings',
    crud: import('@imagina/qsetupagione/_crud/buildings'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'isetup.cms.sidebar.buildings',
    icon: 'fas fa-briefcase',
    subHeader: {
      refresh: true,
    }
  },
}
