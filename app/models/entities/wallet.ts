import { Instance, types } from "mobx-state-tree"

export const WalletModel = types.model({
  // Required
  publicKey: types.string,
  privateKey: types.maybe(types.string),
})

export interface Wallet extends Instance<typeof WalletModel> {}
