import { Link, Text, View } from "@react-pdf/renderer"
import type { Style } from "@react-pdf/types"
import { DEFAULT_FONT_COLOR } from "../../../../../lib/redux/settings-slice"
import { spacing, styles } from "../styles"

export const CvPDFSection = ({
  themeColor,
  heading,
  style,
  children,
}: {
  themeColor?: string
  heading?: string
  style?: Style
  children: React.ReactNode
}) => (
  <View
    style={{
      ...styles.flexCol,
      gap: spacing["2"],
      marginTop: spacing["5"],
      ...style,
    }}
  >
    {heading && (
      <View style={{ ...styles.flexRow, alignItems: "center" }}>
        {themeColor && (
          <View
            style={
              {
                // height: "3.75pt",
                // width: "30pt",
                // backgroundColor: themeColor,
                // marginRight: spacing["3.5"],
              }
            }
          />
        )}
        <Text
          style={{
            fontWeight: "bold",
            letterSpacing: "0.3pt",
          }}
        >
          {heading}
        </Text>
      </View>
    )}
    {children}
  </View>
)

export const CvPDFText = ({
  bold = false,
  themeColor,
  style = {},
  children,
}: {
  bold?: boolean
  themeColor?: string
  style?: Style
  children: React.ReactNode
}) => {
  return (
    <Text
      style={{
        color: themeColor || DEFAULT_FONT_COLOR,
        fontWeight: bold ? "bold" : "normal",
        ...style,
      }}
    >
      {children}
    </Text>
  )
}

export const CvPDFLink = ({
  src,
  isPDF,
  children,
}: {
  src: string
  isPDF: boolean
  children: React.ReactNode
}) => {
  if (isPDF) {
    return (
      <Link
        src={src}
        style={{ textDecoration: "none" }}
      >
        {children}
      </Link>
    )
  }
  return (
    <a
      href={src}
      style={{ textDecoration: "none" }}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  )
}

export const CvPDFBulletList = ({
  items,
  showBulletPoints = true,
}: {
  items: string[]
  showBulletPoints?: boolean
}) => {
  return (
    <>
      {items.map((item, idx) => (
        <View
          style={{ ...styles.flexRow }}
          key={idx}
        >
          {showBulletPoints && (
            <CvPDFText
              style={{
                paddingLeft: spacing["2"],
                paddingRight: spacing["2"],
                lineHeight: "1.3",
              }}
              bold={true}
            >
              {"."}
            </CvPDFText>
          )}

          <CvPDFText style={{ lineHeight: "1.3", flexGrow: 1, flexBasis: 0 }}>
            {item}
          </CvPDFText>
        </View>
      ))}
    </>
  )
}
