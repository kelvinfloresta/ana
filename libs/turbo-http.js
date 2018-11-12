/**
 * turbo-http module integration
 *
 * @see https://github.com/mafintosh/turbo-http
 */

const util = require('util')
const EventEmitter = require('events')
const turbo = require('turbo-http')

// extending turbo-http Response class
const Response = require('turbo-http/lib/response')
util.inherits(Response, EventEmitter)

const server = module.exports = turbo.createServer()
// populating req.headers for backward compatibility
server.on('request', (req, res) => {
  setImmediate(() => {
    if (!req.headers) {
      var headers = req.getAllHeaders();
      if (headers instanceof Map) {
        req.headers = {};
        headers.forEach(function (v, k) {
          req.headers[k] = v;
        })
      }
      else {
        req.headers = headers;
      }
    }
  })
})
