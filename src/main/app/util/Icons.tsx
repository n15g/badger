import {
  MdCheck,
  MdClose,
  MdContentCopy,
  MdGroups,
  MdLocalPolice,
  MdMenuBook,
  MdOutlineHistory,
  MdPersonPin,
  MdSearch,
  MdWarning
} from 'react-icons/md'
import { PiCompassRoseFill, PiGenderFemale, PiGenderMale } from 'react-icons/pi'
import { FaMedal, FaSortAlphaDownAlt, FaSortAlphaUp, FaSpinner } from 'react-icons/fa'
import { GrDocumentMissing } from 'react-icons/gr'
import { GoChevronLeft, GoChevronRight, GoMoveToEnd, GoMoveToStart } from 'react-icons/go'
import { RxReset } from 'react-icons/rx'
import { BiSortAlt2 } from 'react-icons/bi'
import { Sex } from 'coh-content-db'
import { ReactNode } from 'react'

/**
 * Use icons from here for consistency across the app
 */
export const Icons = {
  Zone: PiCompassRoseFill,
  Badge: FaMedal,
  Contact: MdPersonPin,

  Mission: MdOutlineHistory,
  Arc: MdMenuBook,
  Group: MdGroups,

  Morality: MdLocalPolice,

  Male: PiGenderMale,
  Female: PiGenderFemale,

  forSex: (sex?: Sex): ReactNode => {
    if (sex === 'M') {
      return <Icons.Male/>
    } else if (sex === 'F') {
      return <Icons.Female/>
    }
    return undefined
  },

  Cross: MdClose,
  Alert: MdWarning,
  Reset: RxReset,
  Check: MdCheck,
  Copy: MdContentCopy,
  Search: MdSearch,
  Spinner: FaSpinner,
  Missing: GrDocumentMissing,

  Sort: BiSortAlt2,
  Asc: FaSortAlphaUp,
  Desc: FaSortAlphaDownAlt,

  Prev: GoChevronLeft,
  Next: GoChevronRight,
  First: GoMoveToStart,
  Last: GoMoveToEnd,
}
