import { useEffect, useState } from "react"
import { A4_HEIGHT_PX, LETTER_HEIGHT_PX } from "../../../lib/constants"

export const getPxPerRem = () => {
  const bodyComputedStyle = getComputedStyle(
    document.querySelector("body")!,
  ) as any
  return parseFloat(bodyComputedStyle["font-size"]) || 16
}

export const CSS_VARIABLES = {
  "--top-nav-bar-height": "3.5rem",
  "--cv-control-bar-height": "3rem",
  "--cv-padding": "1.5rem",
} as const

export const useSetDefaultScale = ({
  setScale,
  documentSize,
}: {
  setScale: (scale: number) => void
  documentSize: string
}) => {
  const [scaleOnResize, setScaleOnResize] = useState(true)

  useEffect(() => {
    const getDefaultScale = () => {
      const screenHeightPx = window.innerHeight
      const PX_PER_REM = getPxPerRem()
      const screenHeightRem = screenHeightPx / PX_PER_REM
      const topNavBarHeightRem = parseFloat(
        CSS_VARIABLES["--top-nav-bar-height"],
      )
      const cvControlBarHeight = parseFloat(
        CSS_VARIABLES["--cv-control-bar-height"],
      )
      const cvPadding = parseFloat(CSS_VARIABLES["--cv-padding"])
      const topAndBottomcvPadding = cvPadding * 2
      const defaultcvHeightRem =
        screenHeightRem -
        topNavBarHeightRem -
        cvControlBarHeight -
        topAndBottomcvPadding
      const cvHeightPx = defaultcvHeightRem * PX_PER_REM
      const height = documentSize === "A4" ? A4_HEIGHT_PX : LETTER_HEIGHT_PX
      const defaultScale = Math.round((cvHeightPx / height) * 100) / 100
      return defaultScale
    }

    const setDaultScale = () => {
      const defaultScale = getDefaultScale()
      setScale(defaultScale)
    }

    if (scaleOnResize) {
      setDaultScale()
      window.addEventListener("resize", setDaultScale)
    }

    return () => {
      window.removeEventListener("resize", setDaultScale)
    }
  }, [setScale, scaleOnResize, documentSize])

  return { scaleOnResize, setScaleOnResize }
}
