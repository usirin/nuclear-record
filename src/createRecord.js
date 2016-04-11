import mapValues from 'lodash.mapvalues'
import { Map, Record } from 'immutable'
import { createModule } from 'nuclear-module'

export default function createRecord(config = {}, name = anon()) {

  const withNamespace = (value) => `@@nuclear-record/${name}/${value}`

  const StateRecord = Record(config, withNamespace('StateRecord'))
  const storeName = withNamespace('RecordStore')

  const SET_ACTION = withNamespace('actions/SET')
  const REMOVE_ACTION = withNamespace('actions/REMOVE')

  let Module = createModule(name, {
    stores: {
      [storeName]: {
        getInitialState() { return new StateRecord },
        initialize() {
          this.on(SET_ACTION, (state, {key, value}) => state.set(key, value))
          this.on(REMOVE_ACTION, (state, {key}) => state.remove(key))
        }
      }
    },
    actions: {
      set: ({dispatch}) => (key, value) => dispatch(SET_ACTION, {key, value}),
      remove: ({dispatch}) => (key) => dispatch(REMOVE_ACTION, {key})
    },
    getters: mapValues(config, (val, key) => [storeName, key])
  })

  return Module
}

let id = 0
const anon = () => `AnonymousModule(${id++})`
