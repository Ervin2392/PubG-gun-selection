import type { ComboboxItem, ComboboxLikeRenderOptionInput } from '@mantine/core'
import {
  Avatar,
  Badge,
  Button,
  Card,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'

export interface LoadoutSelection {
  primaryWeaponId: number | null
  secondaryWeaponId: number | null
  scope: string | null
  grip: string | null
  magazine: string | null
  muzzle: string | null
}

export interface WeaponOption {
  value: string
  label: string
  image: string
  ammoType: string
}

export interface LoadoutFormProps {
  selection: LoadoutSelection
  primaryWeaponOptions: WeaponOption[]
  secondaryWeaponOptions: WeaponOption[]
  scopeOptions: Array<{ value: string; label: string }>
  gripOptions: Array<{ value: string; label: string }>
  magazineOptions: Array<{ value: string; label: string }>
  muzzleOptions: Array<{ value: string; label: string }>
  errorMessage?: string
  onSelectionChange: (selection: LoadoutSelection) => void
  onReset: () => void
}

const renderWeaponOption = (item: ComboboxLikeRenderOptionInput<ComboboxItem<string>>) => {
  const option = item.option as WeaponOption

  return (
    <Group wrap="nowrap" style={{ width: '100%', gap: '0.5rem' }}>
      <Avatar src={option.image} radius="md" size="xs" />
      <div style={{ flex: 1 }}>
        <Text fw={600} size="sm">
          {option.label}
        </Text>
        <Text size="xs" c="dimmed">
          {option.ammoType}
        </Text>
      </div>
      <Badge variant="outline" size="xs">
        {option.ammoType}
      </Badge>
    </Group>
  )
}

export function LoadoutForm({
  selection,
  primaryWeaponOptions,
  secondaryWeaponOptions,
  scopeOptions,
  gripOptions,
  magazineOptions,
  muzzleOptions,
  errorMessage,
  onSelectionChange,
  onReset,
}: LoadoutFormProps) {
  const isResetDisabled =
    selection.primaryWeaponId === null &&
    selection.secondaryWeaponId === null &&
    selection.scope === null &&
    selection.grip === null &&
    selection.magazine === null &&
    selection.muzzle === null

  return (
    <Stack gap="md">
      <Paper p="lg" radius="xl" withBorder>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Title order={3}>1. Select Weapons</Title>
              <Text size="sm" c="dimmed">
                Pick the best primary and secondary weapons for your playstyle.
              </Text>
            </Stack>
            <Badge variant="outline">Weapons</Badge>
          </Group>

          <Stack gap="sm">
            <Select
              size="sm"
              label="Primary Weapon"
              placeholder="Choose a primary weapon"
              data={primaryWeaponOptions}
              renderOption={renderWeaponOption}
              value={selection.primaryWeaponId?.toString() ?? null}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  primaryWeaponId: value ? Number(value) : null,
                })
              }
              nothingFoundMessage="No primary weapons available"
              clearable
            />

            <Select
              size="sm"
              label="Secondary Weapon"
              placeholder="Choose a secondary weapon"
              data={secondaryWeaponOptions}
              renderOption={renderWeaponOption}
              value={selection.secondaryWeaponId?.toString() ?? null}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  secondaryWeaponId: value ? Number(value) : null,
                })
              }
              nothingFoundMessage="No secondary weapons available"
              clearable
            />
          </Stack>

          {errorMessage ? (
            <Text c="red" size="sm">
              {errorMessage}
            </Text>
          ) : null}
        </Stack>
      </Paper>

      <Paper p="lg" radius="xl" withBorder>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start">
            <Stack gap="xs">
              <Title order={3}>2. Attachments</Title>
              <Text size="sm" c="dimmed">
                Configure your attachment set for stability, range, and handling.
              </Text>
            </Stack>
            <Badge variant="outline">Loadout</Badge>
          </Group>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
            <Select
              size="sm"
              label="Scope"
              placeholder="Choose a scope"
              data={scopeOptions}
              value={selection.scope ?? undefined}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  scope: value ?? null,
                })
              }
              clearable
            />
            <Select
              size="sm"
              label="Grip"
              placeholder="Choose a grip"
              data={gripOptions}
              value={selection.grip ?? undefined}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  grip: value ?? null,
                })
              }
              clearable
            />
            <Select
              size="sm"
              label="Magazine"
              placeholder="Choose a magazine"
              data={magazineOptions}
              value={selection.magazine ?? undefined}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  magazine: value ?? null,
                })
              }
              clearable
            />
            <Select
              size="sm"
              label="Muzzle"
              placeholder="Choose a muzzle"
              data={muzzleOptions}
              value={selection.muzzle ?? undefined}
              onChange={(value) =>
                onSelectionChange({
                  ...selection,
                  muzzle: value ?? null,
                })
              }
              clearable
            />
          </SimpleGrid>

          <Button size="sm" color="gray" variant="outline" onClick={onReset} disabled={isResetDisabled}>
            Reset Loadout
          </Button>

          <Card radius="md" withBorder p="sm">
            <Text fw={700} size="sm">
              Tip
            </Text>
            <Text size="xs" c="dimmed">
              Choose attachments that match your playstyle. Balance range, stability and fire rate.
            </Text>
          </Card>
        </Stack>
      </Paper>
    </Stack>
  )
}
