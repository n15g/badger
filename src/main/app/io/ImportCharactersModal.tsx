import { FC, useCallback, useState } from 'react'
import { Box, Button, Modal, ModalClose, ModalDialog, Stack, Step, StepIndicator, Stepper, Typography } from '@mui/joy'
import SettitleScriptHelpLink from './/SettitleScriptHelpLink.tsx'
import { Icons } from '../util/Icons.tsx'
import FileImportResultSummary from './FileImportResultSummary.tsx'
import { FileImportResult } from './importer.ts'
import ImportDropzone from './ImportDropzone.tsx'
import { DefaultColorPalette, VariantKey } from '@mui/joy/styles/types'

const ImportCharactersButton: FC<{ open: boolean, onClose: () => void }>
  = ({ open, onClose }) => {

  const [step, setStep] = useState(1)
  const [fileImportResults, setFileImportResults] = useState<FileImportResult[]>()

  const renderStep = useCallback((idx: number, label: string) => {
    let variant: VariantKey = 'outlined'
    let color: DefaultColorPalette = 'primary'
    if (step === idx) {
      variant = 'solid'
    } else if (idx < step) {
      variant = 'solid'
      color = 'success'
    }
    return (
      <Step
        indicator={
          <StepIndicator
            color={color}
            variant={variant}>
            {idx < step ? <Icons.Check/> : idx}
          </StepIndicator>
        }>
        {label}
      </Step>
    )
  }, [step])

  return (<>
    {open && (<Modal
        open={open}
        onClose={() => {
          onClose()
        }}>
        <ModalDialog>
          <ModalClose/>
          <Box>
            <Typography level="title-lg">Import Characters</Typography>

            <Stepper sx={{ m: 2 }}>
              {renderStep(1, 'Upload')}
              {renderStep(2, 'Review Files')}
              {renderStep(3, 'Review Characters')}
            </Stepper>

            {step === 1 && (<>
              <Typography>You can import characters into the app by uploading the following types of files:</Typography>
              <ul>
                <li>Previously exported characters as <code>.json</code> or <code>.json.gz</code> files.</li>
                <li>CoH game log files that contain output from the <SettitleScriptHelpLink/>.</li>
                <li>Badger 1 character exports saved to <code>.txt</code> files.</li>
              </ul>

              <ImportDropzone onParse={(result) => {
                setFileImportResults(result)
                setStep(2)
              }}/>
            </>)}
            {step === 2 && (<>

              <FileImportResultSummary fileImportResults={fileImportResults}/>

              <Stack direction="row" justifyContent="space-between">
                <Button
                  startDecorator={<Icons.Prev/>}
                  onClick={() => {
                    setStep(1)
                  }}
                >Back</Button>
                <Button
                  endDecorator={<Icons.Next/>}
                  onClick={() => {
                    setStep(2)
                  }}>Next</Button>
              </Stack>
            </>)}
          </Box>
        </ModalDialog>
      </Modal>
    )}
  </>)
}

export default ImportCharactersButton
