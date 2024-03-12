import { View } from "@react-pdf/renderer"
import { Project } from "../../../../lib/redux/types"
import { CvPDFBulletList, CvPDFSection, CvPDFText } from "./common"
import { spacing, styles } from "./styles"

export const CvPDFProject = ({
  heading,
  projects,
  themeColor,
}: {
  heading: string
  projects: Project[]
  themeColor: string
}) => {
  return (
    <CvPDFSection
      themeColor={themeColor}
      heading={heading}
    >
      {projects.map(({ project, date, descriptions }, idx) => {
        return (
          <View key={idx}>
            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: spacing["0.5"],
              }}
            >
              <CvPDFText bold={true}>{project}</CvPDFText>
              <CvPDFText>{date}</CvPDFText>
            </View>

            <View style={{ ...styles.flexCol, marginTop: spacing["0.5"] }}>
              <CvPDFBulletList items={descriptions} />
            </View>
          </View>
        )
      })}
    </CvPDFSection>
  )
}
