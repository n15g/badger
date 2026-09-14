export interface BuildInfo {
  version: string
  builtAt: string
}

export const BUILD_INFO: BuildInfo = typeof __BADGER_BUILD__ === 'undefined'
  ? {
      version: 'DEV',
      builtAt: new Date().toISOString(),
    }
  : __BADGER_BUILD__
