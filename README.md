# Kunsul 📝

A logging utility that is designed to be **ignored by build tools** in production by toggling the `KUNSUL_DEBUG` constant.

---

## How It Works ⚙️

- In **development**, set `KUNSUL_DEBUG = true` to enable logs.  
- In **production**, set `KUNSUL_DEBUG = false` and build tools (like Webpack, Vite, Rollup, etc.) can eliminate logging calls during tree-shaking/minification.  
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
globalThis.KUNSUL_DEBUG = true; // you can toggle this in your build tool
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