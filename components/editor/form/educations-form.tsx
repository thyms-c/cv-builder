import { changeEducations, selectEducations } from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "../../../lib/redux/settings-slice"
import { Education } from "../../../lib/redux/types"
import { Form, FormSection } from "./container-form"
import { BulletListIconButton } from "./container-form/icon-button"
import { BulletListTextArea, Input } from "./container-form/input-group"
import { CreateHandleChangeArgsWithDescriptions } from "./types"

export const EducationsForm = () => {
  const educations = useAppSelector(selectEducations)
  const dispatch = useAppDispatch()
  const showDelete = educations.length > 1
  const form = "educations"
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form))

  return (
    <Form
      form={form}
      addButtonText="Add School"
    >
      {educations.map(({ school, degree, gpa, date, descriptions }, idx) => {
        const handleWorkExperienceChange = (
          ...[field, value]: CreateHandleChangeArgsWithDescriptions<Education>
        ) => {
          dispatch(changeEducations({ idx, field, value } as any))
        }

        const handleShowBulletPoints = (value: boolean) => {
          dispatch(changeShowBulletPoints({ field: form, value }))
        }

        const showMoveUp = idx !== 0
        const showMoveDown = idx !== educations.length - 1

        return (
          <FormSection
            key={idx}
            form="educations"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete school"
          >
            <Input
              label="School"
              labelClassName="col-span-4"
              name="school"
              placeholder=""
              value={school}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder=""
              value={date}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="Degree & Major"
              labelClassName="col-span-4"
              name="degree"
              placeholder=""
              value={degree}
              onChange={handleWorkExperienceChange}
            />
            <Input
              label="GPA"
              labelClassName="col-span-2"
              name="gpa"
              placeholder=""
              value={gpa}
              onChange={handleWorkExperienceChange}
            />
            <div className="relative col-span-full">
              <BulletListTextArea
                label="Additional Information (Optional)"
                labelClassName="col-span-full"
                name="descriptions"
                placeholder=""
                value={descriptions}
                onChange={handleWorkExperienceChange}
                showBulletPoints={showBulletPoints}
              />
              <div className="absolute left-[15.6rem] top-[0.07rem]">
                <BulletListIconButton
                  showBulletPoints={showBulletPoints}
                  onClick={handleShowBulletPoints}
                />
              </div>
            </div>
          </FormSection>
        )
      })}
    </Form>
  )
}
