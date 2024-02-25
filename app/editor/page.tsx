"use client"

import { Provider } from "react-redux"
import { Cv } from "../../components/editor/cv"
import { CvForm } from "../../components/editor/form"
import { store } from "../../lib/redux/store"

export default function Editor() {
  return (
    <Provider store={store}>
      <main className="relative h-full w-full overflow-hidden">
        <div className="grid grid-cols-3 md:grid-cols-6">
          <div className="col-span-3">
            <CvForm />
          </div>
          <div className="col-span-3">
            <Cv />
          </div>
        </div>
      </main>
    </Provider>
  )
}
