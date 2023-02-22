import { z } from 'zod';
import { type Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const ExchangeWalletScalarFieldEnumSchema = z.enum(['id','address','name','userAddress']);

export const ExpenseScalarFieldEnumSchema = z.enum(['id','name','dueDay','value','userAddress','currency']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const UserScalarFieldEnumSchema = z.enum(['address','nonce']);

export const CurrencySchema = z.enum(['USD','BRL','EUR']);

export type CurrencyType = `${z.infer<typeof CurrencySchema>}`


/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

// USER
//------------------------------------------------------


export const UserSchema = z.object({
  address: z.string(),
  nonce: z.number().int(),
})

export type User = z.infer<typeof UserSchema>

// EXPENSE
//------------------------------------------------------


export const ExpenseSchema = z.object({
  currency: CurrencySchema,
  id: z.number().int(),
  name: z.string(),
  dueDay: z.number().int(),
  value: z.number().int(),
  userAddress: z.string(),
})

export type Expense = z.infer<typeof ExpenseSchema>

// EXCHANGE WALLET
//------------------------------------------------------


export const ExchangeWalletSchema = z.object({
  id: z.number().int(),
  address: z.string(),
  name: z.string(),
  userAddress: z.string(),
})

export type ExchangeWallet = z.infer<typeof ExchangeWalletSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////


// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  exchanges: z.union([z.boolean(),z.lazy(() => ExchangeWalletFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  expenses: z.boolean().optional(),
  exchanges: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  address: z.boolean().optional(),
  expenses: z.union([z.boolean(),z.lazy(() => ExpenseFindManyArgsSchema)]).optional(),
  exchanges: z.union([z.boolean(),z.lazy(() => ExchangeWalletFindManyArgsSchema)]).optional(),
  nonce: z.boolean().optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

// EXPENSE
//------------------------------------------------------

export const ExpenseIncludeSchema: z.ZodType<Prisma.ExpenseInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ExpenseArgsSchema: z.ZodType<Prisma.ExpenseArgs> = z.object({
  select: z.lazy(() => ExpenseSelectSchema).optional(),
  include: z.lazy(() => ExpenseIncludeSchema).optional(),
}).strict();

export const ExpenseSelectSchema: z.ZodType<Prisma.ExpenseSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  dueDay: z.boolean().optional(),
  value: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  currency: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// EXCHANGE WALLET
//------------------------------------------------------

export const ExchangeWalletIncludeSchema: z.ZodType<Prisma.ExchangeWalletInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const ExchangeWalletArgsSchema: z.ZodType<Prisma.ExchangeWalletArgs> = z.object({
  select: z.lazy(() => ExchangeWalletSelectSchema).optional(),
  include: z.lazy(() => ExchangeWalletIncludeSchema).optional(),
}).strict();

export const ExchangeWalletSelectSchema: z.ZodType<Prisma.ExchangeWalletSelect> = z.object({
  id: z.boolean().optional(),
  address: z.boolean().optional(),
  name: z.boolean().optional(),
  userAddress: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  expenses: z.lazy(() => ExpenseListRelationFilterSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletListRelationFilterSchema).optional(),
  nonce: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  expenses: z.lazy(() => ExpenseOrderByRelationAggregateInputSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletOrderByRelationAggregateInputSchema).optional(),
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  address: z.string().optional(),
}).strict();

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  nonce: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional(),
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  nonce: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
}).strict();

export const ExpenseWhereInputSchema: z.ZodType<Prisma.ExpenseWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseWhereInputSchema),z.lazy(() => ExpenseWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ExpenseOrderByWithRelationInputSchema: z.ZodType<Prisma.ExpenseOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const ExpenseWhereUniqueInputSchema: z.ZodType<Prisma.ExpenseWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict();

export const ExpenseOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExpenseOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExpenseCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExpenseAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExpenseMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExpenseMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExpenseSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ExpenseScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExpenseScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema),z.lazy(() => ExpenseScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  dueDay: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  value: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyWithAggregatesFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
}).strict();

