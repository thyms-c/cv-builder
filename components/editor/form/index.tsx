import { useState } from "react"
import { cx } from "../../../lib/cx"
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "../../../lib/redux/hooks"
import { ShowForm, selectFormsOrder } from "../../../lib/redux/settings-slice"
import { CustomForm } from "./custom-form"
import { EducationsForm } from "./educations-form"
import { ProfileForm } from "./profile-form"
import { ProjectsForm } from "./projects-form"
import { SkillsForm } from "./skills-form"
import { ThemeForm } from "./theme-form"
import { WorkExperiencesForm } from "./work-experiences-form"

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
}

export const CvForm = () => {
  useSetInitialStore()
  useSaveStateToLocalStorageOnChange()

  const [isHover, setIsHover] = useState(false)

  const formsOrder = useAppSelector(selectFormsOrder)

  return (
    <div
      className={cx(
        "flex justify-center scrollbar scrollbar-track-gray-100 scrollbar-w-3 md:h-[calc(100vh-var(--top-nav-bar-height))] md:justify-end md:overflow-y-scroll",
        isHover && "scrollbar-thumb-gray-200",
      )}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <section className="flex flex-col max-w-2xl gap-8 p-[var(--Cv-padding)] mt-8 mr-4">
        <ProfileForm />
        {formsOrder.map((form) => {
          const Component = formTypeToComponent[form]
          return <Component key={form} />
        })}
        <ThemeForm />
      </section>
    </div>
  )
}
