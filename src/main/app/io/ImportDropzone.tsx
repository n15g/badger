import { FC, useCallback, useMemo, useState } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/joy'
import { FileRejection, useDropzone } from 'react-dropzone'
import Spinner from '../util/Spinner.tsx'
import { Icons } from '../util/Icons.tsx'
import { FileImportResult, importFiles } from './importer.ts'
import ContentProvider from '../content/ContentProvider.tsx'
import { CoHLogFileParser } from './parser/coh-log-file-parser.ts'
import { BadgerV1ExportFileParser } from './parser/badger-v1-export-file-parser.ts'
import { BadgerV2ExportFileParser } from './parser/badger-v2-export-file-parser.ts'

const ImportDropzone: FC<{ onParse?: (result: FileImportResult[]) => void }>
  = ({ onParse }) => {

  const content = ContentProvider.useContent()
  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const parsers = useMemo(() => {
    return [
      new CoHLogFileParser(content),
      BadgerV1ExportFileParser,
      BadgerV2ExportFileParser,
    ]
  }, [content])

  const onDrop = useCallback((files: File[], fileRejections: FileRejection[]) => {
    setLoading(true)

    void importFiles(files, parsers).then((next) => {
      const accepted = next
      const rejected = fileRejections.map(({ file, errors }) => {
        return {
          file,
          accepted: false,
          error: errors.length > 0 ? errors[0].message : undefined
        }
      })

      onParse?.([...accepted, ...rejected])
    }).finally(() => {
      setLoading(false)
    })

  }, [onParse, parsers])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, accept: {
      'application/json': ['.json'],
      'application/gzip': ['.gz'],
      'application/text': ['.txt'],
    }
  })

  return (
    <Box sx={{ minWidth: 300 }}>
      <div {...getRootProps()}
           style={{
             minHeight: 240,
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
             padding: '2em',
             cursor: 'pointer',
             border: 'dashed 2px',
             borderColor: isDragActive ? theme.vars.palette.success.outlinedBorder : theme.vars.palette.neutral.outlinedBorder,
             borderRadius: 16,
             transition: 'border .24s ease-in-out'
           }}>
        {!loading && (<>
          <input {...getInputProps()} />
          <Stack direction="row" alignItems="center" gap={2}>
            <Icons.Upload style={{ height: 64, width: 64 }}/>
            <Typography> Drop files or click to upload</Typography>
          </Stack>
        </>)}
        {loading && (<>
          <Spinner/>
        </>)}
      </div>
    </Box>
  )
}

export default ImportDropzone