export const ExchangeWalletWhereInputSchema: z.ZodType<Prisma.ExchangeWalletWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExchangeWalletWhereInputSchema),z.lazy(() => ExchangeWalletWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeWalletWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeWalletWhereInputSchema),z.lazy(() => ExchangeWalletWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletOrderByWithRelationInputSchema: z.ZodType<Prisma.ExchangeWalletOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
}).strict();

export const ExchangeWalletWhereUniqueInputSchema: z.ZodType<Prisma.ExchangeWalletWhereUniqueInput> = z.object({
  id: z.number().int().optional(),
}).strict();

export const ExchangeWalletOrderByWithAggregationInputSchema: z.ZodType<Prisma.ExchangeWalletOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ExchangeWalletCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ExchangeWalletAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ExchangeWalletMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ExchangeWalletMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ExchangeWalletSumOrderByAggregateInputSchema).optional(),
}).strict();

export const ExchangeWalletScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ExchangeWalletScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ExchangeWalletScalarWhereWithAggregatesInputSchema),z.lazy(() => ExchangeWalletScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeWalletScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeWalletScalarWhereWithAggregatesInputSchema),z.lazy(() => ExchangeWalletScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  address: z.string(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().int().optional(),
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  address: z.string(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().int().optional(),
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  exchanges: z.lazy(() => ExchangeWalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  address: z.string(),
  nonce: z.number().int().optional(),
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nonce: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  nonce: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateInputSchema: z.ZodType<Prisma.ExpenseCreateInput> = z.object({
  name: z.string(),
  dueDay: z.number().int(),
  value: z.number().int(),
  currency: z.lazy(() => CurrencySchema).optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutExpensesInputSchema),
}).strict();

export const ExpenseUncheckedCreateInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  dueDay: z.number().int(),
  value: z.number().int(),
  userAddress: z.string(),
  currency: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const ExpenseUpdateInputSchema: z.ZodType<Prisma.ExpenseUpdateInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExpensesNestedInputSchema).optional(),
}).strict();

export const ExpenseUncheckedUpdateInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateManyInputSchema: z.ZodType<Prisma.ExpenseCreateManyInput> = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  dueDay: z.number().int(),
  value: z.number().int(),
  userAddress: z.string(),
  currency: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const ExpenseUpdateManyMutationInputSchema: z.ZodType<Prisma.ExpenseUpdateManyMutationInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletCreateInputSchema: z.ZodType<Prisma.ExchangeWalletCreateInput> = z.object({
  address: z.string(),
  name: z.string(),
  user: z.lazy(() => UserCreateNestedOneWithoutExchangesInputSchema),
}).strict();

export const ExchangeWalletUncheckedCreateInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  name: z.string(),
  userAddress: z.string(),
}).strict();

export const ExchangeWalletUpdateInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutExchangesNestedInputSchema).optional(),
}).strict();

export const ExchangeWalletUncheckedUpdateInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletCreateManyInputSchema: z.ZodType<Prisma.ExchangeWalletCreateManyInput> = z.object({
  id: z.number().int().optional(),
  address: z.string(),
  name: z.string(),
  userAddress: z.string(),
}).strict();

export const ExchangeWalletUpdateManyMutationInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateManyMutationInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userAddress: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const ExpenseListRelationFilterSchema: z.ZodType<Prisma.ExpenseListRelationFilter> = z.object({
  every: z.lazy(() => ExpenseWhereInputSchema).optional(),
  some: z.lazy(() => ExpenseWhereInputSchema).optional(),
  none: z.lazy(() => ExpenseWhereInputSchema).optional(),
}).strict();

