const { EntityNotFoundError } = require('../../errors')

const adminUsersMethods = function adminUsersMethods(instance) {
  const axiosInstance = instance || this
  const utilExtractData = response => response.data

  const user = function user(id) {
    const path = `/v1/api/users/${id}`
    return axiosInstance.get(path)
      .then(utilExtractData)
      .catch((error) => {
        if (error.data.response && error.data.response.status === 404) throw new EntityNotFoundError('User', id)
        throw error
      })
  }

  const updateUserPhone = function updateUserPhone(id, phoneNumber) {
    const path = `/v1/api/users/${id}`
    const payload = {
      op: 'replace',
      path: 'telephone_number',
      value: phoneNumber
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  const updateUserEmail = function updateUserEmail(id, email) {
    const path = `/v1/api/users/${id}`
    const payload = {
      op: 'replace',
      path: 'username',
      value: email
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  const toggleUserEnabled = async function toggleUserEnabled(id) {
    const path = `/v1/api/users/${id}`
    const currentUser = await user(id)

    const payload = {
      op: 'replace',
      path: 'disabled',
      value: !currentUser.disabled
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  const service = function service(id) {
    const path = `/v1/api/services/${id}`
    return axiosInstance.get(path)
      .then(utilExtractData)
      .catch((error) => {
        if (error.data.response && error.data.response.status === 404) {
          throw new EntityNotFoundError('Service', id)
        }
        throw error
      })
  }

  const removeUserFromService = function removeUserFromService(serviceId, userId) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const path = `/v1/api/services/${serviceId}/users/${userId}`

    // @TODO(sfount) make sure admin headers are correctly set to allow user to be removed
    throw new Error('Remove user from service end point not configured')
  }

  const resetUserSecondFactor = function resetUserSecondFactor() {
    // @TODO(sfount) configure new OTP source and reset secondFactor = SMS
    throw new Error('Reset second factor end point not configured')
  }

  const services = function services() {
    const path = '/v1/api/services/list'
    return axiosInstance.get(path).then(utilExtractData)
  }

  const serviceUsers = function serviceUsers(id) {
    const path = `/v1/api/services/${id}/users`
    return axiosInstance.get(path).then(utilExtractData)
  }

  const gatewayAccountServices = function gatewayAccountServices(id) {
    return axiosInstance.get(`/v1/api/services?gatewayAccountId=${id}`).then(utilExtractData)
  }

  const serviceStripeAgreement = function serviceStripeAgreement(serviceExternalId) {
    return axiosInstance.get(`/v1/api/services/${serviceExternalId}/stripe-agreement`)
      .then(utilExtractData)
      .catch((error) => {
        if (error.data.response && error.data.response.status === 404) {
          throw new EntityNotFoundError('Service Stripe agreement for service ', serviceExternalId)
        }
        throw error
      })
  }

  const updateServiceBranding = function updateServiceBranding(id, imageUrl, cssUrl) {
    const path = `/v1/api/services/${id}`
    const payload = {
      op: 'replace',
      path: 'custom_branding',
      value: { image_url: imageUrl, css_url: cssUrl }
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  const updateServiceGatewayAccount = function updateServiceGatewayAccount(id, accountId) {
    const path = `/v1/api/services/${id}`
    const payload = {
      op: 'add',
      path: 'gateway_account_ids',
      value: [ accountId.toString() ]
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  const updateServiceGoLiveStatus = function updateServiceGoLiveStatus(id, status) {
    const path = `v1/api/services/${id}`
    const payload = {
      op: 'replace',
      path: 'current_go_live_stage',
      value: status
    }
    return axiosInstance.patch(path, payload).then(utilExtractData)
  }

  return {
    user,
    service,
    services,
    serviceUsers,
    serviceStripeAgreement,
    updateServiceBranding,
    updateServiceGatewayAccount,
    gatewayAccountServices,
    updateServiceGoLiveStatus,
    updateUserPhone,
    updateUserEmail,
    toggleUserEnabled,
    removeUserFromService,
    resetUserSecondFactor
  }
}

module.exports = adminUsersMethods
