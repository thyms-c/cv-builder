import {
  changeWorkExperience,
  selectWorkExperiences,
} from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import { WorkExperience } from "../../../lib/redux/types"
import { Form, FormSection } from "./container-form"
import { BulletListTextArea, Input } from "./container-form/input-group"
import { CreateHandleChangeArgsWithDescriptions } from "./types"

export const WorkExperiencesForm = () => {
  const workExperiences = useAppSelector(selectWorkExperiences)
  const dispatch = useAppDispatch()

  const showDelete = workExperiences.length > 1

  return (
    <Form
      form="workExperiences"
      addButtonText="Add Job"
    >
      {workExperiences.map(({ company, jobTitle, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[
            field,
            value,
          ]: CreateHandleChangeArgsWithDescriptions<WorkExperience>
        ) => {
          dispatch(changeWorkExperience({ idx, field, value } as any))
        }

        const showMoveUp = idx !== 0
        const showMoveDown = idx !== workExperiences.length - 1

        return (
          <FormSection
            key={idx}
            form="workExperiences"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete job"
          >
            <Input
              label="Company"
              labelClassName="col-span-full"
              name="company"
              placeholder="XYZ Company"
              value={company}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Job Totle"
              labelClassName="col-span-4"
              name="jobTitle"
              placeholder="Software Engineer"
              value={jobTitle}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jan 2022 - Present"
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <BulletListTextArea
              label="Description"
              labelClassName="col-span-full"
              name="descriptions"
              placeholder="Bullet points"
              value={descriptions}
              onChange={handleWorkExperienceChange}
            />
          </FormSection>
        )
      })}
    </Form>
  )
}
