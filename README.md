# Kunsul 📝

A simple logging utility wrapper that will be **ignored by build tools (vite, webpack, etc)** in production by toggling the `KUNSUL_IGNORE_IN_BUILD` constant.



***NOTE***
 - ESM works best in tree shaking/dead code elimination so I recommend to always use it
 - when you use ***import*** it will automatically choose ESM

---

## How It Works ⚙️

- In **development**, set `KUNSUL_IGNORE_IN_BUILD = false` to always show logs or dont set anything(by default it will always show logs).  
- In **production**, set `KUNSUL_IGNORE_IN_BUILD = true` and build tools (like Webpack, Vite, Rollup, etc.) can eliminate logging calls during tree-shaking/minification.  
- This way, you keep helpful logs while developing without shipping them into production bundles.


see [examples](https://github.com/koribot/kunsul/tree/main/examples)
to see how to integrate in build-tools
---

## Installation

```bash
npm install kunsul 
```
or
```bash
npm install kunsul --save-dev
```

### Usage

```ts

// for esm
// best for tree shaking/dead code elimination
globalThis.KUNSUL_IGNORE_IN_BUILD = true; // build-tools will ignore kunsul and will not include it in build-output
import kunsul from "kunsul"
kunsul.log("hello, world")




// for cjs
// although the logs wont show, the kunsul functions will still be in the build output due to cjs is not best for tree shaking in build-tools
globalThis.KUNSUL_IGNORE_IN_BUILD = true; // you can toggle this in your build tool by default kunsul shows all logs
const kunsul = require('kunsul');
kunsul.log('CommonJS log test');

```


### CURRENT WORKING/ACTIVE kunsul API'S

```
  kunsul.log,
  kunsul.info,
  kunsul.debug,
  kunsul.warn,
  kunsul.error,
  kunsul.group,
  kunsul.groupEnd,
  kunsul.groupCollapsed,
  kunsul.table,
  kunsul.time,
  kunsul.timeEnd,
  kunsul.count,
  kunsul.countReset,
  kunsul.trace,
  kunsul.assert,
  kunsul.clear,
  kunsul.json,
  kunsul.createLogger,

```


## Plans
- expand logging capabilities
  - fetch: fetchWithLog,
  - maybe add kunsul.prod but still debating if its usefull since you can just do console.log....
  - .......
- add more examples