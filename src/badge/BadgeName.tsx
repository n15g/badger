import { FC, Fragment } from 'react'
import { AlternateData, Badge } from 'coh-content-db'
import { Stack, Typography } from '@mui/joy'
import { PiGenderFemale, PiGenderMale } from 'react-icons/pi'
import AlignmentColored from '../util/AlignmentColored.tsx'


const BadgeName: FC<{ badge: Badge, defaultName?: boolean, direction?: 'row' | 'column' }> =
  ({ badge, defaultName, direction = 'row' }) => {
    return defaultName
      ? <StyledName name={badge.name.default}/>
      : <Stack direction={direction} gap={direction === 'row' ? 1 : 0}>
        {badge.name.canonical.map((name, index) =>
          <Fragment key={`${name.value}:${name.alignment ?? ''}:${name.sex ?? ''}`}>
            {direction === 'row' && index > 0 && <Typography sx={{ userSelect: 'none' }}>/</Typography>}
            <StyledName name={name}/>
          </Fragment>
        )}
      </Stack>
  }

const StyledName: FC<{ name?: AlternateData<string> }> = ({ name }) => {
  return <Stack direction="row" alignItems="center" gap={0.25}>
    {name?.sex === 'M' && <PiGenderMale/>}
    {name?.sex === 'F' && <PiGenderFemale/>}
    <Typography sx={{ overflow: 'hidden', textWrap: 'nowrap', textOverflow: 'ellipsis', fontWeight: 'bold' }}>
      <AlignmentColored alignment={name?.alignment}>{name?.value ?? 'Unknown'}</AlignmentColored>
    </Typography>
  </Stack>
}
export default BadgeName
