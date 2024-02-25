import { View } from "@react-pdf/renderer"
import { Education } from "../../../../lib/redux/types"
import { CvPDFBulletList, CvPDFSection, CvPDFText } from "./common"
import { spacing, styles } from "./styles"

export const CvPDFEducation = ({
  heading,
  educations,
  themeColor,
  showBulletPoints,
}: {
  heading: string
  educations: Education[]
  themeColor: string
  showBulletPoints: boolean
}) => {
  return (
    <CvPDFSection
      themeColor={themeColor}
      heading={heading}
    >
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const hideScoolName = idx > 0 && school === educations[idx - 1].school

        const showDescriptions = descriptions.join() !== ""

        return (
          <View key={idx}>
            {!hideScoolName && <CvPDFText bold={true}>{school}</CvPDFText>}
            <View
              style={{
                ...styles.flexRowBetween,
                marginTop: hideScoolName ? "-" + spacing["1"] : spacing["1.5"],
              }}
            >
              <CvPDFText>{`${
                gpa ? `${degree} - ${Number(gpa) ? gpa + " GPA" : gpa}` : degree
              }`}</CvPDFText>
              <CvPDFText>{date}</CvPDFText>
            </View>
            {showDescriptions && (
              <View style={{ ...styles.flexCol, marginTop: spacing["1.5"] }}>
                <CvPDFBulletList
                  items={descriptions}
                  showBulletPoints={showBulletPoints}
                />
              </View>
            )}
          </View>
        )
      })}
    </CvPDFSection>
  )
}
