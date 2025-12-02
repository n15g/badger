import { FC } from 'react'
import Markdown from 'react-markdown'
import MarkdownUrlTransform from './MarkdownUrlTransform.tsx'
import { NavLink } from 'react-router'
import ErrorText from './ErrorText.tsx'

const BadgerMarkdown: FC<{ content?: string }> = ({ content }) => {
  return <Markdown
    urlTransform={MarkdownUrlTransform}
    components={{
      a: function(props) {
        try {
          const url = new URL(props.href ?? '')

          switch (url.protocol) {
            case 'badge:':
              return <NavLink to={`/badges/${url.host}`}>{url.host}</NavLink>
          }

          return <strong>{props.href}XX</strong>
        } catch {
          return <ErrorText>[unsupported link]</ErrorText>
        }
      }
    }}>
    {content}
  </Markdown>
}

export default BadgerMarkdown
