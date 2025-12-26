import { FC, ImgHTMLAttributes } from 'react'
import icon from '../../resources/images/logo/badger.svg'

const BadgerSpinner: FC<ImgHTMLAttributes<HTMLImageElement>> = ({ ...props }) => {
  return (
    <img src={icon}
         className="ld ld-clock"
         alt="Loading"
         {...props}/>
  )
}

export default BadgerSpinner
