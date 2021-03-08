import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NFTModel } from "../entities/nft"
import { WalletModel } from "../entities/wallet"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types
  .model("RootStore")
  .props({
    onboarded: types.optional(types.boolean, false),
    wallets: types.optional(types.array(WalletModel), []),
    currentWallet: types.maybe(WalletModel),
    nfts: types.optional(types.array(NFTModel), [])
  })
  .actions((self) => ({
    setOnboarded: () => {
      self.onboarded = true
    },
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
