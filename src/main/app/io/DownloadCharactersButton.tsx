import { FC, useCallback } from 'react'
import { Button, ButtonProps } from '@mui/joy'
import { Icons } from '../util/Icons.tsx'
import { createCharacterEnvelope } from './envelope.ts'
import { blobify } from './blobify.ts'
import { startDownload } from './download.ts'
import { Character } from '../character/character.ts'

const DownloadCharactersButton: FC<{ characters: Character[] } & ButtonProps>
  = ({ characters: characters, ...props }) => {

  const download = useCallback(async () => {
    const payload = createCharacterEnvelope(characters)
    const { blob, extension } = await blobify({ payload: payload })
    const filename = (characters.length === 1 ? characters[0].name : 'Badger Characters Export') + extension

    startDownload(blob, filename)
  }, [characters])

  return characters.length > 0 && (
    <Button
      title={`Download Character${characters.length > 1 ? 's' : ''}`}
      color="warning"
      {...props}
      onClick={() => {
        void download()
      }}
    >
      <Icons.Download/>
    </Button>
  )
}

export default DownloadCharactersButton
