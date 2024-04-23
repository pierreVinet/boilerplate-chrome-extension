import React, { useEffect, useState } from 'react'
import { MessageRequestType, StorageKey } from '../../types'
import '../Popup.css'
import { getData, setData } from '../../background'

const HomeView = () => {
  const [count, setCount] = useState(0)

  const minus = () => {
    if (count > 0) setCount(count - 1)
  }
  const add = () => setCount(count + 1)

  const openTab = () => {
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage({
        type: MessageRequestType.CREATE_TAB,
      })
    }
  }
  const openSidePanel = async () => {
    const [tab] = await chrome.tabs.query({
      active: true,
      lastFocusedWindow: true,
    })

    if (chrome.runtime?.id && tab.id) {
      chrome.runtime.sendMessage({
        type: MessageRequestType.OPEN_SIDE_PANEL,
        data: { tabId: tab.id },
      })
    }
  }

  useEffect(() => {
    getData(StorageKey.COUNT, (result) => {
      console.log('Count from storage:', result)
      setCount(result || 0)
    })
  }, [])

  useEffect(() => {
    setData(StorageKey.COUNT, count)

    if (chrome.runtime?.id) {
      console.log('Message sent from HomeView:', count)
      chrome.runtime.sendMessage({ type: MessageRequestType.COUNT, data: { count } })
    }
  }, [count])

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-2">
      <div className="flex flex-row items-center justify-center gap-2 ">
        <button className="button-send" onClick={minus} disabled={count <= 0}>
          -
        </button>
        <label>{count}</label>
        <button className="button-send" onClick={add}>
          +
        </button>
      </div>
      <button type="button" className="button-dark" onClick={openTab}>
        Open New Tab
      </button>
      <button type="button" className="button-dark" onClick={openSidePanel}>
        Open SidePanel
      </button>
    </div>
  )
}

export default HomeView
