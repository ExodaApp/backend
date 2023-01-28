import * as z from "zod"
import { Currency } from "@prisma/client"
import { CompleteUser, RelatedUserModel } from "./index"

export const ExpenseModel = z.object({
  id: z.number().int(),
  name: z.string(),
  dueDay: z.number().int(),
  value: z.number().int(),
  userAddress: z.string(),
  currency: z.nativeEnum(Currency),
})

export interface CompleteExpense extends z.infer<typeof ExpenseModel> {
  user: CompleteUser
}

/**
 * RelatedExpenseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedExpenseModel: z.ZodSchema<CompleteExpense> = z.lazy(() => ExpenseModel.extend({
  user: RelatedUserModel,
}))
