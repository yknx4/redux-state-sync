'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PouchDB = require('pouchdb');

var PouchDbBroadcastChannel = function () {
  /**
   * Creates an instance of PouchDbBroadcastChannel.
   * @param {string} db
   * @param {PouchDB.Configuration.DatabaseConfiguration} options
   * @memberof PouchDbBroadcastChannel
   */
  function PouchDbBroadcastChannel(db, options) {
    var _this = this;

    _classCallCheck(this, PouchDbBroadcastChannel);

    this.$db = new PouchDB(db, options);
    this.$onChange = this.$db.changes({ live: true, include_docs: true }).then(function (changes) {
      changes.results.forEach(function (r) {
        return _this.onMessage(r.doc);
      });
    }).catch(console.error);
  }

  _createClass(PouchDbBroadcastChannel, [{
    key: 'postMessage',
    value: function postMessage(message) {
      return this.$db.put(message);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'onMessage',
    value: function onMessage(message) {
      console.log('unhandled message', message);
    }
  }, {
    key: 'close',
    value: function close() {
      return this.$db.close();
    }
  }]);

  return PouchDbBroadcastChannel;
}();

module.exports = {
  PouchDbBroadcastChannel: PouchDbBroadcastChannel
};