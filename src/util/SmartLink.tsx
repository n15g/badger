import { FC } from 'react'

const SmartLink: FC<{ title: string, href: string }> = ({ title, href }) => {
  return <a href={href}>{title}</a>
}

export default SmartLink
