// can define this in various build tools such as vite, webpack, etc...
// if you dont set this, all logs will be included in the build output
// true if you want this to not show in builds by default it will always show
globalThis.KUNSUL_IGNORE_IN_BUILD = false;
const kunsul = require("../dist/kunsul.cjs");


console.log("🧪 Testing CommonJS build...");
kunsul.log("CommonJS log test");
const dbg = kunsul.createLogger({
  KUNSUL_OPTIONS: {
    prefix: "DBG",
    timestamp: true,
  },
});
const bigObject = {
  users: [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      roles: ["admin", "editor"],
      settings: {
        theme: "dark",
        notifications: {
          email: true,
          sms: false,
          push: true
        },
        shortcuts: {
          save: "Ctrl+S",
          open: "Ctrl+O",
          close: "Ctrl+W"
        }
      },
      history: Array.from({ length: 1 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 60000).toISOString(),
        action: "login",
        ip: `192.168.1.${i % 255}`
      }))
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      roles: ["viewer"],
      settings: {
        theme: "light",
        notifications: {
          email: false,
          sms: true,
          push: false
        },
        shortcuts: {
          save: "Cmd+S",
          open: "Cmd+O",
          close: "Cmd+W"
        }
      },
      history: Array.from({ length: 1 }, (_, i) => ({
        timestamp: new Date(Date.now() - i * 120000).toISOString(),
        action: "view",
        page: `/page/${i}`
      }))
    }
  ],
  config: {
    appName: "BigLoggerApp",
    version: "1.0.0",
    features: {
      logging: true,
      metrics: true,
      debugMode: false
    },
    servers: Array.from({ length: 1 }, (_, i) => ({
      host: `server-${i}.example.com`,
      port: 8000 + i,
      status: i % 2 === 0 ? "online" : "offline"
    }))
  },
  metadata: {
    createdAt: new Date().toISOString(),
    createdBy: "system",
    tags: Array.from({ length: 1 }, (_, i) => `tag${i}`)
  }
};

dbg.log("CommonJS dbg log test", "aw", {sample:"test"});
dbg.log({ prefix: "aw" }, "sample");
dbg.json({ foo: 1, bar: 2 }, { foo: 3, bar: 4 });
kunsul.time("CommonJS time test", { prefix: "TIMER" });
kunsul.timeEnd("CommonJS time test", { prefix: "TIMER" });
kunsul.warn("CommonJS warn test");
kunsul.error("CommonJS error test");

// Test named imports
const { log, warn, error } = require("../dist/kunsul.cjs");
log("Named - log import test");
warn("Named - warn import test");
error("Named - error import test");
