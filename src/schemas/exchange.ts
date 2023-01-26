import * as z from "zod"
import { CompleteUser, RelatedUserModel } from "./index"

export const ExchangeModel = z.object({
  id: z.number().int(),
  address: z.string(),
  name: z.string(),
  userAddress: z.string(),
})

export interface CompleteExchange extends z.infer<typeof ExchangeModel> {
  user: CompleteUser
}

/**
 * RelatedExchangeModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedExchangeModel: z.ZodSchema<CompleteExchange> = z.lazy(() => ExchangeModel.extend({
  user: RelatedUserModel,
}))
