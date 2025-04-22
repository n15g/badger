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
import { FaMedal, FaSpinner } from 'react-icons/fa'
import { GrDocumentMissing } from 'react-icons/gr'
import { GoChevronLeft, GoChevronRight, GoMoveToEnd, GoMoveToStart } from 'react-icons/go'
import { RxReset } from 'react-icons/rx'

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

  Cross: MdClose,
  Alert: MdWarning,
  Reset: RxReset,
  Check: MdCheck,
  Copy: MdContentCopy,
  Search: MdSearch,
  Spinner: FaSpinner,
  Missing: GrDocumentMissing,

  Prev: GoChevronLeft,
  Next: GoChevronRight,
  First: GoMoveToStart,
  Last: GoMoveToEnd,
}
