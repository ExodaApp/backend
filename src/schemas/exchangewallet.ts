import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const ExchangeWalletModel = z.object({
  id: z.number().int(),
  address: z.string(),
  name: z.string(),
  userAddress: z.string(),
})

export interface CompleteExchangeWallet extends z.infer<typeof ExchangeWalletModel> {
  user: CompleteUser
}

/**
 * RelatedExchangeWalletModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedExchangeWalletModel: z.ZodSchema<CompleteExchangeWallet> = z.lazy(() => ExchangeWalletModel.extend({
  user: RelatedUserModel,
}))
