import { z } from 'zod'

export const GunSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  description: z.string().min(1, 'Description is required'),
  bullets: z
    .array(z.string())
    .min(1, 'Please add at least one feature'),
  image: z.string().url('Please enter a valid URL'),
})

export type Gun = z.infer<typeof GunSchema>
export type GunInput = Omit<Gun, 'id'>
