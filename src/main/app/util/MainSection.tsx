import { FC, ReactNode } from 'react'
import { styled } from '@mui/joy'

const Section = styled('section')({})

const MainSection: FC<{ title?: string, children: ReactNode }> = ({ title, children }) => {
  return (
    <Section sx={{
      px: { xs: 1, md: 8, lg: '10%' },
      py: { xs: 2, md: 4 },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {title && (<>
        <title>{title}</title>
      </>)}

      {children}
    </Section>
  )
}

export default MainSection
