import { changeSkills, selectSkills } from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
  selectThemeColor,
} from "../../../lib/redux/settings-slice"
import { Form } from "./container-form"
import { BulletListIconButton } from "./container-form/icon-button"
import { BulletListTextArea } from "./container-form/input-group"

export const SkillsForm = () => {
  const skills = useAppSelector(selectSkills)
  const dispatch = useAppDispatch()
  const { descriptions } = skills
  const form = "skills"
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form))
  const themeColor = useAppSelector(selectThemeColor) || "#38bdf8"

  const handleSkillsChange = (field: "descriptions", value: string[]) => {
    dispatch(changeSkills({ field, value }))
  }

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }))
  }

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextArea
            label="Skills List"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder=""
            value={descriptions}
            onChange={handleSkillsChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[4.5rem] top-[0.07rem]">
            <BulletListIconButton
              showBulletPoints={showBulletPoints}
              onClick={handleShowBulletPoints}
            />
          </div>
        </div>
      </div>
    </Form>
  )
}
