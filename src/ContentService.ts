import { CohContentDatabase } from 'coh-content-db'
import { HOMECOMING } from 'coh-content-db-homecoming'

class ContentService {
  #db?: CohContentDatabase

  init() {
    this.#db = new CohContentDatabase(HOMECOMING)
  }

  get db(): CohContentDatabase {
    if (!this.#db) {
      throw new Error('DB not initialized')
    }
    return this.#db
  }
}

export default new ContentService()
