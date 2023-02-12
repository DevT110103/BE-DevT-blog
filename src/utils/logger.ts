class Logger {
  warning(text: any) {
    console.warn('WARNING: ', text);
  }

  error(text: any) {
    console.warn('ERROR: ', text);
  }
}

export default new Logger();
