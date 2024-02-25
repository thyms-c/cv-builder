import { changeProjects, selectProjects } from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import { Project } from "../../../lib/redux/types"
import { Form, FormSection } from "./container-form"
import { BulletListTextArea, Input } from "./container-form/input-group"
import { CreateHandleChangeArgsWithDescriptions } from "./types"

export const ProjectsForm = () => {
  const projects = useAppSelector(selectProjects)
  const dispatch = useAppDispatch()
  const showDelete = projects.length > 1

  return (
    <Form
      form="projects"
      addButtonText="Add Project"
    >
      {projects.map(({ project, date, descriptions }, idx) => {
        const handleProjectChange = (
          ...[field, value]: CreateHandleChangeArgsWithDescriptions<Project>
        ) => {
          dispatch(changeProjects({ idx, field, value } as any))
        }

        const showMoveUp = idx !== 0
        const showMoveDown = idx !== projects.length - 1

        return (
          <FormSection
            key={idx}
            form="projects"
            idx={idx}
            showMoveUp={showMoveUp}
            showMoveDown={showMoveDown}
            showDelete={showDelete}
            deleteButtonTooltipText="Delete project"
          >
            <Input
              label="Project Name"
              labelClassName="col-span-4"
              name="project"
              placeholder="XYZ Project"
              value={project}
              onChange={handleProjectChange}
            />
            <Input
              label="Date"
              labelClassName="col-span-2"
              name="date"
              placeholder="Jan 2022 - Present"
              value={date}
              onChange={handleProjectChange}
            />
            <BulletListTextArea
              label="Description"
              labelClassName="col-span-full"
              name="descriptions"
              placeholder="Bullet Points"
              value={descriptions}
              onChange={handleProjectChange}
            />
          </FormSection>
        )
      })}
    </Form>
  )
}
