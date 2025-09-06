/**
 * false if you want this to not show in builds by default it will always show
 * true if you want this to not show in builds
 */
declare const KUNSUL_IGNORE_IN_BUILD: boolean;

export interface LogOptions {
  KUNSUL_OPTIONS: {
    prefix?: string;
    timestamp?: boolean;
  };
}

const SHOULD_WE_SHOW_LOGS = (): boolean => {
  return typeof KUNSUL_IGNORE_IN_BUILD !== "undefined"
    ? !Boolean(KUNSUL_IGNORE_IN_BUILD)
    : true;
};

// --- Helpers ---
function isLogOptions(obj: any): obj is LogOptions {
  return obj && typeof obj === "object" && "KUNSUL_OPTIONS" in obj;
}

function normalizeArgs(args: any[]): { options: LogOptions; logArgs: any[] } {
  if (args.length > 0 && isLogOptions(args[0])) {
    return { options: args[0], logArgs: args.slice(1) };
  }
  return {
    options: {
      KUNSUL_OPTIONS: {},
    },
    logArgs: args,
  };
}

/**
 * Formats the arguments to be logged by prepending a timestamp and prefix (if options are provided)
 * and wrapping the first argument in square brackets if it is a string.
 *
 * @param args - The arguments to be logged
 * @param options - The options to format the arguments with
 * @returns The formatted arguments
 */
function formatArgs(
  args: any[],
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: false,
    },
  }
): any[] {
  if (args.length === 0) return args;
  // we only care about the first args since we just want to prepend the timestamp/prefix
  let first = args[0];
  if (typeof first === "string") {
    if (options?.KUNSUL_OPTIONS?.prefix) {
      first = `[${options.KUNSUL_OPTIONS.prefix}] ${first}`;
    }
    if (options?.KUNSUL_OPTIONS?.timestamp) {
      const ts = new Date().toISOString();
      first = `${ts} ${first}`;
    }
    return [first, ...args.slice(1)];
  }

  if (typeof first === "object") {
    const ts = new Date().toISOString();
    let prefixes: string = "";
    if (options?.KUNSUL_OPTIONS?.prefix) {
      prefixes = `[${options.KUNSUL_OPTIONS.prefix}]`;
    }
    if (options?.KUNSUL_OPTIONS?.timestamp) {
      prefixes = `${ts} ${prefixes}`;
    }
    if (prefixes === "") return [...args];
    return [prefixes, first, ...args.slice(1)];
  }

  return args;
}

// --- Core log functions ---
/**
 * Logs messages to the console with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object (e.g. `{KUNSUL_OPTIONS: { prefix: "DBG", timestamp: true }}`).
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Accepts either:
 *   1. `(options: LogOptions, ...data: any[])`
 *   2. `(...data: any[])`
 *
 * @example
 * // With prefix and timestamp
 * kunsul.log({ KUNSUL_OPTIONS: { prefix: "TEST", timestamp: true } }, "data", { foo: 1 });
 * => 2025-09-06T12:34:56.789Z [TEST] data { foo: 1 }
 *
 * @example
 * // Without options, just log data
 * kunsul.log("hello", "world", { foo: 1 });
 * => hello world { foo: 1 }
 *
 * @example
 * // With only prefix
 * kunsul.log({ KUNSUL_OPTIONS: { prefix: "APP" } }, "started");
 * => [APP] started
 *
 * @note
 * - Prefix/timestamp {@link LogOptions} are applied only to the **first string argument**.
 * - To guarantee consistent formatting, pass options as the **first argument**.
 */
export function log(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.log(...formatArgs(logArgs, options));
  }
}

/**
 * Logs info messages to the console using `console.info` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object (e.g. `{KUNSUL_OPTIONS: { prefix: "DBG", timestamp: true }}`).
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Accepts either:
 *   1. `(options: LogOptions, ...data: any[])`
 *   2. `(...data: any[])`
 *
 * @example
 * kunsul.info({ KUNSUL_OPTIONS: { prefix: "INFO", timestamp: true } }, "Server started", { port: 3000 });
 * => 2025-09-06T12:34:56.789Z [INFO] Server started { port: 3000 }
 *
 * @example
 * kunsul.info("Connected to database", { db: "users" });
 * => Connected to database { db: "users" }
 *
 * @example
 * kunsul.info({ KUNSUL_OPTIONS: { prefix: "APP" } }, "Initialization complete");
 * => [APP] Initialization complete
 *
 * @note
 * - Prefix/timestamp {@link LogOptions} are applied only to the **first string argument**.
 * - To guarantee consistent formatting, pass options as the **first argument**.
 */
export function info(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.info(...formatArgs(logArgs, options));
  }
}

/**
 * Logs debug messages to the console using `console.debug` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Arguments to log.
 *
 * @example
 * kunsul.debug({ KUNSUL_OPTIONS: { prefix: "DBG" } }, "Debugging value", { foo: 42 });
 * => [DBG] Debugging value { foo: 42 }
 */
export function debug(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.debug(...formatArgs(logArgs, options));
  }
}

