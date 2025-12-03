import homecomingLogo from '../../resources/images/logo/homecoming.png'
import paragonLogo from '../../resources/images/logo/paragon-wiki.png'

interface DomainConfig {
  host: string;
  logo: string,
  alt: string
}

const DOMAINS: DomainConfig[] = [
  { host: 'homecoming.wiki', logo: homecomingLogo, alt: 'Homecoming Wiki' },
  { host: 'archive.paragonwiki.com', logo: paragonLogo, alt: 'Paragon Wiki' }
]

export function getDomainConfig(host: string): DomainConfig | undefined {
  return DOMAINS.find(domain => {
    if (host.toLowerCase().startsWith(domain.host)) {
      return true
    }
  })
}
