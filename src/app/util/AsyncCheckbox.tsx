import { FC, useCallback, useState } from 'react'
import { Checkbox, CheckboxProps } from '@mui/joy'
import Spinner from './Spinner.tsx'

const AsyncCheckbox: FC<{ onFrobnicate?: (value: boolean) => Promise<void> } & CheckboxProps> =
  ({ onFrobnicate, ...props }) => {
    const [loading, setLoading] = useState(false)

    const onChange = useCallback(async (checked: boolean) => {
      setLoading(true)
      await onFrobnicate?.(checked)
      setLoading(false)
    }, [onFrobnicate])

    return (
      <Checkbox {...props} onChange={(e) => {
        void onChange(e.target.checked)
      }}
                disabled={loading}
                checkedIcon={loading ? <Spinner/> : undefined}
                uncheckedIcon={loading ? <Spinner/> : undefined}
      >
      </Checkbox>)
  }

export default AsyncCheckbox
