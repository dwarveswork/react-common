export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const AsyncFunction = (async () => {}).constructor;