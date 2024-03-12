"use client"

import { Provider } from "react-redux"
import { Cv } from "../../components/editor/cv"
import { CvForm } from "../../components/editor/form"
import Header from "../../components/editor/header"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "../../components/ui/resizable"
import { store } from "../../lib/redux/store"

export default function Editor() {
  return (
    <Provider store={store}>
      <Header />
      <ResizablePanelGroup
        direction="horizontal"
        className="relative h-full w-full overflow-hidden"
      >
        <ResizablePanel
          defaultSize={62}
          maxSize={58}
        >
          <CvForm />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <Cv />
        </ResizablePanel>
      </ResizablePanelGroup>
    </Provider>
  )
}
