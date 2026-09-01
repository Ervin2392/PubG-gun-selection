import { useState } from 'react'
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Center,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
  Tooltip,
} from '@mantine/core'
import {
  IconAlertCircle,
  IconEdit,
  IconSearch,
  IconStar,
  IconStarFilled,
  IconTrash,
} from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import {
  useCreateGun,
  useDeleteGun,
  useGuns,
  useUpdateGun,
} from '../utils/hooks'
import type { Gun, GunInput } from '../utils/gunSchema'
import { GunEditModal } from './GunEditModal'
import { WeaponPreviewModal } from './WeaponPreviewModal'
import { useFavorites } from '../hooks/useFavorites'

export function GunsTable() {
  const { isFavorite, toggleFavorite } = useFavorites()
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
    new Set(guns?.map((gun) => gun.role) ?? []),
  ).map((role) => ({
    value: role,
    label: role,
  }))

  const sortOptions = [
    {
      value: 'name-asc',
      label: 'Name (A-Z)',
    },
    {
      value: 'name-desc',
      label: 'Name (Z-A)',
    },
    {
      value: 'role',
      label: 'Role (A-Z)',
    },
  ]

  const filteredGuns = guns
    ?.filter((gun) => {
      const normalizedSearchTerm = searchTerm.trim().toLowerCase()

      const matchesSearch = gun.name
        .toLowerCase()
        .includes(normalizedSearchTerm)

      const matchesRole = selectedRole
        ? gun.role === selectedRole
        : true

      return matchesSearch && matchesRole
    })
    .sort((firstGun, secondGun) => {
      switch (sortBy) {
        case 'name-desc':
          return secondGun.name.localeCompare(firstGun.name)

        case 'role':
          return firstGun.role.localeCompare(secondGun.role)

        default:
          return firstGun.name.localeCompare(secondGun.name)
      }
    })

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

            <Text
              size="sm"
              c="dimmed"
              style={{ whiteSpace: 'nowrap' }}
            >
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
          {gun.bullets.map((bullet, index) => (
            <Badge
              key={`${gun.id}-${bullet}-${index}`}
              size="sm"
              variant="dot"
            >
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

                    <Tooltip
            label={
              isFavorite(gun.name)
                ? 'Remove from My Arsenal'
                : 'Add to My Arsenal'
            }
          >
            <ActionIcon
              variant={isFavorite(gun.name) ? 'filled' : 'light'}
              color={isFavorite(gun.name) ? 'yellow' : 'gray'}
              onClick={() => toggleFavorite(gun.name)}
              aria-label={
                isFavorite(gun.name)
                  ? `Remove ${gun.name} from My Arsenal`
                  : `Add ${gun.name} to My Arsenal`
              }
            >
              {isFavorite(gun.name) ? (
                <IconStarFilled size={17} />
              ) : (
                <IconStar size={17} />
              )}
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
            onChange={(event) =>
              setSearchTerm(event.currentTarget.value)
            }
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
              if (value) {
                setSortBy(value)
              }
            }}
          />
        </Group>

        <div style={{ overflowX: 'auto' }}>
          <Table
            striped
            highlightOnHover
            style={{
              width: '100%',
              minWidth: 900,
            }}
          >
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
          Showing {filteredGuns?.length ?? 0} of {guns?.length ?? 0}{' '}
          weapons
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

      <WeaponPreviewModal
        gun={previewGun}
        onClose={() => setPreviewGun(null)}
      />
    </Paper>
  )
}