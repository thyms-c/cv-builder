import addPdfSrc from "@/public/assets/add-pdf.svg"
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/solid"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { cx } from "../lib/cx"
import { parseCvFromPdf } from "../lib/parse-cv-from-pdf"
import { deepClone } from "../lib/parse-cv-from-pdf/deep-clone"
import {
  getHasUsedAppBefore,
  saveStateToLocalStorage,
} from "../lib/redux/local-storage"
import { ShowForm, initialSettings } from "../lib/redux/settings-slice"
import { Button } from "./ui/button"
import { Label } from "./ui/label"

const defaultFileState = {
  name: "",
  size: 0,
  fileUrl: "",
}

const CvDropzone = ({
  onFileUrlChange,
  className,
  playgroundView = false,
}: {
  onFileUrlChange: (fileUrl: string) => void
  className?: string
  playgroundView?: boolean
}) => {
  const [file, setFile] = useState(defaultFileState)
  const [isHoveredOnDropzone, setIsHoveredOnDropZone] = useState(false)
  const [hasNonPdfFile, setHasNonPdfFile] = useState(false)

  const hasFile = Boolean(file.name)
  const router = useRouter()

  const setNewFile = (newFile: File) => {
    if (file.fileUrl) {
      URL.revokeObjectURL(file.fileUrl)
    }

    const { name, size } = newFile
    const fileUrl = URL.createObjectURL(newFile)
    setFile({ name, size, fileUrl })
    onFileUrlChange(fileUrl)
  }

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const newFile = event.dataTransfer.files[0]
    if (newFile.name.endsWith(".pdf")) {
      setHasNonPdfFile(false)
      setNewFile(newFile)
    } else {
      setHasNonPdfFile(true)
    }
    setIsHoveredOnDropZone(false)
  }

  const onRemove = () => {
    setFile(defaultFileState)
    onFileUrlChange("")
  }

  const onInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newFile = files[0]
    setNewFile(newFile)
  }

  const onImportClick = async () => {
    const cv = await parseCvFromPdf(file.fileUrl)
    const settings = deepClone(initialSettings)
    if (getHasUsedAppBefore()) {
      const sections = Object.keys(settings.formToShow) as ShowForm[]
      const sectionToFormToShow: Record<ShowForm, boolean> = {
        workExperiences: cv.workExperiences.length > 0,
        educations: cv.educations.length > 0,
        projects: cv.projects.length > 0,
        skills: cv.skills.descriptions.length > 0,
        custom: cv.custom.descriptions.length > 0,
      }
      for (const section of sections) {
        settings.formToShow[section] = sectionToFormToShow[section]
      }
    }
    saveStateToLocalStorage({ cv, settings })
    router.push("/editor")
  }

  return (
    <div
      className={cx(
        "flex justify-center rounded-md border-2 border-dashed border-white px-6",
        isHoveredOnDropzone && "border-red-300",
        playgroundView ? "pb-6 pt-4" : "py-12",
        className,
      )}
      onDragOver={(event) => {
        event.preventDefault()
        setIsHoveredOnDropZone(true)
      }}
      onDragLeave={() => setIsHoveredOnDropZone(false)}
      onDrop={onDrop}
    >
      <div
        className={cx(
          "text-center",
          playgroundView ? "space-y-2" : "space-y-3",
        )}
      >
        {!playgroundView && (
          <Image
            src={addPdfSrc}
            className="mx-auto h-14 w-14"
            alt="Add Pdf"
            aria-hidden="true"
            priority
          />
        )}
        {!hasFile ? (
          <>
            <Label className={cx("", !playgroundView && "")}>
              Browse a pdf file or drop it here
            </Label>
            <Label className="flex text-sm">
              <LockClosedIcon className="mr-1 mt-1 h-3 w-3 text-foreground" />
              File data is used locally and never leaves your browser
            </Label>
          </>
        ) : (
          <div className="flex items-center justify-center gap-3 pt-3">
            <div className="pl-7 font-semibold">
              {file.name} - {getFileSizeString(file.size)}
            </div>
            <Button
              variant="ghost"
              type="button"
              className="rounded-md p-1"
              title="Remove file"
              onClick={onRemove}
            >
              <XMarkIcon className="h-6 w-6" />
            </Button>
          </div>
        )}
        <div className="pt-4">
          {!hasFile ? (
            <>
              <Label
                className={cx(
                  "cursor-pointer rounded-md px-6 pb-2.5 pt-2 shadow-sm text-white dark:text-black",
                  playgroundView
                    ? "border"
                    : "bg-primary text-primary-foreground hover:bg-primary/90",
                )}
              >
                Browse file
                <input
                  type="file"
                  className="sr-only"
                  accept=".pdf"
                  onChange={onInputChange}
                />
              </Label>
              {hasNonPdfFile && (
                <p className="mt-6 text-red-400">Only pdf file is supported</p>
              )}
            </>
          ) : (
            <>
              <div className="flex flex-col">
                {!playgroundView && (
                  <Button onClick={onImportClick}>Import and Continue</Button>
                )}
                <Label className={cx("", !playgroundView && "mt-6")}>
                  Note: {!playgroundView ? "Import" : "Parser"} works best on
                  single column cv
                </Label>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

const getFileSizeString = (filesizeB: number) => {
  const fileSizeKB = filesizeB / 1024
  const fileSizeMB = fileSizeKB / 1024
  if (fileSizeKB < 1000) {
    return fileSizeKB.toPrecision(3) + " KB"
  } else {
    return fileSizeMB.toPrecision(3) + " MB"
  }
}

export default CvDropzone
