'use strict'

const delay = require('../src/delay')
const assert = require('assert')
const sinon = require('sinon')

describe('delay', () => {
  it("should delay request if NODE_ENV is 'develop' and 'Delay' header is passed", () => {
    const timeoutFunction = sinon.spy()
    const middleware = delay({ timeoutFunction, currentEnv: 'development' })
    const req = { headers: { delay: '3000' } }
    const res = {}
    const next = () => { }

    middleware(req, res, next)
    assert(timeoutFunction.calledOnceWith(next, 3000))
  })

  it("should not delay request if NODE_ENV is not 'development'", () => {
    const timeoutFunction = sinon.spy()
    const middleware = delay({ timeoutFunction, currentEnv: 'production' })
    const req = { headers: { delay: '3000' } }
    const res = {}
    const next = sinon.spy()

    middleware(req, res, next)
    assert(timeoutFunction.notCalled)
    assert(next.called)
  })

  it("should not delay request if 'Delay' header is not present", () => {
    const timeoutFunction = sinon.spy()
    const middleware = delay({ timeoutFunction, currentEnv: 'development' })
    const req = { headers: { } }
    const res = {}
    const next = sinon.spy()

    middleware(req, res, next)
    assert(timeoutFunction.notCalled)
    assert(next.called)
  })
})
