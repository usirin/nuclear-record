# nuclear-record

Flux as a data structure.

### What?

Sometimes you need a simple flux store with only setting/removing data.
`nuclear-record` does that for you.

```js
import { Reactor } from 'nuclear-js'
import { createRecord } from 'nuclear-record'

// Use a structured Record Module as a data structure.
const Counter = createRecord({
  count: 0
}, 'Counter')

const counter = Counter(new Reactor)

// increment
counter.actions.set(counter.getters.count() + 1)
```

# install

```
npm install nuclear-record
```

# licence

MIT

