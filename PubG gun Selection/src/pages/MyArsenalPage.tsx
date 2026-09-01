import { useMemo, useState } from 'react'
import {
  Badge,
  Button,
  Group,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import {
  IconEye,
  IconFlame,
  IconStarFilled,
  IconTargetArrow,
  IconTrash,
} from '@tabler/icons-react'
import type { Gun } from '../utils/gunSchema'
import { fakeGunsData } from '../utils/fakeData'
import { useFavorites } from '../hooks/useFavorites'
import { WeaponPreviewModal } from '../components/WeaponPreviewModal'

export function MyArsenalPage() {
  const { favorites, toggleFavorite } = useFavorites()
  const [previewGun, setPreviewGun] = useState<Gun | null>(null)

  const favoriteGuns = useMemo(
    () =>
      fakeGunsData.filter((gun) =>
        favorites.includes(gun.name),
      ),
    [favorites],
  )

  return (
    <Paper className="panel-card" radius="xl">
      <Stack gap="xl">
        <div>
          <Group gap="sm">
            <IconStarFilled size={24} />

            <Title order={2}>My Arsenal</Title>
          </Group>

          <Text c="dimmed" mt="xs">
            Your favorite PUBG weapons in one place.
          </Text>
        </div>

        {favoriteGuns.length > 0 ? (
          <>
            <Badge
              size="lg"
              variant="light"
              color="yellow"
              w="fit-content"
            >
              {favoriteGuns.length}{' '}
              {favoriteGuns.length === 1
                ? 'Favorite Weapon'
                : 'Favorite Weapons'}
            </Badge>

            <SimpleGrid
              cols={{
                base: 1,
                sm: 2,
                lg: 3,
              }}
              spacing="lg"
            >
              {favoriteGuns.map((gun) => (
                <Paper
                  key={gun.id}
                  withBorder
                  radius="lg"
                  p="lg"
                  className="arsenal-card"
                >
                  <Stack gap="md">
                    <div className="arsenal-card__image-wrap">
                      <IconStarFilled
                        size={22}
                        color="orange"
                        style={{
                          position: 'absolute',
                          top: 14,
                          right: 14,
                          zIndex: 2,
                        }}
                      />

                      <img
                        src={gun.image}
                        alt={gun.name}
                        className="arsenal-card__image"
                      />
                    </div>

                    <div>
                      <Title order={3}>{gun.name}</Title>

                      <Badge
                        mt="xs"
                        variant="light"
                        color="blue"
                      >
                        {gun.role}
                      </Badge>
                    </div>

                    <Group justify="space-between">
                      <div>
                        <Text size="xs" c="dimmed">
                          Ammo
                        </Text>

                        <Text fw={600}>
                          {gun.ammoType}
                        </Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Magazine
                        </Text>

                        <Text fw={600}>
                          {gun.magazineSize}
                        </Text>
                      </div>
                    </Group>

                    <div>
                      <Group
                        justify="space-between"
                        mb={5}
                      >
                        <Group gap={5}>
                          <IconFlame size={15} />

                          <Text size="sm" fw={600}>
                            Damage
                          </Text>
                        </Group>

                        <Text size="sm">
                          {gun.damage}
                        </Text>
                      </Group>

                      <Progress
                        value={gun.damage}
                        size="sm"
                        radius="xl"
                      />
                    </div>

                    <div>
                      <Group
                        justify="space-between"
                        mb={5}
                      >
                        <Group gap={5}>
                          <IconTargetArrow size={15} />

                          <Text size="sm" fw={600}>
                            Range
                          </Text>
                        </Group>

                        <Text size="sm">
                          {gun.range}
                        </Text>
                      </Group>

                      <Progress
                        value={gun.range}
                        size="sm"
                        radius="xl"
                      />
                    </div>

                    <Group grow>
                      <Button
                        variant="light"
                        leftSection={<IconEye size={16} />}
                        onClick={() => setPreviewGun(gun)}
                      >
                        View Details
                      </Button>

                      <Button
                        variant="light"
                        color="red"
                        leftSection={<IconTrash size={16} />}
                        onClick={() =>
                          toggleFavorite(gun.name)
                        }
                      >
                        Remove
                      </Button>
                    </Group>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Paper
            withBorder
            radius="lg"
            p="xl"
            ta="center"
          >
            <Stack align="center" gap="sm">
              <IconStarFilled
                size={36}
                opacity={0.35}
              />

              <Title order={3}>
                No favorite weapons yet
              </Title>

              <Text c="dimmed">
                Add weapons to your arsenal using the star
                button in Weapon Management or Weapon Preview.
              </Text>
            </Stack>
          </Paper>
        )}
      </Stack>

      <WeaponPreviewModal
        gun={previewGun}
        onClose={() => setPreviewGun(null)}
      />
    </Paper>
  )
}