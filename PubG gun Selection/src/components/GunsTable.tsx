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
} from '@mantine/core'
import { IconEdit, IconTrash, IconAlertCircle } from '@tabler/icons-react'
import { useGuns, useUpdateGun, useDeleteGun } from '../utils/hooks'
import type { Gun, GunInput } from '../utils/gunSchema'
import { GunEditModal } from './GunEditModal'

export function GunsTable() {
  const { data: guns, isLoading, error } = useGuns()
  const updateMutation = useUpdateGun()
  const deleteMutation = useDeleteGun()

  const [selectedGun, setSelectedGun] = useState<Gun | null>(null)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [gunToDelete, setGunToDelete] = useState<Gun | null>(null)
  const [previewGun, setPreviewGun] = useState<Gun | null>(null)

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
      setDeleteModalOpen(false)
      setGunToDelete(null)
    } catch (err) {
      console.error('Error deleting gun:', err)
    }
  }

  const handleUpdateGun = async (gunData: GunInput) => {
    if (!selectedGun) return

    try {
      await updateMutation.mutateAsync({
        id: selectedGun.id,
        gunData,
      })

      setEditModalOpen(false)
      setSelectedGun(null)
    } catch (err) {
      console.error('Error updating gun:', err)
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

  const rows = guns?.map((gun) => (
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
        <div>
          <Title order={2}>Weapon Management</Title>

          <Text c="dimmed" mt="xs">
            Manage all weapons using the edit and delete functions.
          </Text>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover style={{ minWidth: 1100 }}>
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

            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>

        <Text c="dimmed" size="sm">
          Total: {guns?.length || 0} weapons
        </Text>
      </Stack>

      <GunEditModal
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
        size="lg"
      >
        {previewGun && (
          <Stack gap="md">
            <img
              src={previewGun.image}
              alt={previewGun.name}
              style={{
                width: '100%',
                maxHeight: 300,
                objectFit: 'contain',
              }}
            />

            <div>
              <Text fw={500} mb="xs">
                Role
              </Text>

              <Badge color="blue">{previewGun.role}</Badge>
            </div>

            <div>
              <Text fw={500} mb="xs">
                Description
              </Text>

              <Text>{previewGun.description}</Text>
            </div>

            <div>
              <Text fw={500} mb="xs">
                Features
              </Text>

              <Group gap="xs" wrap="wrap">
                {previewGun.bullets.map((bullet, idx) => (
                  <Badge key={idx} variant="light">
                    {bullet}
                  </Badge>
                ))}
              </Group>
            </div>
          </Stack>
        )}
      </Modal>
    </Paper>
  )
}