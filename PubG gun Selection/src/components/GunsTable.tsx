import { useState } from 'react'
import {
  Table,
  Paper,
  Stack,
  Title,
  Badge,
  Group,
  ActionIcon,
  Text,
  Loader,
  Center,
  Alert,
  Button,
  Tooltip,
  Modal,
  TextInput,
  Select,
  Progress,
  Divider,
  SimpleGrid,
} from '@mantine/core'
import {
  IconEdit,
  IconTrash,
  IconAlertCircle,
  IconSearch,
  IconFlame,
  IconTargetArrow,
  IconBolt,
  IconActivity,
} from '@tabler/icons-react'
import { useGuns, useCreateGun, useUpdateGun, useDeleteGun } from '../utils/hooks'
import type { Gun, GunInput } from '../utils/gunSchema'
import { GunEditModal } from './GunEditModal'
import { notifications } from '@mantine/notifications'

export function GunsTable() {
  const { data: guns, isLoading, error } = useGuns()
  const createMutation = useCreateGun()
  const updateMutation = useUpdateGun()
  const deleteMutation = useDeleteGun()

  const [selectedGun, setSelectedGun] = useState<Gun | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [gunToDelete, setGunToDelete] = useState<Gun | null>(null)
  const [previewGun, setPreviewGun] = useState<Gun | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState('name-asc')

  const handleEditClick = (gun: Gun) => {
    setSelectedGun(gun)
    setEditModalOpen(true)
  }

  const handleDeleteClick = (gun: Gun) => {
    setGunToDelete(gun)
    setDeleteModalOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!gunToDelete) return

    try {
      await deleteMutation.mutateAsync(gunToDelete.id)

      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'Weapon deleted successfully.',
      })

      setDeleteModalOpen(false)
      setGunToDelete(null)
    } catch (err) {
      console.error('Error deleting gun:', err)

      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Weapon could not be deleted.',
      })
    }
  }

  const handleCreateGun = async (gunData: GunInput) => {
    try {
      await createMutation.mutateAsync(gunData)

      notifications.show({
        color: 'green',
        title: 'Success',
        message: 'Weapon created successfully.',
      })

      setCreateModalOpen(false)
    } catch (err) {
      console.error('Error creating gun:', err)

      notifications.show({
        color: 'red',
        title: 'Error',
        message: 'Weapon could not be created.',
      })
    }
  }

  const handleUpdateGun = async (gunData: GunInput) => {
  if (!selectedGun) return

  try {
    await updateMutation.mutateAsync({
      id: selectedGun.id,
      gunData,
    })

    notifications.show({
      color: 'green',
      title: 'Success',
      message: 'Weapon updated successfully.',
    })

    setEditModalOpen(false)
    setSelectedGun(null)
  } catch (err) {
    console.error('Error updating gun:', err)

    notifications.show({
      color: 'red',
      title: 'Error',
      message: 'Weapon could not be updated.',
    })
  }
}

  if (isLoading) {
    return (
      <Center p="xl">
        <Loader />
      </Center>
    )
  }

  if (error) {
    return (
      <Alert icon={<IconAlertCircle />} color="red">
        Error loading weapons: {error.message}
      </Alert>
    )
  }

  const roleOptions = Array.from(
     new Set(guns?.map((gun) => gun.role) ?? [])
    ).map((role) => ({
     value: role,
     label: role,
  }))

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'role', label: 'Role (A-Z)' },
  ]

  const filteredGuns = guns
    ?.filter((gun) => {
      const matchesSearch = gun.name
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase())

      const matchesRole = selectedRole
        ? gun.role === selectedRole
        : true

      return matchesSearch && matchesRole
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-desc':
          return b.name.localeCompare(a.name)

        case 'role':
          return a.role.localeCompare(b.role)

        default:
          return a.name.localeCompare(b.name)
      }
  })

  const getStatColor = (value: number) => {
    if (value >= 75) return 'green'
    if (value >= 50) return 'yellow'
    return 'red'
  }

  const rows = filteredGuns?.map((gun) => (
    <Table.Tr key={gun.id}>
      <Table.Td style={{ minWidth: 120 }}>
        <Group gap="sm" wrap="nowrap">
          <img
            src={gun.image}
            alt={gun.name}
            style={{
              width: 40,
              height: 40,
              minWidth: 40,
              objectFit: 'contain',
              borderRadius: 4,
            }}
          />

          <div>
            <Text fw={500} style={{ whiteSpace: 'nowrap' }}>
              {gun.name}
            </Text>

            <Text size="sm" c="dimmed" style={{ whiteSpace: 'nowrap' }}>
              ID: {gun.id}
            </Text>
          </div>
        </Group>
      </Table.Td>

      <Table.Td>
        <Badge variant="light" color="blue">
          {gun.role}
        </Badge>
      </Table.Td>

      <Table.Td>
        <Text size="sm" lineClamp={2}>
          {gun.description}
        </Text>
      </Table.Td>

      <Table.Td>
        <Group gap="xs" wrap="wrap">
          {gun.bullets.map((bullet, idx) => (
            <Badge key={idx} size="sm" variant="dot">
              {bullet}
            </Badge>
          ))}
        </Group>
      </Table.Td>

      <Table.Td>
        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <Tooltip label="Edit">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => handleEditClick(gun)}
              loading={updateMutation.isPending}
              aria-label={`Edit ${gun.name}`}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Delete">
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => handleDeleteClick(gun)}
              loading={deleteMutation.isPending}
              aria-label={`Delete ${gun.name}`}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>

          <Tooltip label="Preview">
            <Button
              size="xs"
              variant="light"
              onClick={() => setPreviewGun(gun)}
            >
              Preview
            </Button>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ))

  return (
    <Paper p="xl" radius="xl" className="panel-card">
      <Stack gap="md">
        <Group justify="space-between" align="flex-start">
          <div>
            <Title order={2}>Weapon Management</Title>

            <Text c="dimmed" mt="xs">
              Manage all weapons using the create, edit and delete functions.
            </Text>
          </div>

          <Button onClick={() => setCreateModalOpen(true)}>
            Add Weapon
          </Button>
        </Group>

        <Group grow align="flex-end">
          <TextInput
            label="Search weapon"
            placeholder="Enter weapon name..."
            leftSection={<IconSearch size={16} />}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.currentTarget.value)}
          />

          <Select
            label="Filter by role"
            placeholder="All roles"
            data={roleOptions}
            value={selectedRole}
            onChange={setSelectedRole}
            clearable
          />

          <Select
            label="Sort by"
            data={sortOptions}
            value={sortBy}
            onChange={(value) => {
              if (value) setSortBy(value)
            }}
          />
        </Group>

        <div style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover style={{ width: '100%', minWidth: 900 }}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Weapon</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Description</Table.Th>
                <Table.Th>Features</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>
              {rows && rows.length > 0 ? (
                rows
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text ta="center" c="dimmed" py="xl">
                      No weapons found.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
        </div>

        <Text c="dimmed" size="sm">
          Showing {filteredGuns?.length || 0} of {guns?.length || 0} weapons
        </Text>
      </Stack>

      <GunEditModal
        key={createModalOpen ? 'create-open' : 'create-closed'}
        opened={createModalOpen}
        gun={null}
        mode="create"
        isLoading={createMutation.isPending}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateGun}
      />

      <GunEditModal
        key={selectedGun?.id ?? 'no-gun'}
        opened={editModalOpen}
        gun={selectedGun}
        isLoading={updateMutation.isPending}
        onClose={() => {
          setEditModalOpen(false)
          setSelectedGun(null)
        }}
        onSubmit={handleUpdateGun}
      />

      <Modal
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setGunToDelete(null)
        }}
        title="Confirm deletion"
      >
        <Stack gap="md">
          <Text>
            Are you sure you want to delete{' '}
            <strong>{gunToDelete?.name}</strong>?
          </Text>

          <Group justify="flex-end">
            <Button
              variant="default"
              onClick={() => {
                setDeleteModalOpen(false)
                setGunToDelete(null)
              }}
            >
              Cancel
            </Button>

            <Button
              color="red"
              onClick={handleConfirmDelete}
              loading={deleteMutation.isPending}
            >
              Delete
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={!!previewGun}
        onClose={() => setPreviewGun(null)}
        title={previewGun?.name}
        size="xl"
        centered
      >
        {previewGun && (
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
                src={previewGun.image}
                alt={previewGun.name}
                style={{
                  width: '100%',
                  height: 300,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Paper>

            <div>
              <Title order={2}>{previewGun.name}</Title>

              <Badge mt="sm" size="lg" color="blue">
                {previewGun.role}
              </Badge>
            </div>

            <Divider />

            <SimpleGrid cols={2} spacing="xl">

              <div>
                <Group gap="xs" mb={4}>
                  <IconFlame size={18} />
                  <Text fw={600}>
                    Damage ({previewGun.damage})
                  </Text>
                </Group>

                <Progress
                  value={previewGun.damage}
                  color={getStatColor(previewGun.damage)}
                  size="lg"
                  radius="xl"
                />
              </div>

              <div>
                <Group gap="xs" mb={4}>
                  <IconTargetArrow size={18} />
                  <Text fw={600}>
                    Range ({previewGun.range})
                  </Text>
                </Group>

                <Progress value={previewGun.range} color={getStatColor(previewGun.range)} size="lg" radius="xl" />
              </div>

              <div>
                <Group gap="xs" mb={4}>
                  <IconBolt size={18} />
                  <Text fw={600}>
                    Fire Rate ({previewGun.fireRate})
                  </Text>
                </Group>

                <Progress
                  value={previewGun.fireRate}
                  color={getStatColor(previewGun.fireRate)}
                  size="lg"
                  radius="xl"
                />
              </div>

              <div>
                <Group gap="xs" mb={4}>
                  <IconActivity size={18} />
                  <Text fw={600}>
                    Recoil ({previewGun.recoil})
                  </Text>
                </Group>

                <Progress value={previewGun.recoil} color={getStatColor(previewGun.recoil)} size="lg" radius="xl" />
              </div>

            </SimpleGrid>

            <Divider />

            <SimpleGrid cols={2}>

              <Paper withBorder p="md" radius="md">
                <Text size="sm" c="dimmed">
                  Magazine Size
                </Text>

                <Title order={3}>
                  {previewGun.magazineSize}
                </Title>
              </Paper>

              <Paper withBorder p="md" radius="md">
                <Text size="sm" c="dimmed">
                  Ammo Type
                </Text>

                <Title order={3}>
                  {previewGun.ammoType}
                </Title>
              </Paper>

            </SimpleGrid>

            <Divider />

            <div>

              <Text fw={600} mb="sm">
                Features
              </Text>

              <Group gap="sm">
                {previewGun.bullets.map((bullet) => (
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

              <Text c="dimmed">
                {previewGun.description}
              </Text>

            </div>

          </Stack>
        )}
      </Modal>
    </Paper>
  )
}