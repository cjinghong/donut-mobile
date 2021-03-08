import { cast, Instance, SnapshotOut, types } from "mobx-state-tree"
import { NFTModel } from "../entities/nft"
import { Wallet, WalletModel } from "../entities/wallet"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types
  .model("RootStore")
  .props({
    onboarded: types.optional(types.boolean, false),
    wallets: types.optional(types.array(WalletModel), []),
    currentWalletIndex: types.optional(types.number, 0),
    nfts: types.optional(types.array(NFTModel), [])
  })
  .actions((self) => ({
    setOnboarded: () => {
      self.onboarded = true
    },
    addWallet: (wallet: Wallet) => {
      if (self.wallets.includes(wallet)) {
        throw Error('This wallet already exist!')
      } else if (!wallet.publicKey) {
        throw Error('Public key cannot be empty.')
      } else {
        self.wallets = cast([...self.wallets, wallet])
        self.currentWalletIndex = 0
      }
    },
    setCurrentWalletIndex: (index: number) => {
      self.currentWalletIndex = index
    }
  }))

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
