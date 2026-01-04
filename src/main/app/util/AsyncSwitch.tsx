import { FC, useCallback, useState } from 'react'
import { Switch, SwitchProps } from '@mui/joy'
import Spinner from './Spinner.tsx'

const AsyncSwitch: FC<{ onFrobnicate?: (value: boolean) => Promise<void> } & SwitchProps> =
  ({ onFrobnicate, ...props }) => {
    const [loading, setLoading] = useState(false)
    const [innerChecked, setInnerChecked] = useState(props.checked ?? false)

    const frobnicate = useCallback(async () => {
      if (loading) {
        return
      }

      setLoading(true)
      const next = !innerChecked

      try {
        await onFrobnicate?.(next)
        setInnerChecked(next)
      } finally {
        setLoading(false)
      }
    }, [innerChecked, loading, onFrobnicate])

    return (
      <Switch
        {...props}
        checked={innerChecked}
        onChange={() => void frobnicate()}
        disabled={loading}
        slotProps={{
          thumb: {
            children: loading ? <Spinner/> : undefined,
          },
        }}
      />
    )
  }

export default AsyncSwitch
