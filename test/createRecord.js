import expect from 'expect'
import {Reactor} from 'nuclear-js'

import createRecord from '../src/createRecord'

describe('createRecord()', () => {
  it('creates a record module', () => {
    const FooRecord = createRecord({
      foo: ''
    })
    const foo = FooRecord(new Reactor)
    foo.actions.set('foo', 'bar')

    expect(foo.getters.foo()).toBe('bar')
  })

  it('should only set defined keys', () => {
    const FooRecord = createRecord({
      foo: ''
    })
    const foo = FooRecord(new Reactor)


    expect(() => foo.actions.set('baz', 'qux')).toThrow()
  })

  it('should set the default to a key when its value is removed', () => {
    const FooRecord = createRecord({
      foo: ''
    })
    const foo = FooRecord(new Reactor)

    foo.actions.set('foo', 'bar')
    expect(foo.getters.foo()).toBe('bar')

    foo.actions.remove('foo')
    expect(foo.getters.foo()).toBe('')
  })

})
