const pages = config('pages') // Get Pages from config
export default [
    {
        title: 'isetup.cms.sidebar.setupInfo',
        icon: 'fas fa-arrows-alt',
        children: [
          pages.qsetupagione.companies,
          pages.qsetupagione.stations,
          pages.qsetupagione.buildings
        ]
    },
]
