import { useState, useEffect } from 'react'

import './SidePanel.css'

const SidePanel = () => {
  const [countSync, setCountSync] = useState(0)

  useEffect(() => {
    // chrome.storage.sync.get(['count'], (result) => {
    //   setCountSync(result.count || 0)
    // })

    chrome.runtime.onMessage.addListener((request) => {
      if (request.type === 'COUNT') {
        setCountSync(request.count || 0)
      }
    })
  }, [])

  return (
    <main className="w-full flex flex-col items-center justify-center gap-4 h-screen bg-50">
      <h3 className="font-bold text-3xl">SidePanel Page</h3>
      <h4>Count from Popup: {countSync}</h4>
    </main>
  )
}

export default SidePanel
