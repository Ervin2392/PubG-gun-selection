import { Box, Loader, Text, Title } from '@mantine/core'
import { useState } from 'react'
import { useGuns } from '../utils/hooks'
import { LoadoutForm, type LoadoutSelection } from './loadout/LoadoutForm'
import { LoadoutPreview } from './loadout/LoadoutPreview'
import { LoadoutStats } from './loadout/LoadoutStats'

const scopeOptions = [
  'Red Dot Sight',
  'Holographic Sight',
  '2x Scope',
  '3x Scope',
  '4x Scope',
  '6x Scope',
  '8x Scope',
].map((value) => ({ value, label: value }))

const gripOptions = [
  'None',
  'Vertical Foregrip',
  'Angled Foregrip',
  'Half Grip',
  'Lightweight Grip',
  'Thumb Grip',
].map((value) => ({ value, label: value }))

const magazineOptions = [
  'Standard Magazine',
  'Extended Magazine',
  'Quickdraw Magazine',
  'Extended Quickdraw Magazine',
].map((value) => ({ value, label: value }))

const muzzleOptions = [
  'None',
  'Compensator',
  'Flash Hider',
  'Suppressor',
].map((value) => ({ value, label: value }))

const initialSelection: LoadoutSelection = {
  primaryWeaponId: null,
  secondaryWeaponId: null,
  scope: null,
  grip: null,
  magazine: null,
  muzzle: null,
}

export function LoadoutsPage() {
  const { data: guns, isLoading, error } = useGuns()
  const [selection, setSelection] = useState<LoadoutSelection>(initialSelection)

  const primaryWeaponOptions = guns
    ? guns.map((gun) => ({
        value: gun.id.toString(),
        label: gun.name,
        image: gun.image,
        ammoType: gun.ammoType,
      }))
    : []

  const secondaryWeaponOptions = guns
    ? guns
        .filter((gun) => gun.id !== selection.primaryWeaponId)
        .map((gun) => ({
          value: gun.id.toString(),
          label: gun.name,
          image: gun.image,
          ammoType: gun.ammoType,
        }))
    : []

  const primaryWeapon = guns?.find((gun) => gun.id === selection.primaryWeaponId) ?? null
  const secondaryWeapon = guns?.find((gun) => gun.id === selection.secondaryWeaponId) ?? null

  const errorMessage =
    selection.primaryWeaponId !== null &&
    selection.secondaryWeaponId !== null &&
    selection.primaryWeaponId === selection.secondaryWeaponId
      ? 'Primary and secondary weapons cannot be the same.'
      : undefined

  const handleSelectionChange = (newSelection: LoadoutSelection) => {
    if (
      newSelection.primaryWeaponId !== null &&
      newSelection.secondaryWeaponId !== null &&
      newSelection.primaryWeaponId === newSelection.secondaryWeaponId
    ) {
      setSelection({ ...newSelection, secondaryWeaponId: null })
      return
    }

    setSelection(newSelection)
  }

  const resetSelection = () => {
    setSelection(initialSelection)
  }

  if (isLoading) {
    return (
      <Box className="panel-card" p="xl">
        <Loader />
      </Box>
    )
  }

  if (error) {
    return (
      <Box className="panel-card" p="xl">
        <Title order={2}>Loadouts</Title>
        <Text c="red" mt="md">
          Failed to load weapons. Please try again later.
        </Text>
      </Box>
    )
  }

  return (
    <Box>
      <Title order={2} mb="sm">
        Loadout Builder
      </Title>
      <div className="loadout-grid loadout-grid--desktop">
        <div>
          <LoadoutForm
            selection={selection}
            primaryWeaponOptions={primaryWeaponOptions}
            secondaryWeaponOptions={secondaryWeaponOptions}
            scopeOptions={scopeOptions}
            gripOptions={gripOptions}
            magazineOptions={magazineOptions}
            muzzleOptions={muzzleOptions}
            errorMessage={errorMessage}
            onSelectionChange={handleSelectionChange}
            onReset={resetSelection}
          />
        </div>

        <div className="loadout-grid__right">
          <div>
            <LoadoutPreview
              primaryWeapon={primaryWeapon}
              secondaryWeapon={secondaryWeapon}
              selection={selection}
            />
          </div>
          <div>
            <LoadoutStats primaryWeapon={primaryWeapon} secondaryWeapon={secondaryWeapon} />
          </div>
        </div>
      </div>
    </Box>
  )
}
