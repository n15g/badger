import { defaultUrlTransform, UrlTransform } from 'react-markdown'

const ALLOWED_PROTOCOLS = ['badge:', 'zone:', 'contact:', 'mission:']
const MarkdownUrlTransform: UrlTransform = (url) => {
  try {
    const urlApi = new URL(url)

    if (ALLOWED_PROTOCOLS.includes(urlApi.protocol)) {
      return url
    }
  } catch { /* empty */
  }
  return defaultUrlTransform(url)

}

export default MarkdownUrlTransform
