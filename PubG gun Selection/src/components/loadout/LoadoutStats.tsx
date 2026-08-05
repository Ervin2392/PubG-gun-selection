import { Card, Group, Progress, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { Gun } from '../../utils/gunSchema'

interface LoadoutStatsProps {
  primaryWeapon: Gun | null
  secondaryWeapon: Gun | null
}

function getCombinedStat(primary: number | null, secondary: number | null) {
  if (primary === null && secondary === null) {
    return null
  }

  const values = [primary, secondary].filter((value): value is number => value !== null)
  const total = values.reduce((sum, value) => sum + value, 0)

  return {
    combined: total,
    average: total / values.length,
  }
}

export function LoadoutStats({ primaryWeapon, secondaryWeapon }: LoadoutStatsProps) {
  const damage = getCombinedStat(primaryWeapon?.damage ?? null, secondaryWeapon?.damage ?? null)
  const range = getCombinedStat(primaryWeapon?.range ?? null, secondaryWeapon?.range ?? null)
  const fireRate = getCombinedStat(primaryWeapon?.fireRate ?? null, secondaryWeapon?.fireRate ?? null)
  const recoil = getCombinedStat(primaryWeapon?.recoil ?? null, secondaryWeapon?.recoil ?? null)

  const hasWeapons = Boolean(primaryWeapon || secondaryWeapon)

  return (
    <Card radius="xl" p="lg" withBorder style={{ height: '100%' }}>
      <Stack gap="md" style={{ height: '100%' }}>
        <Group justify="space-between" align="flex-start">
          <Stack gap="xs">
            <Title order={3}>4. Loadout Statistics</Title>
            <Text size="sm" c="dimmed">
              Review the average performance of this weapon combination.
            </Text>
          </Stack>
        </Group>

        {!hasWeapons ? (
          <Text size="sm" c="dimmed">
            Select weapons to see combined and average stats.
          </Text>
        ) : (
          <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="sm">
            {[
              { label: 'Damage', stat: damage },
              { label: 'Range', stat: range },
              { label: 'Fire Rate', stat: fireRate },
              { label: 'Recoil Control', stat: recoil },
            ].map(({ label, stat }) => (
              <Card key={label} radius="md" p="sm" withBorder style={{ minHeight: 100 }}>
                <Stack justify="space-between" style={{ height: '100%' }}>
                  <Stack gap="xs">
                    <Text c="dimmed" size="xs">
                      {label}
                    </Text>
                    <Title order={3}>{stat?.average ? stat.average.toFixed(0) : '0'}</Title>
                    <Text size="xs" c="dimmed">
                      Average value
                    </Text>
                  </Stack>
                  <Progress
                    value={stat?.average ? Math.min(Math.max(stat.average, 0), 100) : 0}
                    radius="xl"
                    size="sm"
                  />
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        )}

        <Card radius="md" p="sm" withBorder>
          <Text fw={700} size="sm">
            Summary
          </Text>
          <Text c="dimmed" size="xs">
            This loadout is optimized for long-range engagements. Perfect for tactical and disciplined playstyles.
          </Text>
        </Card>
      </Stack>
    </Card>
  )
}
