import { MdCheck, MdClose, MdContentCopy, MdLocalPolice, MdSearch, MdWarning } from 'react-icons/md'
import { PiCompassRoseFill, PiGenderFemale, PiGenderMale } from 'react-icons/pi'
import { FaAward, FaExternalLinkAlt, FaSortAlphaDownAlt, FaSortAlphaUp, FaSpinner } from 'react-icons/fa'
import { GrDocumentMissing } from 'react-icons/gr'
import { GoChevronLeft, GoChevronRight, GoMoveToEnd, GoMoveToStart } from 'react-icons/go'
import { RxChevronRight, RxReset } from 'react-icons/rx'
import { BiSortAlt2 } from 'react-icons/bi'
import { Sex } from 'coh-content-db'
import { ReactNode } from 'react'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { TbCalendarStar, TbLabel, TbNotes } from 'react-icons/tb'
import { BsPersonCircle } from 'react-icons/bs'
import { ImTarget } from 'react-icons/im'

/**
 * Use icons from here for consistency across the app
 */
export const Icons = {
  Zone: PiCompassRoseFill,
  Badge: FaAward,
  Contact: BsPersonCircle,
  Mission: ImTarget,

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
  ReleaseDate: TbCalendarStar,
  SetTitle: TbLabel,
  Alert: MdWarning,
  Reset: RxReset,
  Breadcrumb: RxChevronRight,
  Check: MdCheck,
  Copy: MdContentCopy,
  Search: MdSearch,
  Spinner: FaSpinner,
  Missing: GrDocumentMissing,
  Link: FaExternalLinkAlt,
  Acquisition: IoMdCheckboxOutline,
  Notes: TbNotes,

  Sort: BiSortAlt2,
  Asc: FaSortAlphaUp,
  Desc: FaSortAlphaDownAlt,

  Prev: GoChevronLeft,
  Next: GoChevronRight,
  First: GoMoveToStart,
  Last: GoMoveToEnd,
}
