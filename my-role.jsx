import React from 'react'
import { Box, Label, Select } from '@adminjs/design-system'

const MyRole = (props) => {
  const { onChange, property, record } = props

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'viewer', label: 'Viewer' },
  ]

  const selectedRole = record?.params?.[property.name] || ''
  console.log(record)
  return (
    <Box>
      <Label>{property.label}</Label>
      <Select
        value={roles.find(role => role.value === selectedRole)}
        options={roles}
        onChange={(selected) => onChange(property.name, selected?.value || '')}
      />
    </Box>
  )
}

export default MyRole
