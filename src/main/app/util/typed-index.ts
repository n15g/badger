export class TypedIndex<T extends string | symbol, V> {
  readonly index: Record<T, V>

  constructor(values: Record<T, V>) {
    this.index = values
  }

  get(key: T): V | undefined {
    return this.index[key]
  }

  get entries(): [T, V][] {
    return Object.entries(this.index) as [T, V][]
  }

  get values(): V[] {
    return Object.values(this.index)
  }
}
