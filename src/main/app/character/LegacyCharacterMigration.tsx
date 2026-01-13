import { FC, ReactNode, useCallback, useEffect, useState } from 'react'
import contentProvider from '../content/ContentProvider.tsx'
import LoadingScreen from '../util/LoadingScreen.tsx'
import { Character, CharacterBadgeRecord, CharacterBadgeRequirementRecord } from './character.ts'
import { produce } from 'immer'
import { CohContentDatabase } from 'coh-content-db'
import CharacterDbProvider from './CharacterDbProvider.tsx'
import { LegacyCharacter } from './legacy-character.tsx'


const LegacyCharacterMigration: FC<{
  children: ReactNode
}> = ({ children }) => {
  const content = contentProvider.useContent()
  const { characters, createCharacter } = CharacterDbProvider.useCharacterDb()

  const [loaded, setLoaded] = useState(false)

  const importCharacters = useCallback(async () => {
    if (characters.length === 0) {
      const legacyCharacters = importLegacyCharacters(content)
      for (const char of legacyCharacters) {
        await createCharacter(char)
      }
    }
  }, [characters, content, createCharacter])

  useEffect(() => {
    void importCharacters()
      .then(() => {
        setLoaded(true)
      })
  }, [importCharacters])

  return loaded ? children : <LoadingScreen text={'Migrating characters from Badger 1'}/>
}


function importLegacyCharacters(content: CohContentDatabase): Character[] {
  const legacyString = localStorage.getItem('ngx_characters')

  if (!legacyString) {
    console.info('Found no characters to migrate from Badger 1.0')
    return []
  }

  let legacyJSON: { content: Record<string, LegacyCharacter> } = { content: {} }
  try {
    legacyJSON = JSON.parse(legacyString) as never
  } catch (err: unknown) {
    console.error('Failed to import legacy characters', err)
    return []
  }
  const legacyList: Record<string, LegacyCharacter> = legacyJSON.content
  console.info('Migrating legacy data:', legacyList)

  return Object.values(legacyList).map((legacy) => {
    console.info('Visiting', legacy)
    const badgeRecord = produce<Record<string, CharacterBadgeRecord>>({}, (badgeDraft) => {
      for (const [legacyBadgeKey, legacyBadgeEntry] of Object.entries(legacy.badges ?? {})) {
        const badge = content.getBadge(legacyBadgeKey)

        const req = produce<Record<string, CharacterBadgeRequirementRecord>>({}, (reqDraft) => {
          for (const [legacyReqKey, legacyReqEntry] of Object.entries(legacyBadgeEntry.partials ?? {})) {
            reqDraft[legacyReqKey] = {
              owned: legacyReqEntry.owned,
              count: legacyReqEntry.craftCount
            }

            // Set owned if the count is met
            const badgeReq = badge?.requirements.find(x => x.key === legacyReqKey)
            if (badgeReq?.count) {
              reqDraft[legacyReqKey].owned = badgeReq.count <= (legacyReqEntry.craftCount ?? 0)
            }
          }
        })

        // Check if there are any unmet requirements on this badge
        const unmetRequirement = !!badge?.requirements.find((requirement) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          return !req[requirement.key]?.owned
        })

        badgeDraft[legacyBadgeKey] = {
          owned: !unmetRequirement || legacyBadgeEntry.owned,
          req: req
        }
      }
    })

    const character: Character = {
      key: legacy.key,
      name: legacy.name,
      server: legacy.server,
      archetypeKey: legacy.archetypeKey,
      morality: 'hero',
      sex: 'M',
      badges: badgeRecord
    }

    console.info('Transformed', character)

    return character
  })
}

export default LegacyCharacterMigration

