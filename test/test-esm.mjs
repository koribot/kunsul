// esm works best in tree shaking so it is recommended to always use esm

// sample test in mjs environment
// true if you want this to not show in builds by default it will always show
globalThis.KUNSUL_IGNORE_IN_BUILD = false;

// Default import
import kunsul from "../dist/kunsul.esm.mjs";

// Named imports
import { log, warn, error } from "../dist/kunsul.esm.mjs";
console.log("🧪 DEVELOPMENT ESM TEST");
kunsul.log("ESM default import test");
log("ESM named import test");
warn("ESM warn test");
error("ESM error test");
console.log("✅ DEVELOPMENT ESM TESTING passed");