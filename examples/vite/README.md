## Config - VANILLA VITE

- vite.config.ts

**KUNSUL_IGNORE_IN_BUILD** is added in define, essentially if in ***production*** mode it's true otherwise false(ingored in build)

```ts
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  return {
    define: {
     KUNSUL_IGNORE_IN_BUILD: JSON.stringify(mode === "production"),
    },
  };
});

```


## Usage

- [Refer to this example](https://github.com/koribot/kunsul/blob/main/examples/vite/src/counter.ts) - src/counter.ts

```ts
import kunsul from 'kunsul'

export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
    kunsul.log(`count is ${counter}`)
  }
  element.addEventListener('click', () => setCounter(counter + 1))
  setCounter(0)
}
```

***It is basically a console.log wrapper but ignored in build***