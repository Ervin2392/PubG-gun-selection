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
        Fehler beim Laden der Waffen: {error.message}
      </Alert>
    )
  }

  const rows = guns?.map((gun) => (
    <Table.Tr key={gun.id}>
      <Table.Td>
        <Group gap="sm">
          <img
            src={gun.image}
            alt={gun.name}
            style={{ width: 40, height: 40, objectFit: 'contain', borderRadius: 4 }}
          />
          <div>
            <Text fw={500}>{gun.name}</Text>
            <Text size="sm" c="dimmed">
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
        <Group gap="xs" justify="flex-end">
          <Tooltip label="Bearbeiten">
            <ActionIcon
              variant="light"
              color="blue"
              onClick={() => handleEditClick(gun)}
              loading={updateMutation.isPending}
            >
              <IconEdit size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Löschen">
            <ActionIcon
              variant="light"
              color="red"
              onClick={() => handleDeleteClick(gun)}
              loading={deleteMutation.isPending}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Vorschau">
            <Button
              size="xs"
              variant="light"
              onClick={() => setPreviewGun(gun)}
            >
              Vorschau
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
          <Title order={2}>Waffen-Verwaltung</Title>
          <Text c="dimmed" mt="xs">
            Verwalte alle Waffen mit Edit- und Delete-Funktionen
          </Text>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Waffe</Table.Th>
                <Table.Th>Rolle</Table.Th>
                <Table.Th>Beschreibung</Table.Th>
                <Table.Th>Eigenschaften</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>Aktionen</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </div>

        <Text c="dimmed" size="sm">
          Insgesamt: {guns?.length || 0} Waffen
        </Text>
      </Stack>

      {/* Edit Modal */}
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

      {/* Delete Confirmation Modal */}
      <Modal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Löschen bestätigen">
        <Stack gap="md">
          <Text>
            Möchtest du die Waffe <strong>{gunToDelete?.name}</strong> wirklich löschen?
          </Text>
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
              Abbrechen
            </Button>
            <Button
              color="red"
              onClick={handleConfirmDelete}
              loading={deleteMutation.isPending}
            >
              Löschen
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Preview Modal */}
      <Modal opened={!!previewGun} onClose={() => setPreviewGun(null)} title={previewGun?.name} size="lg">
        {previewGun && (
          <Stack gap="md">
            <img
              src={previewGun.image}
              alt={previewGun.name}
              style={{ width: '100%', maxHeight: 300, objectFit: 'contain' }}
            />
            <div>
              <Text fw={500} mb="xs">
                Rolle
              </Text>
              <Badge color="blue">{previewGun.role}</Badge>
            </div>
            <div>
              <Text fw={500} mb="xs">
                Beschreibung
              </Text>
              <Text>{previewGun.description}</Text>
            </div>
            <div>
              <Text fw={500} mb="xs">
                Eigenschaften
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
