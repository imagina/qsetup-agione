const moduleName = 'setup';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

const flightModuleName = 'flight';
const flightUrlBase = `/${flightModuleName}/${moduleVersion}`

export default {
  urlBase: urlBase,
  version: moduleVersion,
  setupCompanies: `${urlBase}/companies`,
  setupBuildings: `${urlBase}/buildings`,
  setupStations: `${urlBase}/stations`,
  airports: `${flightUrlBase}/airports`,
  contractRules: `${urlBase}/contract-rules`
}
