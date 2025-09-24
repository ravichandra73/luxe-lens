import { useEffect, useState } from 'react'

import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from '@mui/material'

export type FilterValues = {
  gender?: string
  material?: string
  style?: string
  color?: string
  limitedEdition?: boolean
  onSale?: boolean
}

type Props = {
  initial?: FilterValues
  onChange: (values: FilterValues) => void
}

const FilterSidebar = ({ initial, onChange }: Props) => {
  const [values, setValues] = useState<FilterValues>(initial ?? {})

  useEffect(() => {
    onChange(values)
  }, [values, onChange])

  const toggle =
    (key: keyof FilterValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const val =
        e.target.type === 'checkbox' ? e.target.checked : e.target.value
      setValues((v) => ({ ...v, [key]: val }))
    }

  return (
    <Box component="aside">
      <Stack spacing={3}>
        {/* Gender */}
        <FormControl fullWidth>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Select
            labelId="gender-label"
            value={values.gender ?? ''}
            label="Gender"
            onChange={toggle('gender')}
          >
            <MenuItem value="">Any</MenuItem>
            <MenuItem value="UNISEX">UNISEX</MenuItem>
            <MenuItem value="MEN">MEN</MenuItem>
            <MenuItem value="WOMEN">WOMEN</MenuItem>
          </Select>
        </FormControl>

        {/* Material */}
        <TextField
          label="Material"
          placeholder="e.g. TITANIUM"
          fullWidth
          value={values.material ?? ''}
          onChange={toggle('material')}
        />

        {/* Style */}
        <TextField
          label="Style"
          placeholder="e.g. AVIATOR"
          fullWidth
          value={values.style ?? ''}
          onChange={toggle('style')}
        />

        {/* Color */}
        <TextField
          label="Color"
          placeholder="e.g. Black"
          fullWidth
          value={values.color ?? ''}
          onChange={toggle('color')}
        />

        {/* Limited Edition */}
        <FormControlLabel
          control={
            <Checkbox
              checked={values.limitedEdition ?? false}
              onChange={toggle('limitedEdition')}
            />
          }
          label="Limited Edition"
        />

        {/* On Sale */}
        <FormControlLabel
          control={
            <Checkbox
              checked={values.onSale ?? false}
              onChange={toggle('onSale')}
            />
          }
          label="On Sale"
        />
      </Stack>
    </Box>
  )
}

export default FilterSidebar
