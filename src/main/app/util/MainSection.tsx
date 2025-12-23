import { FC, ReactNode } from 'react'
import { styled } from '@mui/joy'

const Section = styled('section')({})

const MainSection: FC<{ label?: string, children: ReactNode }> = ({ label, children }) => {
  return (
    <Section sx={{
      mx: { xs: 2, md: 8, lg: 'auto' },
      my: { xs: 2, md: 4 },
      minWidth: { md: 800, lg: 1200 },
      maxWidth: 1600
    }}>
      {label && (<>
        <title>{label}</title>
      </>)}

      {children}
    </Section>
  )
}

export default MainSection
