import { changeCustom, selectCustom } from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import {
  changeShowBulletPoints,
  selectShowBulletPoints,
} from "../../../lib/redux/settings-slice"
import { Form } from "./container-form"
import { BulletListIconButton } from "./container-form/icon-button"
import { BulletListTextArea } from "./container-form/input-group"

export const CustomForm = () => {
  const custom = useAppSelector(selectCustom)
  const dispatch = useAppDispatch()
  const { descriptions } = custom
  const form = "custom"
  const showBulletPoints = useAppSelector(selectShowBulletPoints(form))

  const handleCustomChange = (field: "descriptions", value: string[]) => {
    dispatch(changeCustom({ field, value }))
  }

  const handleShowBulletPoints = (value: boolean) => {
    dispatch(changeShowBulletPoints({ field: form, value }))
  }

  return (
    <Form form={form}>
      <div className="col-span-full grid grid-cols-6 gap-3">
        <div className="relative col-span-full">
          <BulletListTextArea
            label="Custom Textbox"
            labelClassName="col-span-full"
            name="descriptions"
            placeholder=""
            value={descriptions}
            onChange={handleCustomChange}
            showBulletPoints={showBulletPoints}
          />
          <div className="absolute left-[7.7rem] top-[0.07rem]">
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
