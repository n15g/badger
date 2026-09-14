import { FC, useCallback, useState } from 'react'
import { Switch, SwitchProps } from '@mui/joy'
import Spinner from './Spinner.tsx'

const AsyncSwitch: FC<{ checked?: boolean, onFrobnicate?: (value: boolean) => Promise<void> } & SwitchProps> =
  ({ checked, onFrobnicate, ...props }) => {
    const [busy, setBusy] = useState(false)

    const frobnicate = useCallback(async () => {
      if (busy) {
        return
      }

      setBusy(true)
      try {
        await onFrobnicate?.(!checked)
      } finally {
        setBusy(false)
      }
    }, [checked, busy, onFrobnicate])

    return (
      <Switch
        {...props}
        checked={checked ?? false}
        onChange={() => void frobnicate()}
        disabled={busy}
        slotProps={{
          thumb: {
            children: busy ? <Spinner/> : undefined,
          },
        }}
      />
    )
  }

export default AsyncSwitch
