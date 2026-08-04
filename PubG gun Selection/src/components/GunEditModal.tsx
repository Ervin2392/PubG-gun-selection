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
  Slider,
  NumberInput,
  SimpleGrid,
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
        damage: gun.damage,
        range: gun.range,
        recoil: gun.recoil,
        fireRate: gun.fireRate,
        magazineSize: gun.magazineSize,
        ammoType: gun.ammoType,
      }
    }

    return {
      name: '',
      role: '',
      description: '',
      bullets: [],
      image: '',
      damage: 0,
      range: 0,
      recoil: 0,
      fireRate: 0,
      magazineSize: 1,
      ammoType: '',
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
        const fieldName = error.path[0]

        if (typeof fieldName === 'string') {
          newErrors[fieldName] = error.message
        }
      })

      setErrors(newErrors)
      return
    }

    setErrors({})
    onSubmit(result.data)
  }

  const addBullet = () => {
    const trimmedBullet = newBullet.trim()

    if (!trimmedBullet) return

    const bulletAlreadyExists = formData.bullets.some(
      (bullet) => bullet.toLowerCase() === trimmedBullet.toLowerCase(),
    )

    if (bulletAlreadyExists) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        bullets: 'This feature already exists',
      }))
      return
    }

    setFormData({
      ...formData,
      bullets: [...formData.bullets, trimmedBullet],
    })

    setErrors((previousErrors) => ({
      ...previousErrors,
      bullets: '',
    }))

    setNewBullet('')
  }

  const removeBullet = (index: number) => {
    setFormData({
      ...formData,
      bullets: formData.bullets.filter(
        (_, bulletIndex) => bulletIndex !== index,
      ),
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
          placeholder="Weapon name"
          value={formData.name}
          onChange={(event) =>
            setFormData({
              ...formData,
              name: event.currentTarget.value,
            })
          }
          error={errors.name}
        />

        <TextInput
          label="Role"
          placeholder="e.g. Assault Rifle"
          value={formData.role}
          onChange={(event) =>
            setFormData({
              ...formData,
              role: event.currentTarget.value,
            })
          }
          error={errors.role}
        />

        <Textarea
          label="Description"
          placeholder="Enter a detailed description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.currentTarget.value,
            })
          }
          error={errors.description}
          minRows={3}
        />

        <TextInput
          label="Image URL"
          placeholder="https://..."
          value={formData.image}
          onChange={(event) =>
            setFormData({
              ...formData,
              image: event.currentTarget.value,
            })
          }
          error={errors.image}
        />

        <SimpleGrid cols={{ base: 1, sm: 2 }}>
          <TextInput
            label="Ammo Type"
            placeholder="e.g. 7.62 mm"
            value={formData.ammoType}
            onChange={(event) =>
              setFormData({
                ...formData,
                ammoType: event.currentTarget.value,
              })
            }
            error={errors.ammoType}
          />

          <NumberInput
            label="Magazine Size"
            placeholder="e.g. 30"
            value={formData.magazineSize}
            min={1}
            max={100}
            allowDecimal={false}
            onChange={(value) =>
              setFormData({
                ...formData,
                magazineSize:
                  typeof value === 'number' ? value : Number(value) || 1,
              })
            }
            error={errors.magazineSize}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
          <Box>
            <Text fw={500} size="sm" mb="xs">
              Damage ({formData.damage})
            </Text>

            <Slider
              value={formData.damage}
              min={0}
              max={100}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  damage: value,
                })
              }
            />

            {errors.damage && (
              <Text c="red" size="xs" mt="xs">
                {errors.damage}
              </Text>
            )}
          </Box>

          <Box>
            <Text fw={500} size="sm" mb="xs">
              Range ({formData.range})
            </Text>

            <Slider
              value={formData.range}
              min={0}
              max={100}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  range: value,
                })
              }
            />

            {errors.range && (
              <Text c="red" size="xs" mt="xs">
                {errors.range}
              </Text>
            )}
          </Box>

          <Box>
            <Text fw={500} size="sm" mb="xs">
              Fire Rate ({formData.fireRate})
            </Text>

            <Slider
              value={formData.fireRate}
              min={0}
              max={100}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  fireRate: value,
                })
              }
            />

            {errors.fireRate && (
              <Text c="red" size="xs" mt="xs">
                {errors.fireRate}
              </Text>
            )}
          </Box>

          <Box>
            <Text fw={500} size="sm" mb="xs">
              Recoil ({formData.recoil})
            </Text>

            <Slider
              value={formData.recoil}
              min={0}
              max={100}
              onChange={(value) =>
                setFormData({
                  ...formData,
                  recoil: value,
                })
              }
            />

            {errors.recoil && (
              <Text c="red" size="xs" mt="xs">
                {errors.recoil}
              </Text>
            )}
          </Box>
        </SimpleGrid>

        <Box>
          <Text fw={500} mb="xs">
            Features
          </Text>

          <Group gap="xs" mb="md" wrap="wrap">
            {formData.bullets.map((bullet, index) => (
              <Badge
                key={`${bullet}-${index}`}
                rightSection={
                  <CloseButton
                    size="xs"
                    aria-label={`Remove ${bullet}`}
                    onClick={() => removeBullet(index)}
                  />
                }
              >
                {bullet}
              </Badge>
            ))}
          </Group>

          <Group gap="xs" align="flex-start">
            <TextInput
              placeholder="Add a feature"
              value={newBullet}
              onChange={(event) => setNewBullet(event.currentTarget.value)}
              style={{ flex: 1 }}
              error={errors.bullets}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  addBullet()
                }
              }}
            />

            <Button onClick={addBullet} variant="light">
              Add
            </Button>
          </Group>
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