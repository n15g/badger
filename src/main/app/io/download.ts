export function startDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  try {
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.rel = 'noopener'
    a.click()
  } finally {
    // Revoke the URL once the browser has had a chance to start download - prevents race conditions in some browsers.
    setTimeout(() => {
      URL.revokeObjectURL(url)
    }, 1000)
  }
}
