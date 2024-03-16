import { Fragment } from "react"
import { cx } from "../../lib/cx"
import { deepClone } from "../../lib/parse-cv-from-pdf/deep-clone"
import {
  initialEducation,
  initialWorkExperience,
} from "../../lib/redux/cv-slice"
import { Cv } from "../../lib/redux/types"

const TableRowHeader = ({ children }: { children: React.ReactNode }) => (
  <tr className="divide-x bg-gray-50">
    <th
      className="px-3 py-2 font-semibold"
      scope="colgroup"
      colSpan={2}
    >
      {children}
    </th>
  </tr>
)

const TableRow = ({
  label,
  value,
  className,
}: {
  label: string
  value: string | string[]
  className?: string | false
}) => (
  <tr className={cx("divide-x", className)}>
    <th
      className="px-3 py-2 font-medium"
      scope="row"
    >
      {label}
    </th>
    <td className="w-full px-3 py-2">
      {typeof value === "string"
        ? value
        : value.map((x, idx) => <Fragment key={idx}>• {x}</Fragment>)}
    </td>
  </tr>
)

export const CvTable = ({ cv }: { cv: Cv }) => {
  const educations =
    cv.educations.length === 0 ? [deepClone(initialEducation)] : cv.educations
  const workExperiences =
    cv.workExperiences.length === 0
      ? [deepClone(initialWorkExperience)]
      : cv.workExperiences
  const skills = [...cv.skills.descriptions]

  return (
    <table className="mt-2 w-full border text-sm text-gray-900">
      <tbody className="divide-y text-left align-top">
        <TableRowHeader>Profile</TableRowHeader>
        <TableRow
          label="Name"
          value={cv.profile.name}
        />
        <TableRow
          label="Email"
          value={cv.profile.email}
        />
        <TableRow
          label="Phone"
          value={cv.profile.phone}
        />
        <TableRow
          label="Location"
          value={cv.profile.location}
        />
        <TableRow
          label="Link"
          value={cv.profile.url}
        />
        <TableRow
          label="Summary"
          value={cv.profile.summary}
        />
        <TableRowHeader>Education</TableRowHeader>
        {educations.map((education, idx) => (
          <Fragment key={idx}>
            <TableRow
              label="School"
              value={education.school}
            />
            <TableRow
              label="Degree"
              value={education.degree}
            />
            <TableRow
              label="GPA"
              value={education.gpa}
            />
            <TableRow
              label="Date"
              value={education.date}
            />
            <TableRow
              label="Descriptions"
              value={education.descriptions}
              className={
                educations.length - 1 !== 0 &&
                idx !== educations.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        <TableRowHeader>Work Experience</TableRowHeader>
        {workExperiences.map((workExperience, idx) => (
          <Fragment key={idx}>
            <TableRow
              label="Company"
              value={workExperience.company}
            />
            <TableRow
              label="Job Title"
              value={workExperience.jobTitle}
            />
            <TableRow
              label="Date"
              value={workExperience.date}
            />
            <TableRow
              label="Descriptions"
              value={workExperience.descriptions}
              className={
                workExperiences.length - 1 !== 0 &&
                idx !== workExperiences.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        {cv.projects.length > 0 && <TableRowHeader>Projects</TableRowHeader>}
        {cv.projects.map((project, idx) => (
          <Fragment key={idx}>
            <TableRow
              label="Project"
              value={project.project}
            />
            <TableRow
              label="Date"
              value={project.date}
            />
            <TableRow
              label="Descriptions"
              value={project.descriptions}
              className={
                cv.projects.length - 1 !== 0 &&
                idx !== cv.projects.length - 1 &&
                "!border-b-4"
              }
            />
          </Fragment>
        ))}
        <TableRowHeader>Skills</TableRowHeader>
        <TableRow
          label="Descriptions"
          value={skills}
        />
      </tbody>
    </table>
  )
}
