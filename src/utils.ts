const enableDebugging = false
const enableErrorLogging = false

export const debugLog = (...messages: any[]) => {
  if (enableDebugging) {
    console.log(...messages)
  }
}

export const errorLog = (error: any, errorNumber?: number) => {
  if (enableErrorLogging) {
    errorNumber ? console.error(`Catched pokemon n°${errorNumber}`, error) : console.error(error)
  }
}

export const waitSeconds = (seconds: number) => {
  return new Promise((resolve: any) => {
    setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}
