import { FC, useState } from 'react'
import { Box, Button, Modal, ModalClose, ModalDialog, Stack, Step, StepIndicator, Stepper, Typography } from '@mui/joy'
import SettitleScriptHelpLink from './/SettitleScriptHelpLink.tsx'
import { Icons } from '../util/Icons.tsx'
import FileImportResultSummary from './FileImportResultSummary.tsx'
import { FileImportResult } from './importer.ts'
import ImportDropzone from './ImportDropzone.tsx'

const ImportCharactersButton: FC<{ open: boolean, onClose: () => void }>
  = ({ open, onClose }) => {

  const [step, setStep] = useState(1)
  const [fileImportResults, setFileImportResults] = useState<FileImportResult[]>()

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
              <Step
                indicator={
                  <StepIndicator
                    color="primary"
                    variant={step === 1 ? 'soft' : 'solid'}>
                    {step === 1 ? '1' : <Icons.Check/>}
                  </StepIndicator>
                }>
                Upload Files
              </Step>
              <Step>Step 2</Step>
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
