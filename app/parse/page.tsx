"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import CvDropzone from "../../components/cv-dropzone"
import { Heading } from "../../components/doc/Heading"
import { FlexboxSpacer } from "../../components/flexbox-spacer"
import Header from "../../components/header"
import { cx } from "../../lib/cx"
import { extractCvFromSections } from "../../lib/parse-cv-from-pdf/extract-cv-from-sections"
import { groupLinesIntoSections } from "../../lib/parse-cv-from-pdf/group-lines-into-sections"
import { groupTextItemsIntoLines } from "../../lib/parse-cv-from-pdf/group-text-items-into-lines"
import { readPdf } from "../../lib/parse-cv-from-pdf/read-pdf"
import { TextItems } from "../../lib/parse-cv-from-pdf/types"
import { CvTable } from "./cv-table"

const CV_EXAMPLES = [
  {
    fileUrl: "cv-example/public-cv.pdf",
    description: <span>Took from public sources</span>,
  },
  {
    fileUrl: "cv-example/inhouse-cv.pdf",
    description: (
      <span>
        Created with Inhouse Cv Builder - <Link href="/editor">Link</Link>
      </span>
    ),
  },
]

const defaultFileUrl = CV_EXAMPLES[1]["fileUrl"]

export default function CvParser() {
  const [fileUrl, setFileUrl] = useState(defaultFileUrl)

  const [textItems, setTextItems] = useState<TextItems>([])
  const lines = groupTextItemsIntoLines(textItems || [])
  const sections = groupLinesIntoSections(lines)
  const cv = extractCvFromSections(sections)

  useEffect(() => {
    async function parse() {
      const textItems = await readPdf(fileUrl)
      setTextItems(textItems)
    }
    parse()
  }, [fileUrl])

  return (
    <>
      <Header />
      <div className="h-full w-full overflow-hidden">
        <div className="grid md:grid-cols-6">
          <div className="flex justify-center px-2 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end">
            <section className="mt-5 grow px-4 md:max-w-[600px] md:px-0">
              <div className="h-screen aspect-w-7">
                <iframe
                  src={`${fileUrl}#navpanes=0`}
                  className="h-full w-full"
                />
              </div>
            </section>
            <FlexboxSpacer
              maxWidth={45}
              className="hidden md:block"
            />
          </div>
          <div className="flex px-6 text-gray-900 md:col-span-3 md-h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll">
            <FlexboxSpacer
              maxWidth={45}
              className="hidden md:block"
            />
            <section className="max-w-[600px] grow">
              <Heading className="text-primary !mt-4">
                Cv Parser Playground
              </Heading>
              {/* <Paragraph smallMarginTop={true}>
                This playground showcases the Inhouse resume parser and its
                ability to parse information from a resume PDF. Click around the
                PDF examples below to observe different parsing results.
              </Paragraph> */}
              <div className="mt-3 flex gap-3">
                {CV_EXAMPLES.map((example, idx) => (
                  <article
                    key={idx}
                    className={cx(
                      "flex-1 cursor-pointer rounded-md border-2 px-4 py-3 shadow-sm outline-none hover:bg-gray-50 focus:bg-gray-50",
                      example.fileUrl === fileUrl
                        ? "border-blue-400"
                        : "border-gray-300",
                    )}
                    onClick={() => setFileUrl(example.fileUrl)}
                    onKeyDown={(e) => {
                      if (["Enter", " "].includes(e.key))
                        setFileUrl(example.fileUrl)
                    }}
                    tabIndex={0}
                  >
                    <h1 className="font-semibold">Cv Example {idx + 1}</h1>
                    <p className="mt-2 text-sm text-gray-500">
                      {example.description}
                    </p>
                  </article>
                ))}
              </div>
              {/* <Paragraph>
                You can also{" "}
                <span className="font-semibold">add your resume below</span> to
                access how well your resume would be parsed by similar
                Application Tracking System (ATS) used in job applications. The
                more information it can parse out, the better it indicates the
                resume is well formatted and easy to read.
              </Paragraph> */}
              <div className="mt-3">
                <CvDropzone
                  onFileUrlChange={(fileUrl) =>
                    setFileUrl(fileUrl || defaultFileUrl)
                  }
                  playgroundView={true}
                />
              </div>
              <Heading
                level={2}
                className="!mt-[1.2em]"
              >
                Cv Parsing Results
              </Heading>
              <CvTable cv={cv} />
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
