"use client"

import { Provider } from "react-redux"
import { Cv } from "../../components/editor/cv"
import { store } from "../../lib/redux/store"

export default function Editor() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <span className="text-black dark:text-white">Form</span>
          </div>
          <div className="col-span-3">
            <Cv />
          </div>
        </div>
      </main>
    </Provider>
  )
}
