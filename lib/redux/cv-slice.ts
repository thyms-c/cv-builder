import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { ShowForm } from "./settings-slice"
import { RootState } from "./store"
import {
  Cv,
  Education,
  Profile,
  Project,
  Skills,
  WorkExperience,
} from "./types"

export const initialProfile: Profile = {
  name: "",
  summary: "",
  email: "",
  phone: "",
  location: "",
  url: "",
}

export const initialWorkExperience: WorkExperience = {
  company: "",
  jobTitle: "",
  date: "",
  descriptions: [],
}

export const initialEducation: Education = {
  school: "",
  date: "",
  degree: "",
  gpa: "",
  descriptions: [],
}

export const initialProject: Project = {
  project: "",
  date: "",
  descriptions: [],
}

export const initialSkills: Skills = {
  descriptions: [],
}

export const initialCustom = {
  descriptions: [],
}

export const initialCvState: Cv = {
  profile: initialProfile,
  workExperiences: [initialWorkExperience],
  educations: [initialEducation],
  projects: [initialProject],
  skills: initialSkills,
  custom: initialCustom,
}

export type CreateChangeActionWithDescriptions<T> = {
  idx: number
} & (
  | {
      field: Exclude<keyof T, "descriptions">
      value: string
    }
  | {
      field: "descriptions"
      value: string[]
    }
)

export const cvSlice = createSlice({
  name: "cv",
  initialState: initialCvState,
  reducers: {
    changeProfile: (
      draft,
      action: PayloadAction<{ field: keyof Profile; value: string }>,
    ) => {
      const { field, value } = action.payload
      draft.profile[field] = value
    },
    changeWorkExperience: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<WorkExperience>>,
    ) => {
      const { idx, field, value } = action.payload
      const workExperience = draft.workExperiences[idx]
      workExperience[field] = value as any
    },
    changeEducations: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<Education>>,
    ) => {
      const { idx, field, value } = action.payload
      const education = draft.educations[idx]
      education[field] = value as any
    },
    changeProjects: (
      draft,
      action: PayloadAction<CreateChangeActionWithDescriptions<Project>>,
    ) => {
      const { idx, field, value } = action.payload
      const project = draft.projects[idx]
      project[field] = value as any
    },
    changeSkills: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>,
    ) => {
      const { field } = action.payload
      if (field === "descriptions") {
        const { value } = action.payload
        draft.skills.descriptions = value
      }
    },
    changeCustom: (
      draft,
      action: PayloadAction<{ field: "descriptions"; value: string[] }>,
    ) => {
      const { value } = action.payload
      draft.custom.descriptions = value
    },
    addSectionInForm: (draft, action: PayloadAction<{ form: ShowForm }>) => {
      const { form } = action.payload
      switch (form) {
        case "workExperiences": {
          draft.workExperiences.push(structuredClone(initialWorkExperience))
          return draft
        }
        case "educations": {
          draft.educations.push(structuredClone(initialEducation))
          return draft
        }
        case "projects": {
          draft.projects.push(structuredClone(initialProject))
          return draft
        }
      }
    },
    moveSectionInForm: (
      draft,
      action: PayloadAction<{
        form: ShowForm
        idx: number
        direction: "up" | "down"
      }>,
    ) => {
      const { form, idx, direction } = action.payload
      if (form !== "skills" && form !== "custom") {
        if (
          (idx === 0 && direction === "up") ||
          (idx === draft[form].length - 1 && direction === "down")
        ) {
          return draft
        }

        const section = draft[form][idx]
        if (direction === "up") {
          draft[form][idx] = draft[form][idx - 1]
          draft[form][idx - 1] = section
        } else {
          draft[form][idx] = draft[form][idx + 1]
          draft[form][idx + 1] = section
        }
      }
    },
    deleteSectionInFormByIdx: (
      draft,
      action: PayloadAction<{ form: ShowForm; idx: number }>,
    ) => {
      const { form, idx } = action.payload
      if (form !== "skills" && form !== "custom") {
        draft[form].splice(idx, 1)
      }
    },
    setCv: (draft, action: PayloadAction<Cv>) => {
      return action.payload
    },
  },
})

export const {
  changeCustom,
  changeEducations,
  changeProjects,
  changeProfile,
  changeSkills,
  changeWorkExperience,
  addSectionInForm,
  moveSectionInForm,
  deleteSectionInFormByIdx,
  setCv,
} = cvSlice.actions

export const selectCv = (state: RootState) => state.cv
export const selectProfile = (state: RootState) => state.cv.profile
export const selectWorkExperiences = (state: RootState) =>
  state.cv.workExperiences
export const selectEducations = (state: RootState) => state.cv.educations
export const selectProjects = (state: RootState) => state.cv.projects
export const selectSkills = (state: RootState) => state.cv.skills
export const selectCustom = (state: RootState) => state.cv.custom

export default cvSlice.reducer
