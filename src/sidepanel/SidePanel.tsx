import { useState, useEffect } from 'react'

import './SidePanel.css'
import { getData } from '../background'
import { MessageRequestType, StorageKey } from '../types'

const SidePanel = () => {
  const [countSync, setCountSync] = useState(0)

  useEffect(() => {
    getData(StorageKey.COUNT, (result) => {
      setCountSync(result || 0)
    })

    console.log('Message received side panellllll')

    chrome.runtime.onMessage.addListener((request, sender, response) => {
      console.log('Message received side panel:', request)
      if (request.type === MessageRequestType.COUNT) {
        console.log('Message received side panel:', request.data.count)
        response('Message received')
        setCountSync(request.data.count || 0)
      }
    })
  }, [])

  return (
    <main className="w-full flex flex-col items-center justify-center gap-4 h-screen bg-50">
      <h3 className="font-bold text-3xl">SidePanel Page</h3>
      <p>Count from Popup: {countSync}</p>
    </main>
  )
}

export default SidePanel
