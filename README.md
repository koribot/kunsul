# Kunsul 📝

A logging utility that is designed to be **ignored by build tools** in production by toggling the `KUNSUL_DEBUG` constant.

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

### Usage

```ts

// for esm
import kunsul from "kunsul"
kunsul.log("hello, world")

// for cjs
globalThis.KUNSUL_IGNORE_IN_BUILD = true; // you can toggle this in your build tool by default kunsul shows all logs
const kunsul = require('kunsul');
kunsul.log('CommonJS log test');

```


### CURRENT WORKING/ACTIVE kunsul API'S

```
 kunsul.log
 kunsul.warn
 kunsul.error

```


## Plans
- expand logging capabilities
  - log,
  - info,
  - debug,
  - warn,
  - error,
  - trace,
  - group,
  - table,
  - time,
  - timeEnd,
  - fetch: fetchWithLog,
  - createLogger
  - .......