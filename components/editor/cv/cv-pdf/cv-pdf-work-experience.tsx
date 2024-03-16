import { View } from "@react-pdf/renderer"
import { WorkExperience } from "../../../../lib/redux/types"
import { CvPDFBulletList, CvPDFSection, CvPDFText } from "./common"
import { spacing, styles } from "./styles"

export const CvPDFWorkExperience = ({
  heading,
  workExperiences,
  themeColor,
}: {
  heading: string
  workExperiences: WorkExperience[]
  themeColor: string
}) => {
  return (
    <CvPDFSection
      themeColor={themeColor}
      heading={heading}
    >
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const hideCompanyName =
          idx > 0 && company === workExperiences[idx - 1].company

        return (
          <View
            key={idx}
            style={idx !== 0 ? { marginTop: spacing["2"] } : {}}
          >
            {!hideCompanyName && <CvPDFText bold={true}>{company}</CvPDFText>}
            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: hideCompanyName
                  ? "-" + spacing["1"]
                  : spacing["1.5"],
              }}
            >
              <CvPDFText>{jobTitle}</CvPDFText>
              <CvPDFText>{date}</CvPDFText>
            </View>
            <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
              <CvPDFBulletList items={descriptions} />
            </View>
          </View>
        )
      })}
    </CvPDFSection>
  )
}
