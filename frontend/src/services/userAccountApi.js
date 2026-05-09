import { apiRequest } from './api'

export const getMyAccountData = async () => {
  const payload = await apiRequest('/users/me/account-data')
  return payload.data || {
    addresses: [],
    paymentVault: { bankAccounts: [], upiIds: [], cards: [] },
    paymentHistory: [],
  }
}

export const updateMyAccountData = async (accountData) => {
  const payload = await apiRequest('/users/me/account-data', {
    method: 'PATCH',
    body: JSON.stringify(accountData),
  })
  return payload.data || {
    addresses: [],
    paymentVault: { bankAccounts: [], upiIds: [], cards: [] },
    paymentHistory: [],
  }
}
