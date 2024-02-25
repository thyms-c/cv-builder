"use client"

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import { usePDF } from "@react-pdf/renderer"
import dynamic from "next/dynamic"
import { useEffect } from "react"
import { Button } from "../../ui/button"
import { Label } from "../../ui/label"
import { useSetDefaultScale } from "./hooks"

const CvControlBar = ({
  scale,
  setScale,
  documentSize,
  document,
  fileName,
}: {
  scale: number
  setScale: (scale: number) => void
  documentSize: string
  document: JSX.Element
  fileName: string
}) => {
  const { scaleOnResize, setScaleOnResize } = useSetDefaultScale({
    setScale,
    documentSize,
  })

  const [instance, update] = usePDF({ document })

  useEffect(() => {
    update(document)
  }, [update, document])
  return (
    <div className="sticky bottom-0 left-0 right-0 flex h-[var(--cv-control-bar-height)]  items-center justify-center px-[var(--cv-padding)] text-gray-600 lg:justify-between">
      <div className="flex gap-8 w-full text-black dark:text-white">
        <div className="flex items-center gap-2">
          <MagnifyingGlassIcon
            className="h-5 w-5"
            aria-hidden="true"
          />
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.01}
            value={scale}
            onChange={(e) => {
              setScaleOnResize(false)
              setScale(Number(e.target.value))
            }}
            className="accent-black dark:accent-white"
          />
          <div className="w-10">{`${Math.round(scale * 100)}%`}</div>
          <label className="hidden items-center gap-1 lg:flex">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 accent-black dark:accent-white"
              checked={true}
              onChange={() => setScaleOnResize((prev) => !prev)}
            />
            <Label className="select-none">Autoscale</Label>
          </label>
        </div>
        <div>
          <a
            className=""
            href={instance.url!}
            download={fileName}
          >
            <Button className="space-x-2">
              <ArrowDownTrayIcon className="h-4 w-4" />
              <span className="whitespace-nowrap">Download</span>
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}

export const CvControlBarCSR = dynamic(() => Promise.resolve(CvControlBar), {
  ssr: false,
})