export const ExchangeWalletListRelationFilterSchema: z.ZodType<Prisma.ExchangeWalletListRelationFilter> = z.object({
  every: z.lazy(() => ExchangeWalletWhereInputSchema).optional(),
  some: z.lazy(() => ExchangeWalletWhereInputSchema).optional(),
  none: z.lazy(() => ExchangeWalletWhereInputSchema).optional(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const ExpenseOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExpenseOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExchangeWalletOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  address: z.lazy(() => SortOrderSchema).optional(),
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  nonce: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const EnumCurrencyFilterSchema: z.ZodType<Prisma.EnumCurrencyFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyFilterSchema) ]).optional(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional(),
}).strict();

export const ExpenseCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExpenseAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExpenseMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExpenseMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
  currency: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExpenseSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExpenseSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  dueDay: z.lazy(() => SortOrderSchema).optional(),
  value: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const EnumCurrencyWithAggregatesFilterSchema: z.ZodType<Prisma.EnumCurrencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
}).strict();

export const ExchangeWalletCountOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExchangeWalletAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExchangeWalletMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExchangeWalletMinOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  address: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  userAddress: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExchangeWalletSumOrderByAggregateInputSchema: z.ZodType<Prisma.ExchangeWalletSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
}).strict();

export const ExpenseCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExchangeWalletCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema).array(),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeWalletCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExpenseUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ExchangeWalletUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema).array(),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeWalletCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional(),
}).strict();

export const ExpenseUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExchangeWalletUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema).array(),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeWalletUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeWalletCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeWalletUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeWalletUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeWalletScalarWhereInputSchema),z.lazy(() => ExchangeWalletScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseCreateWithoutUserInputSchema).array(),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExpenseCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExpenseCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExpenseWhereUniqueInputSchema),z.lazy(() => ExpenseWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExpenseUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExpenseUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ExchangeWalletUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema).array(),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema),z.lazy(() => ExchangeWalletCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ExchangeWalletUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ExchangeWalletCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ExchangeWalletWhereUniqueInputSchema),z.lazy(() => ExchangeWalletWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ExchangeWalletUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ExchangeWalletUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => ExchangeWalletUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ExchangeWalletScalarWhereInputSchema),z.lazy(() => ExchangeWalletScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExpensesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const EnumCurrencyFieldUpdateOperationsInputSchema: z.ZodType<Prisma.EnumCurrencyFieldUpdateOperationsInput> = z.object({
  set: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutExpensesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExpensesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExpensesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExpensesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExpensesInputSchema) ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutExchangesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutExchangesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExchangesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExchangesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutExchangesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutExchangesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExchangesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutExchangesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutExchangesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExchangesInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCurrencyFilterSchema: z.ZodType<Prisma.NestedEnumCurrencyFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyFilterSchema) ]).optional(),
}).strict();

export const NestedEnumCurrencyWithAggregatesFilterSchema: z.ZodType<Prisma.NestedEnumCurrencyWithAggregatesFilter> = z.object({
  equals: z.lazy(() => CurrencySchema).optional(),
  in: z.lazy(() => CurrencySchema).array().optional(),
  notIn: z.lazy(() => CurrencySchema).array().optional(),
  not: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => NestedEnumCurrencyWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
  _max: z.lazy(() => NestedEnumCurrencyFilterSchema).optional(),
}).strict();

export const ExpenseCreateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateWithoutUserInput> = z.object({
  name: z.string(),
  dueDay: z.number(),
  value: z.number(),
  currency: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const ExpenseUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  dueDay: z.number(),
  value: z.number(),
  currency: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const ExpenseCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ExpenseCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ExpenseCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ExpenseCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ExchangeWalletCreateWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletCreateWithoutUserInput> = z.object({
  address: z.string(),
  name: z.string(),
}).strict();

export const ExchangeWalletUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().optional(),
  address: z.string(),
  name: z.string(),
}).strict();

export const ExchangeWalletCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => ExchangeWalletWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExchangeWalletCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.ExchangeWalletCreateManyUserInputEnvelope> = z.object({
  data: z.lazy(() => ExchangeWalletCreateManyUserInputSchema).array(),
  skipDuplicates: z.boolean().optional(),
}).strict();

