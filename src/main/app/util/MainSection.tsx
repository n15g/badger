import { FC, ReactNode } from 'react'
import { styled } from '@mui/joy'

const Section = styled('section')({})

const MainSection: FC<{ label?: string, children: ReactNode }> = ({ label, children }) => {
  return (
    <Section sx={{ mx: { xs: 2, md: 8, lg: 'auto' }, maxWidth: 1400 }}>
      {label && (<>
        <title>{label}</title>
      </>)}

      {children}
    </Section>
  )
}

export default MainSection
