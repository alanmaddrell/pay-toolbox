const index = {}

// @TODO(sfount) dependancy on toolbox service store - encapsulate into pay-request
const serviceStore = require('./../../services.store')

index[serviceStore.ADMINUSERS.key] = require('./adminUsers')
index[serviceStore.CONNECTOR.key] = require('./connector')
index[serviceStore.PUBLICAUTH.key] = require('./publicAuth')
index[serviceStore.LEDGER.key] = require('./ledger')
index[serviceStore.PRODUCTS.key] = require('./products')

module.exports = index
