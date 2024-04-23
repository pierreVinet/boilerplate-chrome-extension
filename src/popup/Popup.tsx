import { useState } from 'react'
import './Popup.css'

import classNames from 'classnames'
import HomeView from './views/HomeView'

const views = [{ component: <HomeView />, name: 'Home' }]

const Popup = () => {
  const [openView, setOpenView] = useState<number>(0)
  return (
    <div className="text-white absolute top-0 left-0 bottom-0 right-0 text-center h-full py-3 bg-50 flex flex-col items-center">
      <div className="w-full flex flex-row items-center justify-center gap-3  mb-3">
        {views.map((view, index) => (
          <h1
            key={`view-${index}`}
            className={classNames(
              'text-lg font-medium duration-200 relative',
              openView === index ? 'text-blue-100' : 'text-white/70 hover:text-white',
            )}
          >
            <button onClick={() => setOpenView(index)} className="">
              {view.name}
            </button>
            {openView === index ? (
              <div className="absolute bottom-0 left-1 right-1 h-[2px] rounded-full bg-blue-500" />
            ) : null}
          </h1>
        ))}
      </div>
      {views[openView].component}
    </div>
  )
}

export default Popup
