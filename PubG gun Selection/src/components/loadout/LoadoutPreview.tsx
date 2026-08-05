import {
  Badge,
  Box,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import type { Gun } from '../../utils/gunSchema'
import type { LoadoutSelection } from './LoadoutForm'

interface LoadoutPreviewProps {
  primaryWeapon: Gun | null
  secondaryWeapon: Gun | null
  selection: LoadoutSelection
}

function renderWeaponCard(title: string, weapon: Gun | null) {
  if (!weapon) {
    return (
      <Card radius="md" p="md" withBorder style={{ minHeight: 200 }}>
        <Text c="dimmed">{title} not selected yet.</Text>
      </Card>
    )
  }

  return (
    <Card radius="md" p="sm" withBorder style={{ minHeight: 180, height: '100%' }}>
      <Stack justify="space-between" style={{ height: '100%' }}>
        <Group justify="space-between" align="flex-start">
          <Title order={4}>{title}</Title>
          <Badge variant="outline" size="xs">
            {weapon.role}
          </Badge>
        </Group>

        <Box style={{ textAlign: 'center' }}>
          <img src={weapon.image} alt={weapon.name} style={{ width: '100%', maxHeight: 120, objectFit: 'contain' }} />
        </Box>

        <Stack gap="xs">
          <Text fw={700} size="sm">
            {weapon.name}
          </Text>
          <Text size="xs" c="dimmed">
            Ammo: {weapon.ammoType}
          </Text>
          <Text size="xs" c="dimmed">
            Magazine Size: {weapon.magazineSize}
          </Text>
        </Stack>
      </Stack>
    </Card>
  )
}

export function LoadoutPreview({ primaryWeapon, secondaryWeapon, selection }: LoadoutPreviewProps) {
  const hasSelection = Boolean(primaryWeapon || secondaryWeapon)

  return (
    <Paper p="lg" radius="xl" withBorder style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Title order={3}>3. Loadout Preview</Title>
            <Text size="sm" c="dimmed">
              Compare the weapon pair and attachment choices in a clean preview.
            </Text>
          </Stack>
          <Badge variant="outline">Preview</Badge>
        </Group>

        {!hasSelection ? (
          <Text size="sm" c="dimmed">
            Select a primary or secondary weapon to preview the loadout.
          </Text>
        ) : (
          <Stack gap="sm" style={{ flex: 1, minHeight: 0 }}>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm" style={{ flex: 1, minHeight: 0 }}>
              {renderWeaponCard('Primary Weapon', primaryWeapon)}
              {renderWeaponCard('Secondary Weapon', secondaryWeapon)}
            </SimpleGrid>

            <Card radius="md" p="sm" withBorder>
              <Stack gap="xs">
                <Title order={5}>Attachments</Title>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <Badge variant="light" size="xs">
                    Scope: {selection.scope ?? 'None'}
                  </Badge>
                  <Badge variant="light" size="xs">
                    Grip: {selection.grip ?? 'None'}
                  </Badge>
                  <Badge variant="light" size="xs">
                    Magazine: {selection.magazine ?? 'None'}
                  </Badge>
                  <Badge variant="light" size="xs">
                    Muzzle: {selection.muzzle ?? 'None'}
                  </Badge>
                </div>
              </Stack>
            </Card>
          </Stack>
        )}
      </Stack>
    </Paper>
  )
}
