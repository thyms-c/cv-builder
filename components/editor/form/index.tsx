import { cx } from "class-variance-authority";
import { useState } from "react";
import {
  useAppSelector,
  useSaveStateToLocalStorageOnChange,
  useSetInitialStore,
} from "../../../lib/redux/hooks";
import { ShowForm, selectFormsOrder } from "../../../lib/redux/settings-slice";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { CustomForm } from "./custom-form";
import { EducationsForm } from "./educations-form";
import { ProfileForm } from "./profile-form";
import { ProjectsForm } from "./projects-form";
import { SkillsForm } from "./skills-form";
import { ThemeForm } from "./theme-form";
import { WorkExperiencesForm } from "./work-experiences-form";

const formTypeToComponent: { [type in ShowForm]: () => JSX.Element } = {
  workExperiences: WorkExperiencesForm,
  educations: EducationsForm,
  projects: ProjectsForm,
  skills: SkillsForm,
  custom: CustomForm,
};

export const CvForm = () => {
  useSetInitialStore();
  useSaveStateToLocalStorageOnChange();

  const [isHover, setIsHover] = useState(false);

  const formsOrder = useAppSelector(selectFormsOrder);

  return (
    <>
      <div className="flex">
        <div
          className={cx(
            "flex justify-center w-full md:h-[calc(100vh-var(--top-nav-bar-height))] md:overflow-y-scroll",
            isHover && ""
          )}
          onMouseOver={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <div className="flex flex-col space-y-8 mr-4 pt-4">
            <ProfileForm />
            {formsOrder.map((form) => {
              const Component = formTypeToComponent[form];
              return <Component key={form} />;
            })}
            <ThemeForm />
          </div>
        </div>
      </div>
    </>
  );
};
