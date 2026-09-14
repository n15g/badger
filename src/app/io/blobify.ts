type BlobifyResult =
  | { gzip: true, extension: '.json.gz', mime: 'application/gzip', blob: Blob }
  | { gzip: false, extension: '.json', mime: 'application/json', blob: Blob }

export async function blobify(context: {
  payload: unknown,
  pretty?: boolean,
  gzip?: boolean
}): Promise<BlobifyResult> {
  const { payload, pretty = true, gzip = true } = context

  const json = JSON.stringify(payload, null, pretty ? 2 : undefined)

  if (!gzip) {
    return {
      gzip: false,
      extension: '.json',
      mime: 'application/json',
      blob: new Blob([json], { type: 'application/json' }),
    }
  }

  const gzStream = new Blob([json]).stream().pipeThrough(new CompressionStream('gzip'))
  const gzBlob = await new Response(gzStream).blob()

  return {
    gzip: true,
    extension: '.json.gz',
    mime: 'application/gzip',
    blob: new Blob([gzBlob], { type: 'application/gzip' }),
  }
}
