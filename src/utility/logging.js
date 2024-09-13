const NO_OP = (format, ...args) => {};
export class ConsoleLogger {
  constructor() {
    if (process.env.REACT_APP_ENABLE_LOGGING === "no") {
      this.error = NO_OP;
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    this.error = console.error.bind(console);

    if (process.env.REACT_APP_LOG_LEVEL === "error") {
      this.warn = NO_OP;
      this.log = NO_OP;
      return;
    }

    this.warn = console.warn.bind(console);

    if (process.env.REACT_APP_LOG_LEVEL === "warn") {
      this.log = NO_OP;
      return;
    }

    this.log = console.log.bind(console);
  }
}

export const logger = new ConsoleLogger();
