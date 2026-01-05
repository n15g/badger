import { Fragment, Key, ReactNode } from 'react'

interface NaturalListProps<T extends Key> {
  keys: T[],
  renderFn?: (key: T) => ReactNode,
  conjunction?: 'and' | 'or',
  cap?: number,
}

const NaturalList = <T extends Key, >(
  { keys, renderFn = (key) => <>{key}</>, conjunction = 'and', cap, }: NaturalListProps<T>
) => {
  const list = keys.slice(0, cap ?? keys.length)
  const capped = cap && keys.length > cap
  const delta = keys.length - list.length

  return (<>
    {list.map((key, $i) => (
      <Fragment key={key}>
        {renderFn(key)}
        {$i < list.length - (capped ? 1 : 2) && ', '}
        {!capped && $i === list.length - 2 && ` ${conjunction} `}
      </Fragment>
    ))}
    {capped && (<>
      {` (${conjunction} ${delta} ${conjunction === 'and' ? 'more' : 'others'})`}
    </>)}
  </>)
}

export default NaturalList
