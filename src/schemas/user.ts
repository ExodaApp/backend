import * as z from "zod"
import { CompleteExpense, RelatedExpenseModel, CompleteExchange, RelatedExchangeModel } from "./index"

export const UserModel = z.object({
  address: z.string(),
  nonce: z.number().int(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  expenses: CompleteExpense[]
  exchanges: CompleteExchange[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  expenses: RelatedExpenseModel.array(),
  exchanges: RelatedExchangeModel.array(),
}))
