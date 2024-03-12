export interface Profile {
  name: string
  email: string
  phone: string
  url: string
  summary: string
  location: string
}

export interface WorkExperience {
  company: string
  jobTitle: string
  date: string
  descriptions: string[]
}

export interface Education {
  school: string
  degree: string
  date: string
  gpa: string
  descriptions: string[]
}

export interface Project {
  project: string
  date: string
  descriptions: string[]
}

export interface Skills {
  descriptions: string[]
}

export interface Custom {
  descriptions: string[]
}

export interface Cv {
  profile: Profile
  workExperiences: WorkExperience[]
  educations: Education[]
  projects: Project[]
  skills: Skills
  custom: Custom
}

export type CvKey = keyof Cv