/**
 * Logs warning messages to the console using `console.warn` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Arguments to log.
 *
 * @example
 * kunsul.warn({ KUNSUL_OPTIONS: { prefix: "WARN" } }, "Something might be wrong");
 * => [WARN] Something might be wrong
 */
export function warn(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.warn(...formatArgs(logArgs, options));
  }
}

/**
 * Logs error messages to the console using `console.error` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Arguments to log.
 *
 * @example
 * kunsul.error({ KUNSUL_OPTIONS: { prefix: "ERR" } }, "An error occurred", new Error("Oops"));
 * => [ERR] An error occurred Error: Oops
 */
export function error(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.error(...formatArgs(logArgs, options));
  }
}

/**
 * Groups related console messages using `console.group` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as group label data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as group label data.
 *
 * @param args - Arguments to create a group label.
 *
 * @example
 * kunsul.group({ KUNSUL_OPTIONS: { prefix: "GROUP" } }, "Starting process");
 * => [GROUP] Starting process
 */
export function group(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.group(...formatArgs(logArgs, options));
  }
}
/**
 * Ends the current console group.
 *
 * @example
 * kunsul.groupEnd();
 */
export function groupEnd(): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.groupEnd();
  }
}

/**
 * Creates a collapsed console group using `console.groupCollapsed` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as group label data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as group label data.
 *
 * @param args - Arguments to create a collapsed group label.
 *
 * @example
 * kunsul.groupCollapsed({ KUNSUL_OPTIONS: { prefix: "COLLAPSED" } }, "Details hidden");
 * => [COLLAPSED] Details hidden
 */
export function groupCollapsed(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.groupCollapsed(...formatArgs(logArgs, options));
  }
}

/**
 * Logs data to the console using `console.table` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as table data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as table data.
 *
 * @param args - Arguments to log as a table.
 *
 * @example
 * // with options
 * kunsul.table({ KUNSUL_OPTIONS: { prefix: "TABLE" } }, { foo: 1, bar: 2 });
 * => [TABLE] { foo: 1, bar: 2 }
 *
 *
 * // without options
 * kunsul.table({ foo: 1, bar: 2 });
 * => { foo: 1, bar: 2 }
 */
export function table(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.table(...formatArgs(logArgs, options));
  }
}

// Timers

/**
 * Starts a timer using `console.time` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** is the timer label.
 * - The **second argument** may be a {@link LogOptions} object.
 *
 * @param label - Timer label.
 * @param options - Optional formatting options.
 *
 * @example
 * kunsul.time("myTimer", { KUNSUL_OPTIONS: { prefix: "TIMER" }});
 * => [TIMER] myTimer: <time>
 */
export function time(
  label: string,
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: true,
    },
  }
): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.time(...formatArgs([label], options));
  }
}

/**
 * Logs the elapsed time of a timer using `console.timeEnd` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** is the timer label.
 * - The **second argument** may be a {@link LogOptions} object.
 *
 * @param label - Timer label.
 * @param options - Optional formatting options.
 *
 * @example
 * kunsul.timeEnd("myTimer", { KUNSUL_OPTIONS: { prefix: "TIMER" }});
 * => [TIMER] myTimer: <time>
 */
export function timeEnd(
  label: string,
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: true,
    },
  }
): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.timeEnd(...formatArgs([label], options));
  }
}

// --- Count occurrences ---

/**
 * Logs the number of times the function has been called with the given label.
 *
 * 🔹 Argument Rules:
 * - The **first argument** is the label of the counter.
 * - The **second argument** may be a {@link LogOptions} object.
 *
 * @param label - Counter label.
 * @param options - Optional formatting options.
 *
 * @example
 * kunsul.count("myCounter", { KUNSUL_OPTIONS: { prefix: "COUNTER" }});
 * => [COUNTER] myCounter: 1
 */
export function count(
  label?: string,
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: false,
    },
  }
): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.count(
      label ? (formatArgs([label], options)[0] as string) : undefined
    );
  }
}

/**
 * Resets the count of the given label using `console.countReset`.
 *
 * 🔹 Argument Rules:
 * - The **first argument** is the label of the counter.
 * - The **second argument** may be a {@link LogOptions} object.
 *
 * @param label - Counter label.
 * @param options - Optional formatting options.
 *
 * @example
 * kunsul.countReset("myCounter", { KUNSUL_OPTIONS: { prefix: "COUNTER" }});
 * => [COUNTER] myCounter: 0
 */
export function countReset(
  label?: string,
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: false,
    },
  }
): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.countReset(
      label ? (formatArgs([label], options)[0] as string) : undefined
    );
  }
}

// --- Trace ---

/**
 * Logs a stack trace using `console.trace` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object.
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - Arguments to log.
 *
 * @example
 * kunsul.trace({ KUNSUL_OPTIONS: { prefix: "TRACE" }}, "Something happened");
 * => [TRACE] Trace: Something happened
 *     at <stack trace>
 */
export function trace(...args: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(args);
    console.trace(...formatArgs(logArgs, options));
  }
}

// --- Assert ---

