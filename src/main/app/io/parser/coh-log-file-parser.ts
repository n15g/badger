import { Parser, ParserResponse } from './parser.ts'
import { CohContentDatabase } from 'coh-content-db'
import { Character, CharacterBadgeRecord } from '../../character/character.ts'

const LOG_START = /\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} /
const LOGIN_RE = new RegExp(LOG_START.source + /(?:Now entering the Rogue Isles|Welcome to City of Heroes), (.*)!/.source)
const SET_TITLE_RE = new RegExp(LOG_START.source + /(.*) has been selected as new title/.source)
const EARN_BADGE_RE = new RegExp(LOG_START.source + /Congratulations! You earned the (.*) badge/.source)

interface CharacterBuilder {
  name: string
  badgeKeys: string[]
}

export class CoHLogFileParser implements Parser {
  private _badges: Partial<Record<string, string>> = {}

  constructor(content: CohContentDatabase) {
    for (const badge of content.badges) {
      for (const name of badge.name.canonical) {
        this._badges[name.value.toLowerCase()] = badge.key
      }
    }
  }

  public async onText(text: string): Promise<ParserResponse> {
    if (
      LOGIN_RE.test(text)
      || SET_TITLE_RE.test(text)
      || EARN_BADGE_RE.test(text)
    ) {
      const characterBuilders: Record<string, CharacterBuilder> = {}
      let activeChar: CharacterBuilder | undefined = undefined

      function updateActiveCharacter(newName?: string): CharacterBuilder {
        if (newName) {
          activeChar = characterBuilders[newName] ?? { name: newName, badgeKeys: [] }
          characterBuilders[newName] = activeChar
        } else if (!activeChar) {
          activeChar = { name: 'Unknown Character', badgeKeys: [] }
          characterBuilders['Unknown Character'] = activeChar
        }

        return activeChar
      }

      for (const line of text.split(/\r?\n/)) {
        const loginMatch = LOGIN_RE.exec(line)
        if (loginMatch) {
          updateActiveCharacter(loginMatch[1])
        }

        const badgeMatch = SET_TITLE_RE.exec(line) ?? EARN_BADGE_RE.exec(line)
        if (badgeMatch) {
          const char = updateActiveCharacter()
          const badgeName = badgeMatch[1].toLowerCase()
          const badgeKey = this._badges[badgeName]
          if (badgeKey) {
            char.badgeKeys.push(badgeKey)
          }
        }
      }

      const characters: Partial<Character>[] = Object.values(characterBuilders).map((builder) => {
        const badges: Record<string, CharacterBadgeRecord> = {}

        for (const badgeKey of builder.badgeKeys) {
          badges[badgeKey] = { owned: true }
        }

        return {
          name: builder.name,
          badges
        }
      })

      return {
        tags: ['log'],
        characters
      }
    }
  }
}
