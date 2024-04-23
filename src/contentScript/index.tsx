import { MessageRequestType } from '../types'

console.log('contentScript is running')

const eventListeners = () => {
  chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    if (request.type === MessageRequestType.CONTENT_SCRIPT) {
      response({ status: 'Received' })
      console.log('content script message received')
    }
  })
}

const main = async () => {
  eventListeners()
}

main()
