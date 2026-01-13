import { FC, useCallback, useState } from 'react'
import { Box, Button, Modal, ModalClose, ModalDialog, Stack, Step, StepIndicator, Stepper, Typography } from '@mui/joy'
import SettitleScriptHelpLink from './/SettitleScriptHelpLink.tsx'
import { Icons } from '../util/Icons.tsx'
import FileImportResultSummary from './FileImportResultSummary.tsx'
import { FileImportResult } from './importer.ts'
import ImportDropzone from './ImportDropzone.tsx'
import { DefaultColorPalette, VariantKey } from '@mui/joy/styles/types'
import EditCharacterImportPlan from './EditCharacterImportPlan.tsx'
import { buildCharacterImportPlan, CharacterImportPlan } from './character-import-plan.ts'
import { applyPartial, Character, fromPartial } from '../character/character.ts'
import CharacterDbProvider from '../character/CharacterDbProvider.tsx'
import Spinner from '../util/Spinner.tsx'
import BadgerSpinner from '../util/BadgerSpinner.tsx'

const ImportCharactersModal: FC<{ open: boolean, onClose: () => void }>
  = ({ open, onClose }) => {

  const { characters, createCharacter, mutateCharacter, deleteCharacter } = CharacterDbProvider.useCharacterDb()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [fileImportResults, setFileImportResults] = useState<FileImportResult[]>()
  const [characterImportPlan, setCharacterImportPlan] = useState<CharacterImportPlan>()

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

  const reset = useCallback(() => {
    setFileImportResults(undefined)
    setCharacterImportPlan(undefined)
    setStep(1)
  }, [])

  const completeImport = useCallback(async () => {
    setLoading(true)
    try {
      for (const [key, { incoming, existing, action }] of Object.entries(characterImportPlan ?? {})) {
        if (!existing || action === 'new') {
          if (action !== 'ignore') {
            await createCharacter(fromPartial({ key: key, ...incoming }))
          }
        } else {
          if (action === 'replace') {
            await deleteCharacter(existing.key)
            await createCharacter(fromPartial({ key: key, ...incoming }))
          } else if (action === 'merge') {
            await mutateCharacter(existing.key, applyPartial(existing))
          }
        }
      }
      reset()
      onClose()
    } finally {
      setLoading(false)
    }
  }, [characterImportPlan, createCharacter, deleteCharacter, mutateCharacter, onClose, reset])

  return open && (<>
    <Modal
      open={open}
      onClose={() => {
        reset()
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

          {/* STEP 1 */}
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

          {/* STEP 2 */}
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
                  const incoming = fileImportResults?.reduce<Partial<Character>[]>((acc, result) => {
                    return [...acc, ...(result.characters ?? [])]
                  }, []) ?? []
                  setCharacterImportPlan(buildCharacterImportPlan(incoming, characters))
                  setStep(3)
                }}>Next</Button>
            </Stack>
          </>)}

          {/* STEP 3 */}
          {step === 3 && (<>
            {!loading && (
              <EditCharacterImportPlan value={characterImportPlan} onNewValue={(next) => {
                setCharacterImportPlan(next)
              }}/>
            )}
              {loading && (
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  gap: 2,
                  minHeight: 200,
                  minWidth: 400
                }}>
                  <BadgerSpinner style={{ height: 128, padding: '2em' }}/>
                  Working...
                </Box>
              )}

              <Stack direction="row" justifyContent="space-between">
                <Button
                  startDecorator={<Icons.Prev/>}
                  onClick={() => {
                    setStep(2)
                  }}
                >Back</Button>
                <Button
                  color="success"
                  disabled={loading}
                  endDecorator={<Icons.Next/>}
                  onClick={() => {
                    void completeImport()
                  }}>
                  {!loading ? <>Done</> : <Spinner/>}
                </Button>
              </Stack>
          </>)}
        </Box>
      </ModalDialog>
    </Modal>
  </>)
}

export default ImportCharactersModal
