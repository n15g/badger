import { FC } from 'react'
import Markdown from 'react-markdown'
import MarkdownUrlTransform from './MarkdownUrlTransform.tsx'
import SmartLink from './SmartLink.tsx'

const BadgerMarkdown: FC<{ content?: string }> = ({ content }) => {
  return <Markdown
    urlTransform={MarkdownUrlTransform}
    components={{
      a: function(props) {
        return props.href ? <SmartLink href={props.href}>{props.children}</SmartLink> : undefined
      }
    }}>
    {content}
  </Markdown>
}

export default BadgerMarkdown
