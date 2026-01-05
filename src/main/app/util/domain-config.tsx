import homecomingLogo from '../../resources/images/logo/homecoming.png'
import paragonLogo from '../../resources/images/logo/paragon-wiki.png'
import { ReactElement } from 'react'
import { FaGithub } from 'react-icons/fa'

interface DomainConfig {
  host: string;
  decorator: ReactElement
}

const DOMAINS: DomainConfig[] = [
  { host: 'homecoming.wiki', decorator: <img src={homecomingLogo} alt={'Homecoming Wiki'} style={{ height: '1.2em' }}/> },
  { host: 'forums.homecomingservers.com', decorator: <img src={homecomingLogo} alt={'Homecoming Forums'} style={{ height: '1.2em' }}/> },
  { host: 'archive.paragonwiki.com', decorator: <img src={paragonLogo} alt="Paragin Wiki"/> },
  { host: 'github.com', decorator: <FaGithub/> },
]

export function getDomainConfig(host: string): DomainConfig | undefined {
  return DOMAINS.find(domain => {
    if (host.toLowerCase().startsWith(domain.host)) {
      return true
    }
  })
}
