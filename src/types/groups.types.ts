import { z } from 'zod'

export const createGroupSchema = z
  .object({
    name: z
      .string()
      .min(3, 'Grup adı en az 3 karakter olmalıdır')
      .max(50, 'Grup adı en fazla 50 karakter olabilir'),
    description: z.string().max(500, 'Açıklama en fazla 500 karakter olabilir').optional(),
    isPublic: z.boolean().default(false),
    joinCode: z.union([
      z
        .string()
        .min(4, 'Katılım kodu en az 4 karakter olmalıdır')
        .max(20, 'Katılım kodu en fazla 20 karakter olabilir'),
      z.literal(''),
      z.undefined(),
    ]),
  })
  .refine((data) => data.isPublic || (!!data.joinCode && data.joinCode.length >= 4), {
    message: 'Özel grup için katılım kodu zorunludur ve en az 4 karakter olmalıdır',
    path: ['joinCode'],
  })

export type CreateGroupInput = z.infer<typeof createGroupSchema>
