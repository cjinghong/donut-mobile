import { Instance, types } from "mobx-state-tree"

// export const OpenSeaAccount = types.model({
//   address: types.string,
//   config: types.string,
//   profileImgUrl: types.string,
//   user: types.maybeNull(types.model({
//     username: types.string
//   }))
// })

export const NFTModel = types.model({
  externalLink: types.maybeNull(types.string),
  imagePreviewUrl: types.string,
  imageUrl: types.maybeNull(types.string),
  imageUrlOriginal: types.maybeNull(types.string),
  imageUrlThumbnail: types.string,
  collection: types.model({
    createdDate: types.Date,
    description: types.string,
    externalLink: types.maybeNull(types.string),
    name: types.string,
    payoutAddress: types.maybeNull(types.string)
  }),
  traits: types.maybeNull(types.array(types.model({
    trait_type: types.maybeNull(types.string),
    trait_count: types.maybeNull(types.number),
    value: types.maybeNull(types.union(types.string, types.number)),
  }))),
  // lastSale: types.maybeNull(types.model({
  //   eventType: types.enumeration([
  //     "created",
  //     "successful",
  //     "cancelled",
  //     "offer_entered",
  //     "bid_entered",
  //     "bid_withdraw",
  //     "transfer",
  //     "approve",
  //     "composition_created",
  //     "custom",
  //     "payout"
  //   ]),
  //   eventTimestamp: types.Date,
  //   auctionType: types.enumeration([
  //     "dutch",
  //     "english",
  //     "min_price",
  //   ]),
  //   totalPrice: types.string,
  //   transaction: types.maybeNull(types.model({
  //     fromAccount: OpenSeaAccount,
  //     toAccount: OpenSeaAccount,
  //     createdDate: types.Date,
  //     modifiedDate: types.Date,
  //     transactionHash: types.string,
  //     transactionIndex: types.string,
  //     blockNumber: types.string,
  //     blockHash: types.string,
  //     timestamp: types.Date
  //   })),
  //   paymentToken: types.maybeNull(types.model({
  //     name: types.string,
  //     symbol: types.string,
  //     decimals: types.number,
  //     address: types.string,
  //     imageUrl: types.maybe(types.string),
  //     ethPrice: types.maybe(types.string),
  //     usdPrice: types.maybe(types.string),
  //   }))
  // })),
  name: types.string,
  description: types.maybeNull(types.string),
  backgroundColor: types.maybeNull(types.string),
  openseaLink: types.string,
  tokenAddress: types.string,
  tokenId: types.string,
})

export interface NFT extends Instance<typeof NFTModel> { }
