import crypto from 'crypto'

interface TokenParams {
  merchantId: string
  merchantKey: string
  merchantSalt: string
  merchantOid: string
  userIp: string
  email: string
  paymentAmount: number
  userBasket: string
  noInstallment: string
  maxInstallment: string
  currency: string
  testMode: string
}

export const createPaytrToken = ({
  merchantId,
  merchantKey,
  merchantSalt,
  merchantOid,
  userIp,
  email,
  paymentAmount,
  userBasket,
  noInstallment,
  maxInstallment,
  currency,
  testMode,
}: TokenParams): string => {
  const hashString = `${merchantId}${userIp}${merchantOid}${email}${paymentAmount}${userBasket}${noInstallment}${maxInstallment}${currency}${testMode}`

  return crypto
    .createHmac('sha256', merchantKey)
    .update(hashString + merchantSalt)
    .digest('base64')
}

interface ValidateParams {
  merchantOid: string
  merchantSalt: string
  status: string
  totalAmount: string
  merchantKey: string
  receivedHash: string
}

export const validateCallbackHash = ({
  merchantOid,
  merchantSalt,
  status,
  totalAmount,
  merchantKey,
  receivedHash,
}: ValidateParams): boolean => {
  const hashStr = merchantOid + merchantSalt + status + totalAmount

  const calculatedHash = crypto.createHmac('sha256', merchantKey).update(hashStr).digest('base64')

  return calculatedHash === receivedHash
}
