import { FC } from 'react'
import Markdown from 'react-markdown'

const BadgeMarkdown: FC<{ content?: string }> = ({ content }) => {
  return <Markdown>
    {content}
  </Markdown>
}

export default BadgeMarkdown