/**
 * Logs an assertion error using `console.assert` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** is the condition to assert.
 * - The **second argument** is the message to log if the condition is false.
 * - The **third argument** is the expected value to log if the condition is false.
 * - The **fourth argument** is an optional {@link LogOptions} object.
 *
 * @param condition - Condition to assert.
 * @param message - Optional message to log if the condition is false.
 * @param expectedValue - Optional expected value to log if the condition is false.
 * @param options - Optional formatting options.
 *
 * @example
 * kunsul.assert(condition, "Something went wrong", expectedValue, { KUNSUL_OPTIONS: prefix: "ASSERT" }});
 * => [ASSERT] Assertion failed: Something went wrong. Expected <expectedValue> but got <actualValue>
 */
export function assert(
  condition: boolean,
  message?: string,
  expectedValue?: any,
  options: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: false,
    },
  }
): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.assert(
      condition,
      message ? formatArgs([message], options)[0] : undefined,
      expectedValue
    );
  }
}

// --- Clear console ---
/**
 * Clears the console using `console.clear`.
 *
 * @example
 * kunsul.clear();
 */
export function clear(): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    console.clear();
  }
}

// --- JSON pretty printing ---

/**
 * Logs a pretty-printed JSON object to the console using `console.log` with optional formatting.
 *
 * 🔹 Argument Rules:
 * - The **first argument** may be a {@link LogOptions} object (e.g. `{KUNSUL_OPTIONS: { prefix: "DBG", timestamp: true }}`).
 * - If the first argument is NOT a {@link LogOptions}, all arguments are treated as log data.
 * - If the first argument is a {@link LogOptions}, all remaining arguments are treated as log data.
 *
 * @param args - JSON object to log.
 *
 * @example
 * // with options
 * kunsul.json( { KUNSUL_OPTIONS: prefix: "JSON" }}, { foo: 1, bar: 2 });
 * => [JSON] {
 *   "foo": 1,
 *   "bar": 2
 * }
 *
 * @example
 * // without options
 * kunsul.json({ foo: 1, bar: 2 });
 * => {
 *   "foo": 1,
 *   "bar": 2
 * }
 */
export function json(...obj: any[]): void {
  if (SHOULD_WE_SHOW_LOGS()) {
    const { options, logArgs } = normalizeArgs(obj);
    const formatted = logArgs
      .map((arg) =>
        typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
      )
      .join(", \n"); 
    const formattedWithPrefix = formatArgs([formatted], options);
    console.log(...formattedWithPrefix);
  }
}

// --- Logger factory ---
/**
 * Creates a new logger with default log options.
 *
 * @param defaultOptions - Default log options to apply to all log methods.
 *
 * @returns A new logger with the following methods:
 *   - log
 *   - info
 *   - debug
 *   - warn
 *   - error
 *   - group
 *   - groupEnd
 *   - groupCollapsed
 *   - table
 *   - time
 *   - timeEnd
 *   - count
 *   - countReset
 *   - trace
 *   - assert
 *   - clear
 *   - json
 *
 * @example
 * const logger = createLogger({ prefix: "LOG" });
 * logger.log("Hello world");
 * => [LOG] Hello world
 */
export function createLogger(
  defaultOptions: LogOptions = {
    KUNSUL_OPTIONS: {
      prefix: undefined,
      timestamp: false,
    },
  }
) {
  return {
    log: (...args: any[]) => log({ ...defaultOptions }, ...args),
    info: (...args: any[]) => info({ ...defaultOptions }, ...args),
    debug: (...args: any[]) => debug({ ...defaultOptions }, ...args),
    warn: (...args: any[]) => warn({ ...defaultOptions }, ...args),
    error: (...args: any[]) => error({ ...defaultOptions }, ...args),
    group: (...args: any[]) => group({ ...defaultOptions }, ...args),
    groupEnd,
    groupCollapsed: (...args: any[]) =>
      groupCollapsed({ ...defaultOptions }, ...args),
    table: (...args: any[]) => table({ ...defaultOptions }, ...args),
    time: (label: string, options?: LogOptions) =>
      time(label, { ...defaultOptions, ...options }),
    timeEnd: (label: string, options?: LogOptions) =>
      timeEnd(label, { ...defaultOptions, ...options }),
    count: (label?: string, options?: LogOptions) =>
      count(label, { ...defaultOptions, ...options }),
    countReset: (label?: string, options?: LogOptions) =>
      countReset(label, { ...defaultOptions, ...options }),
    trace: (...args: any[]) => trace({ ...defaultOptions }, ...args),
    assert: (
      condition: boolean,
      message?: string,
      expectedValue?: any,
      options?: LogOptions
    ) =>
      assert(condition, message, expectedValue, {
        ...defaultOptions,
        ...options,
      }),
    clear,
    json: (...obj: any[]) => json({ ...defaultOptions }, ...obj),
  };
}

const kunsul = {
  log,
  info,
  debug,
  warn,
  error,
  group,
  groupEnd,
  groupCollapsed,
  table,
  time,
  timeEnd,
  count,
  countReset,
  trace,
  assert,
  clear,
  json,
  createLogger,
} as const;

export default kunsul;