export const ExpenseUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExpenseUpdateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ExpenseCreateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateWithoutUserInputSchema),z.lazy(() => ExpenseUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ExpenseUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExpenseScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExpenseUpdateManyMutationInputSchema),z.lazy(() => ExpenseUncheckedUpdateManyWithoutExpensesInputSchema) ]),
}).strict();

export const ExpenseScalarWhereInputSchema: z.ZodType<Prisma.ExpenseScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExpenseScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExpenseScalarWhereInputSchema),z.lazy(() => ExpenseScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  dueDay: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  value: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  currency: z.union([ z.lazy(() => EnumCurrencyFilterSchema),z.lazy(() => CurrencySchema) ]).optional(),
}).strict();

export const ExchangeWalletUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExchangeWalletWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ExchangeWalletUpdateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => ExchangeWalletCreateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const ExchangeWalletUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => ExchangeWalletWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ExchangeWalletUpdateWithoutUserInputSchema),z.lazy(() => ExchangeWalletUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const ExchangeWalletUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => ExchangeWalletScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ExchangeWalletUpdateManyMutationInputSchema),z.lazy(() => ExchangeWalletUncheckedUpdateManyWithoutExchangesInputSchema) ]),
}).strict();

export const ExchangeWalletScalarWhereInputSchema: z.ZodType<Prisma.ExchangeWalletScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ExchangeWalletScalarWhereInputSchema),z.lazy(() => ExchangeWalletScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ExchangeWalletScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ExchangeWalletScalarWhereInputSchema),z.lazy(() => ExchangeWalletScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  address: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userAddress: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
}).strict();

export const UserCreateWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateWithoutExpensesInput> = z.object({
  address: z.string(),
  exchanges: z.lazy(() => ExchangeWalletCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().optional(),
}).strict();

export const UserUncheckedCreateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExpensesInput> = z.object({
  address: z.string(),
  exchanges: z.lazy(() => ExchangeWalletUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().optional(),
}).strict();

export const UserCreateOrConnectWithoutExpensesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExpensesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]),
}).strict();

export const UserUpsertWithoutExpensesInputSchema: z.ZodType<Prisma.UserUpsertWithoutExpensesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExpensesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExpensesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExpensesInputSchema) ]),
}).strict();

export const UserUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUpdateWithoutExpensesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exchanges: z.lazy(() => ExchangeWalletUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutExpensesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExpensesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  exchanges: z.lazy(() => ExchangeWalletUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserCreateWithoutExchangesInputSchema: z.ZodType<Prisma.UserCreateWithoutExchangesInput> = z.object({
  address: z.string(),
  expenses: z.lazy(() => ExpenseCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().optional(),
}).strict();

export const UserUncheckedCreateWithoutExchangesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutExchangesInput> = z.object({
  address: z.string(),
  expenses: z.lazy(() => ExpenseUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  nonce: z.number().optional(),
}).strict();

export const UserCreateOrConnectWithoutExchangesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutExchangesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExchangesInputSchema) ]),
}).strict();

export const UserUpsertWithoutExchangesInputSchema: z.ZodType<Prisma.UserUpsertWithoutExchangesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutExchangesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutExchangesInputSchema),z.lazy(() => UserUncheckedCreateWithoutExchangesInputSchema) ]),
}).strict();

