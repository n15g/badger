import { defaultUrlTransform, UrlTransform } from 'react-markdown'

const ALLOWED_PROTOCOLS = ['badge:', 'zone:', 'contact:']
const MarkdownUrlTransform: UrlTransform = (url) => {
  try {
    const urlApi = new URL(url)

    if (ALLOWED_PROTOCOLS.includes(urlApi.protocol)) {
      return url
    }
  } catch {
    return defaultUrlTransform(url)
  }
}

export default MarkdownUrlTransform
