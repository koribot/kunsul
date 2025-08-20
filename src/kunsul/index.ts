declare const KUNSUL_DEBUG: boolean;

export interface LogOptions {
  includeInProd?: boolean;
}

const KUNSUL_DEBUG_ENABLED =
  typeof KUNSUL_DEBUG !== "undefined" ? KUNSUL_DEBUG : false;

export function log(message: string, options: LogOptions = {}): void {
  if (KUNSUL_DEBUG_ENABLED) {
    console.log(message);
  }
}

export function warn(message: string, options: LogOptions = {}): void {
  if (KUNSUL_DEBUG_ENABLED) {
    console.warn(message);
  }
}

export function error(message: string, options: LogOptions = {}): void {
  if (KUNSUL_DEBUG_ENABLED) {
    console.error(message);
  }
}

const kunsul = { log, warn, error } as const;
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
