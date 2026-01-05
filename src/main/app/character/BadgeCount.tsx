import { FC } from 'react'
import { Character } from './character.ts'
import ContentProvider from '../content/ContentProvider.tsx'

const BadgeCount: FC<{ character: Character }> = ({ character }) => {
  const content = ContentProvider.useContent()

  const count = content.badges.reduce((acc, badge) => {
    return (!badge.ignoreInTotals && character.badges?.[badge.key]?.owned) ? ++acc : acc
  }, 0)

  return <>{count} badge{count !== 1 ? 's' : ''}</>
}

export default BadgeCount
