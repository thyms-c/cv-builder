import { Document, Page, View } from "@react-pdf/renderer"
import {
  DEFAULT_FONT_COLOR,
  Settings,
  ShowForm,
} from "../../../../lib/redux/settings-slice"
import { Cv } from "../../../../lib/redux/types"
import { CvPDFCustom } from "./cv-pdf-custom"
import { CvPDFEducation } from "./cv-pdf-education"
import { CvPDFProfile } from "./cv-pdf-profile"
import { CvPDFProject } from "./cv-pdf-project"
import { CvPDFSkills } from "./cv-pdf-skills"
import { CvPDFWorkExperience } from "./cv-pdf-work-experience"
import { spacing, styles } from "./styles"

export const CvPDF = ({
  cv,
  settings,
  isPDF = false,
}: {
  cv: Cv
  settings: Settings
  isPDF?: boolean
}) => {
  const { profile, workExperiences, educations, projects, skills, custom } = cv
  const { name } = profile

  const {
    documentSize,
    fontFamily,
    fontSize,
    themeColor,
    formToHeading,
    formsOrder,
    formToShow,
    showBulletPoints,
  } = settings

  const showFormsOrder = formsOrder.filter((form) => formToShow[form])

  const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
    workExperiences: () => (
      <CvPDFWorkExperience
        heading={formToHeading["workExperiences"]}
        workExperiences={workExperiences}
        themeColor={themeColor}
      />
    ),
    educations: () => (
      <CvPDFEducation
        heading={formToHeading["educations"]}
        educations={educations}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["educations"]}
      />
    ),
    projects: () => (
      <CvPDFProject
        heading={formToHeading["projects"]}
        projects={projects}
        themeColor={themeColor}
      />
    ),
    skills: () => (
      <CvPDFSkills
        heading={formToHeading["skills"]}
        skills={skills}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["skills"]}
      />
    ),
    custom: () => (
      <CvPDFCustom
        heading={formToHeading["custom"]}
        custom={custom}
        themeColor={themeColor}
        showBulletPoints={showBulletPoints["custom"]}
      />
    ),
  }

  return (
    <>
      <Document
        title={`${name} cv`}
        author={name}
        producer={"Inhouse"}
      >
        <Page
          size={documentSize === "A4" ? "A4" : "LETTER"}
          style={{
            ...styles.flexCol,
            color: DEFAULT_FONT_COLOR,
            fontFamily,
            fontSize: fontSize + "pt",
          }}
        >
          {Boolean(settings.themeColor) && (
            <View
            // style={{
            //   width: spacing["full"],
            //   height: spacing[3.5],
            //   backgroundColor: themeColor,
            // }}
            />
          )}
          <View
            style={{
              ...styles.flexCol,
              padding: `${spacing[0]} ${spacing[10]}`,
            }}
          >
            <CvPDFProfile
              profile={profile}
              themeColor={themeColor}
              isPDF={isPDF}
            />
            {showFormsOrder.map((form) => {
              const Component = formTypeToComponent[form]
              return <Component key={form} />
            })}
          </View>
        </Page>
      </Document>
    </>
  )
}
