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
  mode?: 'create' | 'edit'
  onClose: () => void
  onSubmit: (gunData: GunInput) => void
}

export function GunEditModal({
  opened,
  gun,
  isLoading,
  mode = 'edit',
  onClose,
  onSubmit,
}: GunEditModalProps) {
  const [formData, setFormData] = useState<GunInput>(() => {
  if (gun) {
    return {
      name: gun.name,
      role: gun.role,
      description: gun.description,
      bullets: [...gun.bullets],
      image: gun.image,
    }
  }

  return {
    name: '',
    role: '',
    description: '',
    bullets: [],
    image: '',
  }
})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [newBullet, setNewBullet] = useState('')

  const handleClose = () => {
    setErrors({})
    setNewBullet('')
    onClose()
  }

  const handleSubmit = () => {
   
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
    if (newBullet.trim()) {
      setFormData({
        ...formData,
        bullets: [...formData.bullets, newBullet.trim()],
      })
      setNewBullet('')
    }
  }

  const removeBullet = (index: number) => {
    setFormData({
      ...formData,
      bullets: formData.bullets.filter((_, i) => i !== index),
    })
  }

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={mode === 'create' ? 'Add New Weapon' : 'Edit Weapon'}
      size="lg"
    >
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Weapon Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.currentTarget.value })
          }
          error={errors.name}
        />

        <TextInput
          label="Role"
          placeholder="e.g. Assault Rifle"
          value={formData.role}
          onChange={(e) =>
            setFormData({ ...formData, role: e.currentTarget.value })
          }
          error={errors.role}
        />

        <Textarea
          label="Description"
          placeholder="Enter a detailed description"
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.currentTarget.value,
            })
          }
          error={errors.description}
          minRows={3}
        />

        <TextInput
          label="Image URL"
          placeholder="https://..."
          value={formData.image}
          onChange={(e) =>
            setFormData({
              ...formData,
              image: e.currentTarget.value,
            })
          }
          error={errors.image}
        />

        <Box>
          <Text fw={500} mb="xs">
            Features
          </Text>

          <Group gap="xs" mb="md" wrap="wrap">
            {formData.bullets.map((bullet, index) => (
              <Badge
                key={bullet}
                rightSection={
                  <CloseButton
                    size="xs"
                    onClick={() => removeBullet(index)}
                  />
                }
              >
                {bullet}
              </Badge>
            ))}
          </Group>

          <Group gap="xs">
            <TextInput
              placeholder="Add a feature"
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
              Add
            </Button>
          </Group>

          {errors.bullets && (
            <Text c="red" size="sm">
              {errors.bullets}
            </Text>
          )}
        </Box>

        <Group justify="flex-end" gap="xs">
          <Button
            variant="default"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>

          <Button onClick={handleSubmit} loading={isLoading}>
            {mode === 'create' ? 'Create Weapon' : 'Save Changes'}
          </Button>
        </Group>
      </Stack>
    </Modal>
  )
}