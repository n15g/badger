import { FC, useCallback, useState } from 'react'
import { Box, Stack, Typography, useTheme } from '@mui/joy'
import { FileRejection, useDropzone } from 'react-dropzone'
import Spinner from '../util/Spinner.tsx'
import { Icons } from '../util/Icons.tsx'
import { FileImportResult, importFiles } from './importer.ts'

const ImportDropzone: FC<{ onParse?: (result: FileImportResult[]) => void }>
  = ({ onParse }) => {

  const [loading, setLoading] = useState(false)
  const theme = useTheme()

  const onDrop = useCallback((files: File[], fileRejections: FileRejection[]) => {
    setLoading(true)

    void importFiles(files).then((next) => {
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

  }, [onParse])

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
