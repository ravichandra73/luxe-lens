import { Box, Typography } from '@mui/material'

type Props = {
  title: string
  paragraphs: string[]
}

const EditorialNarrative = ({ title, paragraphs }: Props) => {
  if (!paragraphs?.length) return null

  return (
    <Box component="section" sx={{ mt: 8 }}>
      <Typography
        variant="h5"
        fontWeight={600}
        color="text.primary"
        gutterBottom
      >
        {title}
      </Typography>

      <Box sx={{ mt: 2 }}>
        {paragraphs.map((p, i) => (
          <Typography
            key={i}
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2, lineHeight: 1.7 }}
          >
            {p}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default EditorialNarrative
