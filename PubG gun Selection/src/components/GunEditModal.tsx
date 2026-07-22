import { useState } from 'react'
import {
  Modal,
  Button,
  Group,
  Stack,
  TextInput,
  Textarea,
  Text,
  Badge,
  Box,
  CloseButton,
} from '@mantine/core'
import type { Gun, GunInput } from '../utils/gunSchema'
import { GunSchema } from '../utils/gunSchema'

interface GunEditModalProps {
  opened: boolean
  gun: Gun | null
  isLoading: boolean
  onClose: () => void
  onSubmit: (gunData: GunInput) => void
}

export function GunEditModal({ opened, gun, isLoading, onClose, onSubmit }: GunEditModalProps) {
  const [formData, setFormData] = useState<GunInput | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newBullet, setNewBullet] = useState('')

  // Initialisiere Form-Daten wenn Modal geöffnet wird
  if (opened && gun && !formData) {
    setFormData({
      name: gun.name,
      role: gun.role,
      description: gun.description,
      bullets: [...gun.bullets],
      image: gun.image,
    })
  }

  const handleClose = () => {
    setFormData(null)
    setErrors({})
    setNewBullet('')
    onClose()
  }

  const handleSubmit = () => {
    if (!formData) return

    // Validiere mit Zod
    const result = GunSchema.omit({ id: true }).safeParse(formData)

    if (!result.success) {
      const newErrors: Record<string, string> = {}
      result.error.issues.forEach((error) => {
        newErrors[error.path[0] as string] = error.message
      })
      setErrors(newErrors)
      return
    }

    onSubmit(formData)
    handleClose()
  }

  const addBullet = () => {
    if (newBullet.trim() && formData) {
      setFormData({
        ...formData,
        bullets: [...formData.bullets, newBullet.trim()],
      })
      setNewBullet('')
    }
  }

  const removeBullet = (index: number) => {
    if (formData) {
      setFormData({
        ...formData,
        bullets: formData.bullets.filter((_, i) => i !== index),
      })
    }
  }

  if (!formData) return null

  return (
    <Modal opened={opened} onClose={handleClose} title="Gun bearbeiten" size="lg">
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Gun Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.currentTarget.value })}
          error={errors.name}
        />

        <TextInput
          label="Rolle"
          placeholder="z.B. AR Rifle"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.currentTarget.value })}
          error={errors.role}
        />

        <Textarea
          label="Beschreibung"
          placeholder="Detaillierte Beschreibung"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.currentTarget.value })}
          error={errors.description}
          minRows={3}
        />

        <TextInput
          label="Bild URL"
          placeholder="https://..."
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.currentTarget.value })}
          error={errors.image}
        />

        <Box>
          <Text fw={500} mb="xs">
            Eigenschaften
          </Text>
          <Group gap="xs" mb="md" wrap="wrap">
            {formData.bullets.map((bullet, index) => (
              <Badge key={index} rightSection={<CloseButton size="xs" onClick={() => removeBullet(index)} />}>
                {bullet}
              </Badge>
            ))}
          </Group>
          <Group gap="xs">
            <TextInput
              placeholder="Neue Eigenschaft"
              value={newBullet}
              onChange={(e) => setNewBullet(e.currentTarget.value)}
              style={{ flex: 1 }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addBullet()
                }
              }}
            />
            <Button onClick={addBullet} variant="light">
              Hinzufügen
            </Button>
          </Group>
          {errors.bullets && <Text c="red" size="sm">{errors.bullets}</Text>}
        </Box>

        <Group justify="flex-end" gap="xs">
          <Button variant="default" onClick={handleClose} disabled={isLoading}>
            Abbrechen
          </Button>
          <Button onClick={handleSubmit} loading={isLoading}>
            Speichern
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}
