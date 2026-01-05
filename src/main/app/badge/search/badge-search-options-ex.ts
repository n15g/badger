import { BadgeSearchOptions } from 'coh-content-db'

export interface BadgeSearchOptionsEx extends BadgeSearchOptions {
  readonly filter?: BadgeSearchOptions['filter'] & {
    readonly owned?: boolean;
  }
}
