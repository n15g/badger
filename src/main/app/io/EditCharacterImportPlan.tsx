import { FC } from 'react'
import { Table, TableProps, Typography } from '@mui/joy'
import { CharacterImportPlan } from './character-import-plan.ts'
import ImportActionSelect from './ImportActionSelect.tsx'
import CharacterSelect from '../character/CharacterSelect.tsx'
import { produce } from 'immer'
import { Character } from '../character/character.ts'
import CharacterDbProvider from '../character/CharacterDbProvider.tsx'


const EditCharacterImportPlan: FC<{
  value?: CharacterImportPlan,
  onNewValue?: (value: CharacterImportPlan) => void,
  characters?: Character[],
} & TableProps>
  = ({
       value,
       onNewValue,
       characters,
       ...props
     }) => {

  const { characters: dbCharacters } = CharacterDbProvider.useCharacterDb()
  characters ??= dbCharacters

  return value && (
    <Table {...props} sx={{ maxWidth: 800, my: 2 }}>
      <tbody>
      {Object.values(value).length > 0 && Object.entries(value).map(([key, { incoming, existing, action }]) => (
        <tr key={key}>
          <td>
            {incoming.name}
          </td>
          <td width={150}>
            <ImportActionSelect
              value={action}
              onNewValue={(action) => {
                return onNewValue?.(
                  produce(value, (draft) => {
                    draft[key].action = action
                    if (action === 'new' || action === 'ignore') {
                      draft[key].existing = undefined
                    } else {
                      draft[key].existing ??= characters[0]
                    }
                  })
                )
              }}/>
          </td>
          <td>
            <CharacterSelect
              value={existing}
              disabled={action !== 'merge' && action !== 'replace'}
              characters={characters}
              onNewValue={(character) => {
                return onNewValue?.(
                  produce(value, (draft) => {
                    const action = draft[key].action
                    draft[key].existing = character
                    if (!character && (action === 'replace' || action == 'merge')) {
                      draft[key].action = 'new'
                    }
                  })
                )
              }}/>
          </td>
        </tr>
      ))}

      {Object.values(value).length === 0 && (
        <tr>
          <td>
            <Typography level="body-sm" textAlign="center"><em>No characters found...</em></Typography>
          </td>
        </tr>
      )}
      </tbody>
    </Table>
  )
}

export default EditCharacterImportPlan
