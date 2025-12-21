// noinspection JSUnusedGlobalSymbols

import NotesBlock from './NotesBlock.tsx'
import { Meta, StoryObj } from '@storybook/react-vite'

const meta: Meta<typeof NotesBlock> = {
  title: 'util/NotesBlock',
  component: NotesBlock,
}
export default meta
type StoryType = StoryObj<typeof meta.component>

export const Long: StoryType = {
  args: {
    notes: `Lorem ipsum dolor sit amet,[atlas-park](zone://atlas-park) consectetur adipiscing elit. Sed ornare diam sit amet tellus iaculis scelerisque.
Proin semper pharetra magna at rhoncus. Etiam iaculis id eros eu posuere. Quisque ut elit semper, dictum est at, dictum est.
Nullam vel interdum justo, quis luctus lectus. Morbi bibendum tempus aliquet. Cras blandit tristique euismod.
Sed ut congue urna, sed sagittis enim. Vestibulum eu lacus laoreet, lacinia purus in, rutrum quam.

Sed hendrerit faucibus congue. Integer interdum viverra tellus, sed cursus risus condimentum vitae.
Nullam sodales, mi vel congue egestas, nibh dui vehicula massa, vel viverra mauris lorem vitae justo. Aliquam erat volutpat.
Nullam vel iaculis tellus, ut viverra ligula. In sit [atlas-park](badge://hangman) amet justo convallis, condimentum lacus nec.
Curabitur vitae pellentesque nisl. Cras porttitor maximus nisi nec mattis.

Aenean maximus eros ante, ut lacinia dolor tincidunt id. Integer rutrum risus ut nisl elementum, et fringilla felis lobortis.
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut blandit sem.
Fusce viverra dolor cursus, interdum felis non, venenatis tellus.
Morbi sit amet orci ipsum. Integer et orci quis purus pharetra lobortis ut quis odio.
Curabitur risus dui, sollicitudin ut ipsum fringilla, rhoncus aliquam enim.`
  },
}

export const None: StoryType = {}
