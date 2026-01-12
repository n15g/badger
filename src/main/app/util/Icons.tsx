import {
  MdAdd,
  MdContentCopy,
  MdDelete,
  MdDownload,
  MdEdit,
  MdHelp,
  MdInfo,
  MdLocalPolice,
  MdLocationOn,
  MdSearch,
  MdUpload,
  MdWarning
} from 'react-icons/md'
import { PiGenderFemale, PiGenderMale } from 'react-icons/pi'
import { FaAward, FaCheck, FaExternalLinkAlt, FaSortAlphaDownAlt, FaSortAlphaUp, FaSpinner, FaTimes } from 'react-icons/fa'
import { GrDocumentMissing, GrGallery } from 'react-icons/gr'
import { GoChevronLeft, GoChevronRight, GoMoveToEnd, GoMoveToStart } from 'react-icons/go'
import { RxChevronRight, RxReset } from 'react-icons/rx'
import { BiChevronDown, BiSortAlt2 } from 'react-icons/bi'
import { IoMdCheckboxOutline } from 'react-icons/io'
import { TbCalendarStar, TbLabel, TbLink, TbNotes } from 'react-icons/tb'
import { BsPersonCircle, BsPersonVcard } from 'react-icons/bs'
import { ImTarget } from 'react-icons/im'
import { FaDatabase } from 'react-icons/fa6'

/**
 * Use icons from here for consistency across the app
 */
export const Icons = {
  Zone: MdLocationOn,
  Badge: FaAward,
  Contact: BsPersonCircle,
  Mission: ImTarget,
  Character: BsPersonVcard,

  Morality: MdLocalPolice,

  Male: PiGenderMale,
  Female: PiGenderFemale,

  Cross: FaTimes,
  Plus: MdAdd,
  Delete: MdDelete,
  Edit: MdEdit,
  Database: FaDatabase,
  Gallery: GrGallery,
  ReleaseDate: TbCalendarStar,
  SetTitle: TbLabel,
  Alert: MdWarning,
  Reset: RxReset,
  Breadcrumb: RxChevronRight,
  Check: FaCheck,
  Copy: MdContentCopy,
  Search: MdSearch,
  Spinner: FaSpinner,
  Missing: GrDocumentMissing,
  Link: TbLink,
  ChevronDown: BiChevronDown,
  ExternalLink: FaExternalLinkAlt,
  Acquisition: IoMdCheckboxOutline,
  Notes: TbNotes,
  Download: MdDownload,
  Upload: MdUpload,
  Help: MdHelp,
  Info: MdInfo,

  Sort: BiSortAlt2,
  Asc: FaSortAlphaUp,
  Desc: FaSortAlphaDownAlt,

  Prev: GoChevronLeft,
  Next: GoChevronRight,
  First: GoMoveToStart,
  Last: GoMoveToEnd,
}
