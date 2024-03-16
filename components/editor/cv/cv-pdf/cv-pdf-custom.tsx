import { View } from "@react-pdf/renderer"
import { Custom } from "../../../../lib/redux/types"
import { CvPDFBulletList, CvPDFSection } from "./common"
import { styles } from "./styles"

export const CvPDFCustom = ({
  heading,
  custom,
  themeColor,
  showBulletPoints,
}: {
  heading: string
  custom: Custom
  themeColor: string
  showBulletPoints: boolean
}) => {
  const { descriptions } = custom

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
