function log(message: string) {
    const error = new Error();
  
    if (error.stack) {
      const stackTrace = error.stack.split('\n')[2];
      const [fileName, lineNumber] = stackTrace.trim().split(':');
  
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${fileName}:${lineNumber}] ${message}`);
      }
    } else {
      // Handle cases where error.stack is undefined
      console.error("Error: Unable to get stack trace");
    }
  }
  
export default log;