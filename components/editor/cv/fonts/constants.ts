const SANS_SERIF_FONT_FAMILIES = ["Arial", "Roboto"]

const SERIF_FONT_FAMILIES = ["Cambria", "Lora"]

export const FONT_FAMILIES = [
  ...SANS_SERIF_FONT_FAMILIES,
  ...SERIF_FONT_FAMILIES,
]

export type FontFamily = (typeof FONT_FAMILIES)[number]

export const FONT_FAMILY_TO_STANDARD_SIZE_IN_PT: Record<FontFamily, number> = {
  Cambria: 11,
  Lora: 11,
  Arial: 12,
  Roboto: 12,
}

export const FONT_FAMILY_TO_DISPLAY_NAME: Record<FontFamily, string> = {
  Cambria: "Cambria",
  Roboto: "Roboto",
  Arial: "Arial",
  Lora: "Lora",
}

export const getAllFontFamiliesToLoad = () => {
  return [...FONT_FAMILIES]
}
