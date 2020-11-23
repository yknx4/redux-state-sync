class PouchDbBroadcastChannel {
  /**
   * Creates an instance of PouchDbBroadcastChannel.
   * @param {PouchDB.Database} db
   * @memberof PouchDbBroadcastChannel
   */
  constructor(db) {
    this.$db = db
    this.$onChange = this.$db.changes({live: true, include_docs: true}).then(changes => {
      changes.results.forEach(r => this.onMessage(r.doc))
    }).catch(console.error)
  }

  postMessage(message) {
    return this.$db.put(message)
  } 

  // eslint-disable-next-line class-methods-use-this
  onMessage(message) {
    console.log('unhandled message', message)
  }

  close() {
    return this.$db.close()
  }
}

module.exports = {
  PouchDbBroadcastChannel
}