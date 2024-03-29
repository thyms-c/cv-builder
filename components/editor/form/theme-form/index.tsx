import { Cog6ToothIcon } from "@heroicons/react/24/outline"
import { useAppDispatch, useAppSelector } from "../../../../lib/redux/hooks"
import {
  DEFAULT_THEME_COLOR,
  GeneralSetting,
  changeSettings,
  selectSettings,
} from "../../../../lib/redux/settings-slice"
import { FontFamily } from "../../cv/fonts/constants"
import { BaseForm } from "../container-form"
import { InputGroupWrapper } from "../container-form/input-group"
import { THEME_COLORS } from "./constants"
import { InlineInput } from "./in-line-input"
import {
  DocumentSizeSelections,
  FontFamilySelectionCSR,
  FontSizeSelections,
} from "./selection"

export const ThemeForm = () => {
  const settings = useAppSelector(selectSettings)
  const { fontSize, fontFamily, documentSize } = settings
  const themeColor = settings.themeColor || DEFAULT_THEME_COLOR
  const themeWhite = "#ffffff"
  const themeBlack = "#000000"
  const dispatch = useAppDispatch()

  const handleSettingsChange = (field: GeneralSetting, value: string) => {
    dispatch(changeSettings({ field, value }))
  }

  return (
    <BaseForm>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Cog6ToothIcon
            className="h-6 w-6 text-gray-600"
            aria-hidden="true"
          />
          <label className="font-semibold">Resume Setting</label>
        </div>
        <div>
          <InlineInput
            label="Theme Color"
            name="themeColor"
            value={settings.themeColor}
            placeholder={DEFAULT_THEME_COLOR}
            onChange={handleSettingsChange}
            // inputStyle={{ color: themeBlack }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {THEME_COLORS.map((color, idx) => (
              <div
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-sm text-white"
                style={{ backgroundColor: color }}
                key={idx}
                onClick={() => handleSettingsChange("themeColor", color)}
                onKeyDown={(e) => {
                  if (["Enter", " "].includes(e.key)) {
                    handleSettingsChange("themeColor", color)
                  }
                }}
                tabIndex={0}
              >
                {settings.themeColor === color ? "$" : ""}
              </div>
            ))}
          </div>
        </div>
        <div>
          <InputGroupWrapper label="Font Family" />
          <FontFamilySelectionCSR
            selectedFontFamily={fontFamily}
            themeColor={themeBlack}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InlineInput
            label="Font Size (pt)"
            name="fontSize"
            value={fontSize}
            placeholder="11"
            onChange={handleSettingsChange}
          />
          <FontSizeSelections
            fontFamily={fontFamily as FontFamily}
            themeColor={themeBlack}
            selectedFontSize={fontSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
        <div>
          <InputGroupWrapper label="Document Size" />
          <DocumentSizeSelections
            themeColor={themeBlack}
            selectedDocumentSize={documentSize}
            handleSettingsChange={handleSettingsChange}
          />
        </div>
      </div>
    </BaseForm>
  )
}
