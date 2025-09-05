/**
 * false if you want this to not show in builds by default it will always show
 * true if you want this to not show in builds
 */
declare const KUNSUL_IGNORE_IN_BUILD: boolean;

export interface LogOptions {
  prefix?: string;
  timestamp?: boolean;
}

const DO_WE_SHOW_LOGS = (): boolean => {
  return typeof KUNSUL_IGNORE_IN_BUILD !== "undefined"
    ? !Boolean(KUNSUL_IGNORE_IN_BUILD)
    : true;
};

const formatMessage = (message: string, options: LogOptions = {}): string => {
  let formatted = message;

  if (options?.prefix) {
    formatted = `[${options.prefix}] ${formatted}`;
  }

  if (options?.timestamp && typeof options.timestamp === "boolean") {
    const timestamp = new Date().toISOString();
    formatted = `${timestamp} ${formatted}`;
  }

  return formatted;
};

export function log(message: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.log(formatMessage(message, options));
  }
}

export function info(message: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.info(formatMessage(message, options));
  }
}

export function debug(message: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.debug(formatMessage(message, options));
  }
}

export function warn(message: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.warn(formatMessage(message, options));
  }
}

export function error(message: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.error(formatMessage(message, options));
  }
}

// Group logging for related messages
export function group(label: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.group(formatMessage(label, options));
  }
}

export function groupEnd(): void {
  if (DO_WE_SHOW_LOGS()) {
    console.groupEnd();
  }
}

// Collapsed group
export function groupCollapsed(label: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.groupCollapsed(formatMessage(label, options));
  }
}

// Table logging for objects/arrays
export function table(data: any, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    if (options.prefix) {
      console.log(formatMessage("", options));
    }
    console.table(data);
  }
}

// Time measurement
export function time(label: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.time(formatMessage(label, options));
  }
}

export function timeEnd(label: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.timeEnd(formatMessage(label, options));
  }
}

// Count occurrences
export function count(label?: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.count(label ? formatMessage(label, options) : undefined);
  }
}

export function countReset(label?: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.countReset(label ? formatMessage(label, options) : undefined);
  }
}

// Trace for call stack
export function trace(message?: string, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    console.trace(message ? formatMessage(message, options) : undefined);
  }
}

// Assert for conditional logging
export function assert(
  condition: boolean,
  message?: string,
  expectedValue?: any,
  options: LogOptions = {}
): void {
  if (DO_WE_SHOW_LOGS()) {
    console.assert(
      condition,
      message ? formatMessage(message, options) : undefined,
      expectedValue ? expectedValue : undefined
    );
  }
}

// Clear console
export function clear(): void {
  if (DO_WE_SHOW_LOGS()) {
    console.clear();
  }
}

// JSON pretty printing
export function json(obj: any, options: LogOptions = {}): void {
  if (DO_WE_SHOW_LOGS()) {
    const formatted = JSON.stringify(obj, null, 2);
    console.log(formatMessage(formatted, options));
  }
}

// Create logger with default options
export function createLogger(defaultOptions: LogOptions) {
  return {
    log: (message: string, options?: LogOptions) =>
      log(message, { ...defaultOptions, ...options }),
    info: (message: string, options?: LogOptions) =>
      info(message, { ...defaultOptions, ...options }),
    debug: (message: string, options?: LogOptions) =>
      debug(message, { ...defaultOptions, ...options }),
    warn: (message: string, options?: LogOptions) =>
      warn(message, { ...defaultOptions, ...options }),
    error: (message: string, options?: LogOptions) =>
      error(message, { ...defaultOptions, ...options }),
    group: (label: string, options?: LogOptions) =>
      group(label, { ...defaultOptions, ...options }),
    groupEnd,
    groupCollapsed: (label: string, options?: LogOptions) =>
      groupCollapsed(label, { ...defaultOptions, ...options }),
    table: (data: any, options?: LogOptions) =>
      table(data, { ...defaultOptions, ...options }),
    time: (label: string, options?: LogOptions) =>
      time(label, { ...defaultOptions, ...options }),
    timeEnd: (label: string, options?: LogOptions) =>
      timeEnd(label, { ...defaultOptions, ...options }),
    count: (label?: string, options?: LogOptions) =>
      count(label, { ...defaultOptions, ...options }),
    countReset: (label?: string, options?: LogOptions) =>
      countReset(label, { ...defaultOptions, ...options }),
    trace: (message?: string, options?: LogOptions) =>
      trace(message, { ...defaultOptions, ...options }),
    assert: (condition: boolean, message?: string, options?: LogOptions) =>
      assert(condition, message, { ...defaultOptions, ...options }),
    clear,
    json: (obj: any, options?: LogOptions) =>
      json(obj, { ...defaultOptions, ...options }),
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

// class base approach having bad code elimination issues
// interface LogOptions {
//   includeInProd?: boolean;
// }

// // Build-time constant for better dead code elimination
// declare const kunsul_DEBUG: boolean;

// const KUNSUL_DEBUG_ENABLED =
//   typeof kunsul_DEBUG !== "undefined" ? kunsul_DEBUG : false;

// class kunsulChain {
//   #message: string;
//   #method: "log" | "warn" | "error";
//   #alreadyLogged: boolean;

//   constructor(
//     message: string,
//     method: "log" | "warn" | "error",
//     alreadyLogged = false
//   ) {
//     this.#message = message;
//     this.#method = method;
//     this.#alreadyLogged = alreadyLogged;
//   }

//   //bypass dead code elimination
//   includeInProd(): this {
//     if (!this.#alreadyLogged) {
//       console[this.#method](this.#message);
//     }
//     return this;
//   }
// }
// class kunsul {
//   static log(message: any, options: LogOptions = {}): kunsulChain | {} {
//     const shouldLog = KUNSUL_DEBUG_ENABLED || options.includeInProd;
//     if (shouldLog) {
//       return new kunsulChain(message, "log", true);
//     }
//     return {};
//   }

//   static warn(message: any, options: LogOptions = {}): kunsulChain | {} {
//     const shouldLog = KUNSUL_DEBUG_ENABLED || options.includeInProd;

//     if (shouldLog) {
//       console.warn(message);
//       return new kunsulChain(message, "warn", true);
//     }

//     return new kunsulChain(message, "warn", false);
//   }

//   static error(message: any, options: LogOptions = {}): kunsulChain | {} {
//     const shouldLog = KUNSUL_DEBUG_ENABLED || options.includeInProd;

//     if (shouldLog) {
//       console.error(message);
//       return new kunsulChain(message, "error", true);
//     }

//     return new kunsulChain(message, "error", false);
//   }
// }

// export default kunsul;
