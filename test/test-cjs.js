// can define this in various build tools such as vite, webpack, etc...
// if you dont set this, all logs will be included in the build output
// true if you want this to not show in builds by default it will always show
globalThis.KUNSUL_IGNORE_IN_BUILD = false;
const kunsul = require("../dist/kunsul.cjs");

console.log("🧪 Testing CommonJS build...");
kunsul.log("CommonJS log test");
const dbg = kunsul.createLogger({ prefix: "DBG", timestamp: true });
dbg.log("CommonJS dbg log test");
kunsul.time("CommonJS time test", {prefix: "TIMER"},);
kunsul.timeEnd("CommonJS time test", {prefix: "TIMER"});
kunsul.warn("CommonJS warn test");
kunsul.error("CommonJS error test");

// Test named imports
const { log, warn, error } = require("../dist/kunsul.cjs");
log("Named - log import test");
warn("Named - warn import test");
error("Named - error import test");
