import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  LightBulbIcon,
  PlusSmallIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline"
import {
  addSectionInForm,
  deleteSectionInFormByIdx,
  moveSectionInForm,
} from "../../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks"
import {
  ShowForm,
  changeFormHeading,
  changeFormOrder,
  changeShowForm,
  selectHeadingByForm,
  selectIsFirstForm,
  selectIsLastForm,
  selectShowByForm,
} from "../../../../lib/redux/settings-slice"
import { Button } from "../../../ui/button"
import { Input } from "../../../ui/input"
import { ExpanderWithHeightTransition } from "./expander-with-height-transition"
import { DeletIconButton, MoveIconButton, ShowIconButton } from "./icon-button"

const FORM_TO_ICON: { [section in ShowForm]: typeof BuildingOfficeIcon } = {
  workExperiences: BuildingOfficeIcon,
  educations: AcademicCapIcon,
  projects: LightBulbIcon,
  skills: WrenchIcon,
  custom: WrenchIcon,
}

export const BaseForm = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <section
    className={`flex flex-col gap-3 rounded-md bg-white dark:bg-zinc-900 border p-6 pt-4 shadow transition-opacity duration-200 ${className}`}
  >
    {children}
  </section>
)

export const Form = ({
  form,
  addButtonText,
  children,
}: {
  form: ShowForm
  addButtonText?: string
  children: React.ReactNode
}) => {
  const showForm = useAppSelector(selectShowByForm(form))
  const heading = useAppSelector(selectHeadingByForm(form))

  const dispatch = useAppDispatch()

  const setShowForm = (showForm: boolean) => {
    dispatch(changeShowForm({ field: form, value: showForm }))
  }

  const setHeading = (heading: string) => {
    dispatch(changeFormHeading({ field: form, value: heading }))
  }

  const isFirstForm = useAppSelector(selectIsFirstForm(form))
  const isLastForm = useAppSelector(selectIsLastForm(form))

  const handleMoveclick = (type: "up" | "down") => {
    dispatch(changeFormOrder({ form, type }))
  }

  const Icon = FORM_TO_ICON[form]

  return (
    <BaseForm
      className={`transition-opacity duration-200 ${
        showForm ? "pb-6" : "pb-2 opacity-60"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex grow items-center gap-2">
          <Icon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
          <Input
            type="text"
            // className="block w-full border-b border-transparent text-lg font-semibold tracking-wide text-gray-900 outline-none hover:border-gray-300 hover:shadow-sm focus:border-gray-300 focus:shadow-sm"
            value={heading}
            onChange={(e) => setHeading(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-0.5">
          {!isFirstForm && (
            <MoveIconButton
              type="up"
              onClick={handleMoveclick}
            />
          )}
          {!isLastForm && (
            <MoveIconButton
              type="down"
              onClick={handleMoveclick}
            />
          )}
          <ShowIconButton
            show={showForm}
            setShow={setShowForm}
          />
        </div>
      </div>
      <ExpanderWithHeightTransition expanded={showForm}>
        {children}
      </ExpanderWithHeightTransition>
      {showForm && addButtonText && (
        <div className="mt-2 flex justify-end">
          <Button
            type="button"
            onClick={() => {
              dispatch(addSectionInForm({ form }))
            }}
            // className="flex items-center rounded-md bg-white py-2 pl-3 pr-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            <PlusSmallIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
            {addButtonText}
          </Button>
        </div>
      )}
    </BaseForm>
  )
}

export const FormSection = ({
  form,
  idx,
  showMoveUp,
  showMoveDown,
  showDelete,
  deleteButtonTooltipText,
  children,
}: {
  form: ShowForm
  idx: number
  showMoveUp: boolean
  showMoveDown: boolean
  showDelete: boolean
  deleteButtonTooltipText: string
  children: React.ReactNode
}) => {
  const dispatch = useAppDispatch()

  const handleDeleteClick = () => {
    dispatch(deleteSectionInFormByIdx({ form, idx }))
  }

  const handleMoveClick = (direction: "up" | "down") => {
    dispatch(moveSectionInForm({ form, direction, idx }))
  }

  return (
    <>
      {idx !== 0 && (
        <div className="mb-4 mt-6 border-t-2 border-dotted border-gray-200" />
      )}
      <div className="relative grid grid-cols-6 gap-3">
        {children}
        <div className={`absolute right-0 top-0 flex gap-0.5`}>
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            } ${showMoveDown ? "" : "-mr-6"}`}
          >
            <MoveIconButton
              type="up"
              size="small"
              onClick={() => handleMoveClick("up")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showMoveUp ? "" : "invisible opacity-0"
            }`}
          >
            <MoveIconButton
              type="down"
              size="small"
              onClick={() => handleMoveClick("down")}
            />
          </div>
          <div
            className={`transition-all duration-300 ${
              showDelete ? "" : "invisible opacity-0"
            }`}
          >
            <DeletIconButton
              onClick={handleDeleteClick}
              tooltipText={deleteButtonTooltipText}
            />
          </div>
        </div>
      </div>
    </>
  )
}
