 const log = (...messages: unknown[]): void => {
    if (process.env.NODE_ENV === 'development') {
        const error = new Error();
        const stack = error.stack?.split('\n')[2].trim();
        const match = stack?.match(/at\s+(.*):(\d+):(\d+)/);
 
        if (match) {
            const file = match[1];
            const line = match[2];
            const column = match[3];
            console.log(`Log at ${file}:${line}:${column}`, ...messages);
        } else {
            console.log(...messages);
        }
    }
};

export default log;