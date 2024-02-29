import { Skills } from "../../redux/types"
import { CvSectionToLines } from "../types"
import {
  getBulletPointsFromLines,
  getDescriptionsLineIdx,
} from "./lib/bullet-points"
import { getSectionLinesByKeywords } from "./lib/get-section-lines"

export const extractSkills = (sections: CvSectionToLines) => {
  const lines = getSectionLinesByKeywords(sections, ["skill"])
  const descriptionLineIdx = getDescriptionsLineIdx(lines) ?? 0
  const descriptionLines = lines.slice(descriptionLineIdx)
  const descriptions = getBulletPointsFromLines(descriptionLines)

  if (descriptionLineIdx !== 0) {
    const featuredSkillLines = lines.slice(0, descriptionLineIdx)
    const featuredSkillsTextItems = featuredSkillLines
      .flat()
      .filter((item) => item.text.trim())
      .slice(0, 6)
  }

  const skills: Skills = {
    descriptions,
  }

  return { skills }
}
