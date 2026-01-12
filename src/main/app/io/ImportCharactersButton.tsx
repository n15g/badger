import { FC, useState } from 'react'
import { Button, ButtonProps } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import ImportCharactersModal from './ImportCharactersModal.tsx'

const ImportCharactersButton: FC<ButtonProps>
  = ({ ...props }) => {

  const [open, setOpen] = useState(false)

  return (<>
    <Button
      color="success"
      {...props}
      onClick={() => {
        setOpen(true)
      }}
      startDecorator={<Icons.Upload/>}
    >
      Import Characters
    </Button>
    <ImportCharactersModal open={open} onClose={() => {
      setOpen(false)
    }}
    />
  </>)
}

export default ImportCharactersButton
