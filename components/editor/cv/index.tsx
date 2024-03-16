"use client"

import { useMemo, useState } from "react"
import { selectCv } from "../../../lib/redux/cv-slice"
import { useAppSelector } from "../../../lib/redux/hooks"
import { selectSettings } from "../../../lib/redux/settings-slice"
import { FlexboxSpacer } from "../../flexbox-spacer"
import { CvControlBarCSR } from "./cv-control-bar"
import { CvIFrameCSR } from "./cv-iframe"
import { CvPDF } from "./cv-pdf"
import {
  useRegisterReactPDFFont,
  useRegisterReactPDFHypenationCallback,
} from "./fonts/hooks"

export const Cv = () => {
  const [scale, setScale] = useState(0.8)
  const cv = useAppSelector(selectCv)
  const settings = useAppSelector(selectSettings)
  const document = useMemo(
    () => (
      <CvPDF
        cv={cv}
        settings={settings}
        isPDF={true}
      />
    ),
    [cv, settings],
  )

  useRegisterReactPDFFont()
  useRegisterReactPDFHypenationCallback(settings.fontFamily)

  return (
    <>
      <div className="relative flex justify-center md:justify-start">
        <FlexboxSpacer
          maxWidth={50}
          className="hidden md:block"
        />
        <div className="relative">
          <section className="h-[calc(100vh-var(--top-nav-bar-height)-var(--cv-control-bar-height))] overflow-hidden md:p-[var(--cv-padding)]">
            <CvIFrameCSR
              documentSize={settings.documentSize}
              scale={scale}
              enablePDFViewer={false}
            >
              <CvPDF
                cv={cv}
                settings={settings}
                isPDF={false}
              />
            </CvIFrameCSR>
          </section>
          <CvControlBarCSR
            scale={scale}
            setScale={setScale}
            documentSize={settings.documentSize}
            document={document}
            fileName={cv.profile.name + "-cv"}
          />
        </div>
      </div>
    </>
  )
}
