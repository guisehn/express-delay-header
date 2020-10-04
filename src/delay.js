'use strict'

function delay ({
  headerName = 'delay',
  nodeEnv = 'development',
  timeoutFunction = setTimeout,
  currentEnv = process.env.NODE_ENV
} = {}) {
  headerName = headerName.toLowerCase()
  if (!Array.isArray(nodeEnv)) {
    nodeEnv = [nodeEnv]
  }

  return (req, _, next) => {
    if (headerName in req.headers && nodeEnv.includes(currentEnv)) {
      const delay = Number(req.headers[headerName])
      if (isNaN(delay) || delay < 0) {
        next(new Error('Invalid delay header value'))
      } else {
        timeoutFunction(next, delay)
      }
    } else {
      next()
    }
  }
}

module.exports = delay
