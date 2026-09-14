import { CohContentDatabase } from 'coh-content-db'

// Small, explicit fixtures keep parser behavior independent of Homecoming content updates.
export function createTestContent() {
  return new CohContentDatabase({
    header: { name: 'Test content', version: '1.0.0', lastUpdateTime: '2026-01-01T00:00:00Z' },
    badges: [
      {
        key: 'explorer', gameId: ['Explore_Primal', 'Explore_Praetorian'], type: 'exploration',
        name: [{ value: 'Explorer', sex: 'M' }, { value: 'Trailblazer', sex: 'F' }],
        releaseDate: '2026-01-01',
      },
      {
        key: 'veteran', gameId: 'Veteran', type: 'achievement', name: 'Veteran', releaseDate: '2026-01-01',
      },
    ],
  })
}
