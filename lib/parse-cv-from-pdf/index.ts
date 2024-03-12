import { extractCvFromSections } from "./extract-cv-from-sections"
import { groupLinesIntoSections } from "./group-lines-into-sections"
import { groupTextItemsIntoLines } from "./group-text-items-into-lines"
import { readPdf } from "./read-pdf"

export const parseCvFromPdf = async (fileUrl: string) => {
  //step 1. Read a pdf Cv file into text items to prepare for processing
  const textItems = await readPdf(fileUrl)

  //step 2. Group text items into lines
  const lines = groupTextItemsIntoLines(textItems)

  //step 3. Group lines into sections
  const sections = groupLinesIntoSections(lines)

  //step 4. Extract Cv from sections
  const Cv = extractCvFromSections(sections)

  return Cv
}
