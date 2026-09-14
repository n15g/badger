import { Parser, ParserResponse } from './parser.ts'
import { CohContentDatabase } from 'coh-content-db'
import { Character } from '../../character/character.ts'
import { produce } from 'immer'

const ID_RE = /([^:]*): .*Class_(.*)/
const BADGE_START_RE = /^Badges Earned:$/

const archetypes: Record<string, string> = {
  'Arachnos_Soldier': 'arachnos-soldier',
  'Arachnos_Widow': 'arachnos-widow',
  'Blaster': 'blaster',
  'Brute': 'brute',
  'Controller': 'controller',
  'Corruptor': 'corruptor',
  'Defender': 'defender',
  'Dominator': 'dominator',
  'Mastermind': 'mastermind',
  'Peacebringer': 'peacebringer',
  'Scrapper': 'scrapper',
  'Sentinel': 'sentinel',
  'Stalker': 'stalker',
  'Tanker': 'tanker',
  'Warshade': 'warshade',
}

export class CoHBuildFileParser implements Parser {
  private _badges: Partial<Record<string, string>> = {}

  constructor(content: CohContentDatabase) {
    for (const badge of content.badges) {
      this._badges[badge.gameId.primal.toLowerCase()] = badge.key
      if (badge.gameId.praetorian) {
        this._badges[badge.gameId.praetorian.toLowerCase()] = badge.key
      }
    }
  }

  public async onText(text: string): Promise<ParserResponse> {
    let readingBadges = false
    if (ID_RE.test(text)) {
      const parsedChar: Partial<Character> = produce<Partial<Character>>({}, (draft) => {
        draft.badges = {}
        for (const line of text.split(/\r?\n/)) {

          if (!readingBadges) {
            const idMatch = ID_RE.exec(line)
            if (idMatch) {
              draft.name = idMatch[1]
              draft.archetypeKey = archetypes[idMatch[2]]
            }

            if (BADGE_START_RE.test(line)) {
              readingBadges = true
            }
          } else {
            const badgeKey = this._badges[line.toLowerCase()]
            if (badgeKey) {
              draft.badges[badgeKey] = { owned: true }
            }
          }
        }
      })

      return {
        tags: ['build'],
        characters: [parsedChar]
      }
    }
  }
}
