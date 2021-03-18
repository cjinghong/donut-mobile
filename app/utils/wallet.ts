import { Wallet } from "../models/entities/wallet"

/// Compare and check if a similar wallet already exists
export const existsIn = (value: string | number, wallets: Wallet[]) => {
  return !!wallets.find((w) => {
    const walletVals = Object.values(w).sort().join(',')
    return value === walletVals
  })
}
