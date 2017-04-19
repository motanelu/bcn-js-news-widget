const fs = require('fs')
const express = require('express')
const path = require('path')

const e404 = (request, response) => {
  response
    .status(404)
    .send(JSON.stringify({ 'error': `URL '${request.url}' is not mapped to any file` }))
}

const server = express()

/**
 * Enable CORS and whitelist common headers
 */
server.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept'].join(',')
  )

  next()
})

/**
 * Map the server's /dist path to the build folder
 */
server.use('/dist', express.static(path.join(__dirname, '../../dist/')))

/**
 * Map the server's /static path to the
 */
server.use('/static', express.static(path.join(__dirname, 'server', 'static')))

/**
 * URLs starting with /mock/{test-name} are used for mocking API responses
 *
 * The server will load the configuration ./fixtures/{test-name}/urls.config.js
 * and will try to match the request to a JSON mock
 */
server.all(/^\/mock\/.+/, (request, response) => {
  const parts = request.url.split('/').filter(item => item)
  const urlConfigFile = path.join(__dirname, 'server', 'fixtures', parts[1], 'urls.config.js')

  if (!fs.existsSync(urlConfigFile)) {
    return e404(request, response)
  }

  const urlConfig = require(urlConfigFile)
  const url = parts.slice(2).join('/')
  const config = urlConfig.find(item => typeof item.url === 'string' ? item.url === url : item.url.test(url))

  if (!config) {
    return e404(request, response)
  }

  const file = path.join(__dirname, 'server', 'fixtures', parts[1], config.file)

  fs.readFile(file, 'utf8', (error, content) => {
    if (error) {
      response
        .status(500)
        .send(JSON.stringify({
          error: 'The requested file could not be read',
          stacktrace: error
        }))
    } else {
      response
        .status(config.status)
        .send(content)
    }
  })
})

/**
 * In case that the server is already running for debugging purposes
 * when the test runner starts and can't bind a new instance on port
 * 9000, it will attempt to ping this url and in the response is the
 * expected one it will run the tests
 */
server.get('/ping', (request, response) => {
  response
    .status(200)
    .header('Content-Type', 'application/json')
    .send(JSON.stringify({'pong': 'bcn-js-news-widget'}))
})

module.exports = server
