import { FC, ReactNode } from 'react'
import { Link, Typography } from '@mui/joy'
import BadgeLink from '../badge/BadgeLink.tsx'
import { getDomainConfig } from './ExternalDomains.ts'
import ZoneLink from '../zone/ZoneLink.tsx'
import ContactLink from '../contact/ContactLink.tsx'
import MissionLink from '../mission/MissionLink.tsx'
import { Icons } from './Icons.tsx'

const SmartLink: FC<{ href: string, children: ReactNode }> = ({ href, children }) => {

  let url
  try {
    url = new URL(href)
  } catch {
    return <Link href={href}>{children}</Link>
  }

  if (url.protocol === 'badge:') {
    return <BadgeLink value={url.host}/>
  } else if (url.protocol === 'contact:') {
    return <ContactLink value={url.host}/>
  } else if (url.protocol === 'mission:') {
    return <MissionLink value={url.host}/>
  } else if (url.protocol === 'zone:') {
    return <ZoneLink value={url.host}/>
  }

  const domainConfig = getDomainConfig(url.host)
  const icon = domainConfig
    ? <img src={domainConfig.logo} alt={domainConfig.alt} title={domainConfig.alt} height={16} style={{ paddingLeft: 4 }}/>
    : <Icons.ExternalLink height={16} style={{ paddingLeft: 4 }}/>

  return (
    <Typography component="span">
      <Link href={href} endDecorator={icon}>
        {children}
      </Link>
    </Typography>
  )
}

export default SmartLink
