const pages = config('pages') // Get Pages from config
export default [
  {
    title: 'isetup.cms.sidebar.setupInfo',
    icon: 'fas fa-landmark',
    children: [
      pages.qsetupagione.companies,
      pages.qsetupagione.stations,
      pages.qsetupagione.buildings,
      pages.qsetupagione.contractRules
    ]
  },
]
