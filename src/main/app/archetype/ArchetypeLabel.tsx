import { FC } from 'react'
import { Archetype } from 'coh-content-db'
import { Typography, TypographyProps } from '@mui/joy'
import ContentProvider from '../content/ContentProvider.tsx'
import ErrorText from '../util/ErrorText.tsx'

const ArchetypeLabel: FC<{ value?: Archetype | string } & TypographyProps> = ({ value, ...props }) => {
  const content = ContentProvider.useContent()

  const key = typeof value === 'string' ? value : value?.key
  const archetype = typeof value === 'string' ? content.getArchetype(key) : value

  return (
    <Typography
      component="span"
      display="inline"
      className="entity"
      {...props}
    >
      {archetype
        ? archetype.name
        : <ErrorText title="Unknown Archetype">{key ?? 'Unknown Archetype'}</ErrorText>
      }
    </Typography>
  )
}

export default ArchetypeLabel
