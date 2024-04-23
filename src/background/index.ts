import { debugLog, errorLog } from '../utils'
import { MessageRequestType } from '../types'

console.log('background is running')

// Function to  send a message to the contentScript
async function sendMessageToActiveTab(message: any, callback?: any) {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, message, callback || (() => {}))
  }
}
// Function to set data in chrome.storage.local
export function setData(key: string, value: any, callback?: any) {
  return new Promise((resolve: any, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
        if (callback) callback()
      }
    })
  })
}
// Function to get data from chrome.storage.local
export function getData(key: string, callback?: (data: any) => void) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result[key])
        if (callback) callback(result[key])
      }
    })
  })
}
// Function to delete data from chrome.storage.local
export function deleteData(key: string, callback?: () => void): Promise<void> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove([key], () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve()
        if (callback) callback()
      }
    })
  })
}

// Function to get all data from chrome.storage.local
function getAllData() {
  chrome.storage.local.get(null, function (data) {
    if (chrome.runtime.lastError) {
      errorLog(chrome.runtime.lastError)
    } else {
      console.log('All local storage data:', data)
    }
  })
}

// Function to delete all data from chrome.storage.local
function deleteAllStorageData() {
  chrome.storage.local.get(null, function (items) {
    const keysToDelete = Object.keys(items)

    chrome.storage.local.remove(keysToDelete, function () {
      debugLog('All key-value pairs deleted.')
    })
  })
}

const main = async () => {
  // chrome.runtime.onInstalled.addListener(async ({ reason }) => {
  //   if (reason === 'install' || reason === 'update') {
  //     chrome.storage.local.set({
  //       [StorageKey.TWEETS_CONTROLLER]: { numberTargetTweets: 0, user: null, active: false },
  //     })
  //   }
  // })

  chrome.runtime.onMessage.addListener(async (request, sender, response) => {
    if (request.type === MessageRequestType.CREATE_TAB) {
      response({ status: 'Received' })

      await chrome.tabs.create({ url: `newtab.html` })
    } else if (request.type === MessageRequestType.OPEN_SIDE_PANEL) {
      response({ status: 'Received' })

      await chrome.sidePanel.open({
        tabId: request.data.tabId as number,
      })
    }
  })
}

main()
