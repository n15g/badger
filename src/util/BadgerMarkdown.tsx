import { FC } from 'react'
import Markdown from 'react-markdown'

const BadgerMarkdown: FC<{ content?: string }> = ({ content }) => {
  return <Markdown>
    {content}
  </Markdown>
}

export default BadgerMarkdown
