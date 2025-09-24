import { useEffect, useRef, useState } from 'react'

import { useLazyQuery } from '@apollo/client'
import {
  TextField,
  Paper,
  List,
  ListItemButton,
  ListItemText,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material'
import gql from 'graphql-tag'

const SUGGEST_QUERY = gql`
  query Suggest($term: String!, $limit: Int) {
    searchSuggest(term: $term, limit: $limit) {
      type
      id
      label
      href
    }
  }
`

type Props = { className?: string }

const SearchAutocomplete = ({ className }: Props) => {
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const [load, { data }] = useLazyQuery(SUGGEST_QUERY)
  const timer = useRef<number | null>(null)
  const anchorRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current)
    if (!q) return setOpen(false)
    timer.current = window.setTimeout(() => {
      load({ variables: { term: q, limit: 6 } })
      setOpen(true)
    }, 200)
    return () => {
      if (timer.current) window.clearTimeout(timer.current)
    }
  }, [q, load])

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box className={className ?? ''} sx={{ position: 'relative' }}>
        <TextField
          fullWidth
          inputRef={anchorRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, collections..."
          variant="outlined"
          size="small"
        />

        <Popper
          open={open && data?.searchSuggest?.length > 0}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ zIndex: 1300, width: anchorRef.current?.offsetWidth }}
        >
          <Paper elevation={3}>
            <List dense>
              {data?.searchSuggest?.map((s, i) => (
                <ListItemButton
                  key={i}
                  component="a"
                  href={s.href}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    primary={s.label}
                    secondary={s.type.toUpperCase()}
                    primaryTypographyProps={{ fontSize: 14 }}
                    secondaryTypographyProps={{
                      fontSize: 10,
                      color: 'text.secondary',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  )
}

export default SearchAutocomplete