export const UserUpdateWithoutExchangesInputSchema: z.ZodType<Prisma.UserUpdateWithoutExchangesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenses: z.lazy(() => ExpenseUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const UserUncheckedUpdateWithoutExchangesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutExchangesInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  expenses: z.lazy(() => ExpenseUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  nonce: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseCreateManyUserInputSchema: z.ZodType<Prisma.ExpenseCreateManyUserInput> = z.object({
  id: z.number().optional(),
  name: z.string(),
  dueDay: z.number(),
  value: z.number(),
  currency: z.lazy(() => CurrencySchema).optional(),
}).strict();

export const ExchangeWalletCreateManyUserInputSchema: z.ZodType<Prisma.ExchangeWalletCreateManyUserInput> = z.object({
  id: z.number().optional(),
  address: z.string(),
  name: z.string(),
}).strict();

export const ExpenseUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUpdateWithoutUserInput> = z.object({
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExpenseUncheckedUpdateManyWithoutExpensesInputSchema: z.ZodType<Prisma.ExpenseUncheckedUpdateManyWithoutExpensesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  dueDay: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  value: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  currency: z.union([ z.lazy(() => CurrencySchema),z.lazy(() => EnumCurrencyFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUpdateWithoutUserInput> = z.object({
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ExchangeWalletUncheckedUpdateManyWithoutExchangesInputSchema: z.ZodType<Prisma.ExchangeWalletUncheckedUpdateManyWithoutExchangesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  address: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: UserScalarFieldEnumSchema.array().optional(),
}).strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const ExpenseFindFirstArgsSchema: z.ZodType<Prisma.ExpenseFindFirstArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExpenseScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExpenseFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExpenseFindFirstOrThrowArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExpenseScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExpenseFindManyArgsSchema: z.ZodType<Prisma.ExpenseFindManyArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExpenseScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExpenseAggregateArgsSchema: z.ZodType<Prisma.ExpenseAggregateArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithRelationInputSchema.array(),ExpenseOrderByWithRelationInputSchema ]).optional(),
  cursor: ExpenseWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExpenseGroupByArgsSchema: z.ZodType<Prisma.ExpenseGroupByArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereInputSchema.optional(),
  orderBy: z.union([ ExpenseOrderByWithAggregationInputSchema.array(),ExpenseOrderByWithAggregationInputSchema ]).optional(),
  by: ExpenseScalarFieldEnumSchema.array(),
  having: ExpenseScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExpenseFindUniqueArgsSchema: z.ZodType<Prisma.ExpenseFindUniqueArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict()

export const ExpenseFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExpenseFindUniqueOrThrowArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict()

export const ExchangeWalletFindFirstArgsSchema: z.ZodType<Prisma.ExchangeWalletFindFirstArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereInputSchema.optional(),
  orderBy: z.union([ ExchangeWalletOrderByWithRelationInputSchema.array(),ExchangeWalletOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeWalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExchangeWalletScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExchangeWalletFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ExchangeWalletFindFirstOrThrowArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereInputSchema.optional(),
  orderBy: z.union([ ExchangeWalletOrderByWithRelationInputSchema.array(),ExchangeWalletOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeWalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExchangeWalletScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExchangeWalletFindManyArgsSchema: z.ZodType<Prisma.ExchangeWalletFindManyArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereInputSchema.optional(),
  orderBy: z.union([ ExchangeWalletOrderByWithRelationInputSchema.array(),ExchangeWalletOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeWalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ExchangeWalletScalarFieldEnumSchema.array().optional(),
}).strict()

export const ExchangeWalletAggregateArgsSchema: z.ZodType<Prisma.ExchangeWalletAggregateArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereInputSchema.optional(),
  orderBy: z.union([ ExchangeWalletOrderByWithRelationInputSchema.array(),ExchangeWalletOrderByWithRelationInputSchema ]).optional(),
  cursor: ExchangeWalletWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExchangeWalletGroupByArgsSchema: z.ZodType<Prisma.ExchangeWalletGroupByArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereInputSchema.optional(),
  orderBy: z.union([ ExchangeWalletOrderByWithAggregationInputSchema.array(),ExchangeWalletOrderByWithAggregationInputSchema ]).optional(),
  by: ExchangeWalletScalarFieldEnumSchema.array(),
  having: ExchangeWalletScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ExchangeWalletFindUniqueArgsSchema: z.ZodType<Prisma.ExchangeWalletFindUniqueArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereUniqueInputSchema,
}).strict()

export const ExchangeWalletFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ExchangeWalletFindUniqueOrThrowArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereUniqueInputSchema,
}).strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: UserCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict()

export const ExpenseCreateArgsSchema: z.ZodType<Prisma.ExpenseCreateArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  data: z.union([ ExpenseCreateInputSchema,ExpenseUncheckedCreateInputSchema ]),
}).strict()

export const ExpenseUpsertArgsSchema: z.ZodType<Prisma.ExpenseUpsertArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
  create: z.union([ ExpenseCreateInputSchema,ExpenseUncheckedCreateInputSchema ]),
  update: z.union([ ExpenseUpdateInputSchema,ExpenseUncheckedUpdateInputSchema ]),
}).strict()

export const ExpenseCreateManyArgsSchema: z.ZodType<Prisma.ExpenseCreateManyArgs> = z.object({
  data: ExpenseCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ExpenseDeleteArgsSchema: z.ZodType<Prisma.ExpenseDeleteArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  where: ExpenseWhereUniqueInputSchema,
}).strict()

export const ExpenseUpdateArgsSchema: z.ZodType<Prisma.ExpenseUpdateArgs> = z.object({
  select: ExpenseSelectSchema.optional(),
  include: ExpenseIncludeSchema.optional(),
  data: z.union([ ExpenseUpdateInputSchema,ExpenseUncheckedUpdateInputSchema ]),
  where: ExpenseWhereUniqueInputSchema,
}).strict()

export const ExpenseUpdateManyArgsSchema: z.ZodType<Prisma.ExpenseUpdateManyArgs> = z.object({
  data: z.union([ ExpenseUpdateManyMutationInputSchema,ExpenseUncheckedUpdateManyInputSchema ]),
  where: ExpenseWhereInputSchema.optional(),
}).strict()

export const ExpenseDeleteManyArgsSchema: z.ZodType<Prisma.ExpenseDeleteManyArgs> = z.object({
  where: ExpenseWhereInputSchema.optional(),
}).strict()

export const ExchangeWalletCreateArgsSchema: z.ZodType<Prisma.ExchangeWalletCreateArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  data: z.union([ ExchangeWalletCreateInputSchema,ExchangeWalletUncheckedCreateInputSchema ]),
}).strict()

