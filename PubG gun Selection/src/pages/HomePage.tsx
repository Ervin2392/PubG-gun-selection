import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core'
import {
  IconAdjustments,
  IconChartBar,
  IconDeviceLaptop,
  IconListDetails,
} from '@tabler/icons-react'
import { Link } from 'react-router-dom'
import heroImage from '../assets/home-hero.png'
import { fakeGunsData } from '../utils/fakeData'
import type { Gun } from '../utils/gunSchema'
import { WeaponPreviewModal } from '../components/WeaponPreviewModal'

const popularWeaponNames = ['M16A4', 'AKM', 'AWM', 'UMP45']

export function HomePage() {
  const [previewGun, setPreviewGun] = useState<Gun | null>(null)

  const popularWeapons = fakeGunsData.filter((gun) =>
    popularWeaponNames.includes(gun.name),
  )

  return (
    <>
      <Stack gap="xl">
        <Paper
          component="section"
          radius="xl"
          className="home-hero"
        >
          <img
            src={heroImage}
            alt=""
            className="home-hero__image"
            aria-hidden="true"
          />

          <div className="home-hero__overlay" />

          <Stack gap="lg" className="home-hero__content">
            <Text
              size="sm"
              tt="uppercase"
              fw={700}
              className="home-hero__eyebrow"
            >
              PUBG Weapons Overview
            </Text>

            <Title order={1} className="home-hero__title">
              <span>Weapons.</span>
              <span>Stats.</span>
              <span className="home-hero__title-highlight">
                Victory.
              </span>
            </Title>

            <Text
              size="lg"
              c="dimmed"
              className="home-hero__description"
            >
              Explore PUBG weapons, review detailed statistics and build the
              perfect loadout for your playstyle.
            </Text>

            <Group gap="md">
              <Button
                component={Link}
                to="/gun-selection"
                size="md"
              >
                Explore Weapons
              </Button>

              <Button
                component={Link}
                to="/loadouts"
                size="md"
                variant="default"
              >
                Build Loadout
              </Button>
            </Group>

            <SimpleGrid
              cols={{ base: 2, sm: 4 }}
              spacing="md"
              className="home-hero__stats"
            >
              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size="md" radius="md" variant="light">
                  <IconListDetails size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={700}>10+</Text>
                  <Text size="xs" c="dimmed">
                    Weapons
                  </Text>
                </div>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size="md" radius="md" variant="light">
                  <IconAdjustments size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={700}>4</Text>
                  <Text size="xs" c="dimmed">
                    Attachments
                  </Text>
                </div>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size="md" radius="md" variant="light">
                  <IconChartBar size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={700}>Live</Text>
                  <Text size="xs" c="dimmed">
                    Statistics
                  </Text>
                </div>
              </Group>

              <Group gap="xs" wrap="nowrap">
                <ThemeIcon size="md" radius="md" variant="light">
                  <IconDeviceLaptop size={18} />
                </ThemeIcon>

                <div>
                  <Text fw={700}>100%</Text>
                  <Text size="xs" c="dimmed">
                    Responsive
                  </Text>
                </div>
              </Group>
            </SimpleGrid>
          </Stack>
        </Paper>

        <Paper
          component="section"
          radius="xl"
          p="xl"
          className="home-popular-section"
        >
          <Stack gap="lg">
              <div>
                <Text
                  size="sm"
                  tt="uppercase"
                  fw={700}
                  className="home-section-eyebrow"
                >
                  Featured Selection
                </Text>

                <Title order={2}>
                  Popular Weapons
                </Title>

                <Text
                  c="dimmed"
                  mt="xs"
                >
                  Click a weapon to open the detailed preview.
                </Text>
              </div>
            
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 4 }}
              spacing="lg"
            >
              {popularWeapons.map((gun) => (
                <Card
                  key={gun.id}
                  withBorder
                  radius="lg"
                  padding="lg"
                  className="home-weapon-card"
                >
                  <Stack gap="md" h="100%">
                    <Group
                      justify="space-between"
                      align="flex-start"
                    >
                      <div>
                        <Text
                          fw={700}
                          size="lg"
                        >
                          {gun.name}
                        </Text>

                        <Text
                          size="sm"
                          c="dimmed"
                        >
                          {gun.ammoType}
                        </Text>
                      </div>

                      <Badge variant="light">
                        {gun.role}
                      </Badge>
                    </Group>

                    <div className="home-weapon-card__image-wrap">
                      <img
                        src={gun.image}
                        alt={gun.name}
                        className="home-weapon-card__image"
                      />
                    </div>

                    <SimpleGrid cols={2} spacing="xs">
                      <div>
                        <Text size="xs" c="dimmed">
                          Damage
                        </Text>

                        <Text fw={700}>
                          {gun.damage}
                        </Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Range
                        </Text>

                        <Text fw={700}>
                          {gun.range}
                        </Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Fire Rate
                        </Text>

                        <Text fw={700}>
                          {gun.fireRate}
                        </Text>
                      </div>

                      <div>
                        <Text size="xs" c="dimmed">
                          Magazine
                        </Text>

                        <Text fw={700}>
                          {gun.magazineSize}
                        </Text>
                      </div>
                    </SimpleGrid>

                    <Button
                      variant="light"
                      fullWidth
                      mt="auto"
                      onClick={() => setPreviewGun(gun)}
                    >
                      View Details
                    </Button>
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Paper>
      </Stack>

      <WeaponPreviewModal
        gun={previewGun}
        onClose={() => setPreviewGun(null)}
      />
    </>
  )
}