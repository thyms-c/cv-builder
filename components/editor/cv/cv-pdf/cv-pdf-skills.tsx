import { View } from "@react-pdf/renderer"
import { Skills } from "../../../../lib/redux/types"
import { CvPDFBulletList, CvPDFSection } from "./common"
import { styles } from "./styles"

export const CvPDFSkills = ({
  heading,
  skills,
  themeColor,
  showBulletPoints,
}: {
  heading: string
  skills: Skills
  themeColor: string
  showBulletPoints: boolean
}) => {
  const { descriptions } = skills
  return (
    <CvPDFSection
      themeColor={themeColor}
      heading={heading}
    >
      <View style={{ ...styles.flexCol }}>
        <CvPDFBulletList
          items={descriptions}
          showBulletPoints={showBulletPoints}
        />
      </View>
    </CvPDFSection>
  )
}
