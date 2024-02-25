import { View } from "@react-pdf/renderer"
import { Profile } from "../../../../lib/redux/types"
import { CvPDFLink, CvPDFSection, CvPDFText } from "./common"
import { CvPDFIcon, IconType } from "./common/cv-pdf-icon"
import { spacing, styles } from "./styles"

export const CvPDFProfile = ({
  profile,
  themeColor,
  isPDF,
}: {
  profile: Profile
  themeColor: string
  isPDF: boolean
}) => {
  const { name, email, phone, url, summary, location } = profile

  const iconProps = { email, phone, location, url }

  return (
    <CvPDFSection style={{ marginTop: spacing["4"] }}>
      <CvPDFText
        bold={true}
        themeColor={themeColor}
        style={{ fontSize: "20pt" }}
      >
        {name}
      </CvPDFText>
      {summary && <CvPDFText>{summary}</CvPDFText>}
      <View
        style={{
          ...styles.flexRowBetween,
          flexWrap: "wrap",
          marginTop: spacing["0.5"],
        }}
      >
        {Object.entries(iconProps).map(([key, value]) => {
          if (!value) return null

          let iconType = key as IconType
          if (key === "url") {
            if (value.includes("github")) {
              iconType = "url_github"
            } else if (value.includes("linkedin")) {
              iconType = "url_linkedin"
            }
          }

          const shouldUseLinkWrapper = ["email", "url", "phone"].includes(key)

          const Wrapper = ({ children }: { children: React.ReactNode }) => {
            if (!shouldUseLinkWrapper) return <>{children}</>

            let src = ""
            switch (key) {
              case "email":
                src = `mailTo:${value}`
                break
              case "phone": {
                src = `tel:${value.replace(/[^\d+]/g, "")}`
                break
              }
              default: {
                src = value.startsWith("http") ? value : `https://${value}`
              }
            }

            return (
              <CvPDFLink
                src={src}
                isPDF={isPDF}
              >
                {children}
              </CvPDFLink>
            )
          }

          return (
            <View
              key={key}
              style={{
                ...styles.flexRow,
                alignItems: "center",
                gap: spacing["1"],
              }}
            >
              <CvPDFIcon
                type={iconType}
                isPDF={isPDF}
              />
              <Wrapper>
                <CvPDFText>{value}</CvPDFText>
              </Wrapper>
            </View>
          )
        })}
      </View>
    </CvPDFSection>
  )
}
