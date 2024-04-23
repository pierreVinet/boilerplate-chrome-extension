import React from 'react'
import { MessageRequestType } from '../../types'
import '../Popup.css'

const HomeView = () => {
  const openTab = () => {
    if (chrome.runtime?.id) {
      chrome.runtime.sendMessage({
        type: MessageRequestType.CREATE_TAB,
      })
    }
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <button type="button" className="button-dark" onClick={openTab}>
        Open New Tab
      </button>
    </div>
  )
}

export default HomeView
