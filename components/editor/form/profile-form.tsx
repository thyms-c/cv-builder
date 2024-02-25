import { changeProfile, selectProfile } from "../../../lib/redux/cv-slice"
import { useAppDispatch, useAppSelector } from "../../../lib/redux/hooks"
import { Profile } from "../../../lib/redux/types"
import { BaseForm } from "./container-form"
import { Input } from "./container-form/input-group"

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile)
  const dispatch = useAppDispatch()

  const { name, email, phone, url, summary, location } = profile

  const handleProfileChange = (field: keyof Profile, value: string) => {
    dispatch(changeProfile({ field, value }))
  }

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder=""
          value={name}
          onChange={handleProfileChange}
        />
        <Input
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder=""
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder=""
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder=""
          value={phone}
          onChange={handleProfileChange}
        />
        <Input
          label="Website"
          labelClassName="col-span-4"
          name="url"
          placeholder=""
          value={url}
          onChange={handleProfileChange}
        />
        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder=""
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  )
}
