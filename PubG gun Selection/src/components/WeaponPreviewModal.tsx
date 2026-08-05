import {
  Badge,
  Divider,
  Group,
  Modal,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import {
  IconActivity,
  IconBolt,
  IconFlame,
  IconTargetArrow,
} from '@tabler/icons-react'
import type { Gun } from '../utils/gunSchema'

interface WeaponPreviewModalProps {
  gun: Gun | null
  onClose: () => void
}

const getStatColor = (value: number) => {
  if (value >= 75) {
    return 'green'
  }

  if (value >= 50) {
    return 'yellow'
  }

  return 'red'
}

export function WeaponPreviewModal({
  gun,
  onClose,
}: WeaponPreviewModalProps) {
  const isOpen = gun !== null

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={gun?.name ?? 'Weapon Details'}
      size="xl"
      centered
      withinPortal
      zIndex={1000}
    >
      {gun ? (
        <Stack gap="xl">
          <Paper
            withBorder
            radius="lg"
            p="xl"
            style={{
              background:
                'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(17, 24, 39, 0.85))',
            }}
          >
            <img
              src={gun.image}
              alt={gun.name}
              style={{
                display: 'block',
                width: '100%',
                height: 300,
                objectFit: 'contain',
              }}
            />
          </Paper>

          <div>
            <Title order={2}>{gun.name}</Title>

            <Badge mt="sm" size="lg" color="blue">
              {gun.role}
            </Badge>
          </div>

          <Divider />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl">
            <div>
              <Group gap="xs" mb={4}>
                <IconFlame size={18} />

                <Text fw={600}>Damage ({gun.damage})</Text>
              </Group>

              <Progress
                value={gun.damage}
                color={getStatColor(gun.damage)}
                size="lg"
                radius="xl"
              />
            </div>

            <div>
              <Group gap="xs" mb={4}>
                <IconTargetArrow size={18} />

                <Text fw={600}>Range ({gun.range})</Text>
              </Group>

              <Progress
                value={gun.range}
                color={getStatColor(gun.range)}
                size="lg"
                radius="xl"
              />
            </div>

            <div>
              <Group gap="xs" mb={4}>
                <IconBolt size={18} />

                <Text fw={600}>Fire Rate ({gun.fireRate})</Text>
              </Group>

              <Progress
                value={gun.fireRate}
                color={getStatColor(gun.fireRate)}
                size="lg"
                radius="xl"
              />
            </div>

            <div>
              <Group gap="xs" mb={4}>
                <IconActivity size={18} />

                <Text fw={600}>Recoil ({gun.recoil})</Text>
              </Group>

              <Progress
                value={gun.recoil}
                color={getStatColor(gun.recoil)}
                size="lg"
                radius="xl"
              />
            </div>
          </SimpleGrid>

          <Divider />

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <Paper withBorder p="md" radius="md">
              <Text size="sm" c="dimmed">
                Magazine Size
              </Text>

              <Title order={3}>{gun.magazineSize}</Title>
            </Paper>

            <Paper withBorder p="md" radius="md">
              <Text size="sm" c="dimmed">
                Ammo Type
              </Text>

              <Title order={3}>{gun.ammoType}</Title>
            </Paper>
          </SimpleGrid>

          <Divider />

          <div>
            <Text fw={600} mb="sm">
              Features
            </Text>

            <Group gap="sm" wrap="wrap">
              {gun.bullets.map((bullet) => (
                <Badge
                  key={bullet}
                  color="green"
                  size="lg"
                  variant="light"
                >
                  ✓ {bullet}
                </Badge>
              ))}
            </Group>
          </div>

          <Divider />

          <div>
            <Text fw={600} mb="sm">
              Description
            </Text>

            <Text c="dimmed">{gun.description}</Text>
          </div>
        </Stack>
      ) : null}
    </Modal>
  )
}