export const ExchangeWalletUpsertArgsSchema: z.ZodType<Prisma.ExchangeWalletUpsertArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereUniqueInputSchema,
  create: z.union([ ExchangeWalletCreateInputSchema,ExchangeWalletUncheckedCreateInputSchema ]),
  update: z.union([ ExchangeWalletUpdateInputSchema,ExchangeWalletUncheckedUpdateInputSchema ]),
}).strict()

export const ExchangeWalletCreateManyArgsSchema: z.ZodType<Prisma.ExchangeWalletCreateManyArgs> = z.object({
  data: ExchangeWalletCreateManyInputSchema.array(),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ExchangeWalletDeleteArgsSchema: z.ZodType<Prisma.ExchangeWalletDeleteArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  where: ExchangeWalletWhereUniqueInputSchema,
}).strict()

export const ExchangeWalletUpdateArgsSchema: z.ZodType<Prisma.ExchangeWalletUpdateArgs> = z.object({
  select: ExchangeWalletSelectSchema.optional(),
  include: ExchangeWalletIncludeSchema.optional(),
  data: z.union([ ExchangeWalletUpdateInputSchema,ExchangeWalletUncheckedUpdateInputSchema ]),
  where: ExchangeWalletWhereUniqueInputSchema,
}).strict()

export const ExchangeWalletUpdateManyArgsSchema: z.ZodType<Prisma.ExchangeWalletUpdateManyArgs> = z.object({
  data: z.union([ ExchangeWalletUpdateManyMutationInputSchema,ExchangeWalletUncheckedUpdateManyInputSchema ]),
  where: ExchangeWalletWhereInputSchema.optional(),
}).strict()

export const ExchangeWalletDeleteManyArgsSchema: z.ZodType<Prisma.ExchangeWalletDeleteManyArgs> = z.object({
  where: ExchangeWalletWhereInputSchema.optional(),
}).strict()