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

  damage: z
    .number()
    .min(0, 'Damage must be at least 0')
    .max(100, 'Damage must be at most 100'),

  range: z
    .number()
    .min(0, 'Range must be at least 0')
    .max(100, 'Range must be at most 100'),

  recoil: z
    .number()
    .min(0, 'Recoil must be at least 0')
    .max(100, 'Recoil must be at most 100'),

  fireRate: z
    .number()
    .min(0, 'Fire rate must be at least 0')
    .max(100, 'Fire rate must be at most 100'),

  magazineSize: z
    .number()
    .min(1, 'Magazine size must be at least 1'),

  ammoType: z.string().min(1, 'Ammo type is required'),
})

export type Gun = z.infer<typeof GunSchema>
export type GunInput = Omit<Gun, 'id'>