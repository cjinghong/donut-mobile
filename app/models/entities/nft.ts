import { Instance, types } from "mobx-state-tree"

export const NFTModel = types.model({
  // assetContract: types.model({
  //   name: types.string,
  //   address: types.string,
  //   description: types.string,
  //   imageUrl: types.string,
  //   externalLink: types.string,
  //   buyerFeeBasisPoints: types.number,
  //   devBuyerFeeBasisPoints: types.number,
  //   devSellerFeeBasisPoints: types.number,
  //   openseaBuyerFeeBasisPoints: types.number,
  //   openseaSellerFeeBasisPoints: types.number,
  //   schemaName: types.string,
  //   sellerFeeBasisPoints: types.number,
  //   tokenSymbol: types.string,
  //   type: types.string,
  //   wikiLink: types.maybe(types.string)
  // }),
  // TODO: - Shape of buy orders
  // buyOrders: types.maybe(types.model())

  externalLink: types.maybe(types.string),
  imagePreviewUrl: types.string,
  imageUrl: types.string,
  imageUrlOriginal: types.string,
  imageUrlThumbnail: types.string,
  lastSale: types.maybe(types.string),
  name: types.string,
  description: types.string,
  backgroundColor: types.maybe(types.string),
  openseaLink: types.string,
  tokenAddress: types.string,
  tokenId: types.string,
})

export interface NFT extends Instance<typeof NFTModel> {}
