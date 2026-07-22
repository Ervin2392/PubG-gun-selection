import { z } from 'zod'

export const GunSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name ist erforderlich'),
  role: z.string().min(1, 'Rolle ist erforderlich'),
  description: z.string().min(1, 'Beschreibung ist erforderlich'),
  bullets: z.array(z.string()).min(1, 'Mindestens einen Punkt hinzufügen'),
  image: z.string().url('Ungültige URL'),
})

export type Gun = z.infer<typeof GunSchema>
export type GunInput = Omit<Gun, 'id'>
