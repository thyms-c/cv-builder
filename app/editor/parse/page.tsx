"use client"

import { Label } from "@radix-ui/react-dropdown-menu"
import Link from "next/link"
import { useEffect, useState } from "react"
import CvDropzone from "../../../components/cv-dropzone"
import Header from "../../../components/header"
import { buttonVariants } from "../../../components/ui/button"
import { getHasUsedAppBefore } from "../../../lib/redux/local-storage"

export default function ImportCv() {
  const [hasUsedAppBefore, setHasUsedAppBefore] = useState(false)
  const [hasAddedCv, setHasAddedCv] = useState(false)

  const onFileUrlChange = (fileUrl: string) => {
    setHasAddedCv(Boolean(fileUrl))
  }

  useEffect(() => {
    setHasUsedAppBefore(getHasUsedAppBefore())
  }, [])

  return (
    <>
      <Header />
      <div className="mx-auto mt-14 max-w-3xl rounded-md border border-gray-200 px-10 py-10 text-center shadow-md">
        {!hasUsedAppBefore ? (
          <>
            <h1 className="text-lg font-semibold text-gray-900">
              Import data from an existing cv
            </h1>
            <CvDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
            {!hasAddedCv && (
              <>
                <OrDivider />
                <SectionWithHeadingAndCreateButton
                  heading="Don't have a cv yet?"
                  buttonText="Create from scratch"
                />
              </>
            )}
          </>
        ) : (
          <>
            {!hasAddedCv && (
              <>
                <SectionWithHeadingAndCreateButton
                  heading="You have data saved in browser from prior session"
                  buttonText="Continue where I left off"
                />
                <OrDivider />
              </>
            )}
            <h1 className="font-semibold text-gray-900">
              Override data with a new cv
            </h1>
            <CvDropzone
              onFileUrlChange={onFileUrlChange}
              className="mt-5"
            />
          </>
        )}
      </div>
    </>
  )
}

const OrDivider = () => (
  <div
    className="mx-[-2.5rem] flex items-center pb-6 pt-8"
    aria-hidden="true"
  >
    <div className="flex-grow border-t border-gray-200" />
    <span className="mx-2 mt-[-2px] flex-shrink text-lg text-gray-400">or</span>
    <div className="flex-grow border-t border-gray-200" />
  </div>
)

const SectionWithHeadingAndCreateButton = ({
  heading,
  buttonText,
}: {
  heading: string
  buttonText: string
}) => {
  return (
    <>
      <Label>{heading}</Label>
      <div className="mt-5">
        <Link
          href="/editor"
          className={buttonVariants({ variant: "default" })}
        >
          {buttonText}
        </Link>
      </div>
    </>
  )
}
