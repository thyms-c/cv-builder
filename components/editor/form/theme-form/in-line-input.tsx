import { Label } from "@radix-ui/react-dropdown-menu"
import { Input } from "../../../ui/input"

interface InputProps<K extends string, V extends string> {
  label: string
  labelClassName?: string
  name: K
  value?: V
  placeholder: string
  inputStyle?: React.CSSProperties
  onChange: (name: K, value: V) => void
}

export const InlineInput = <K extends string>({
  label,
  labelClassName,
  name,
  value = "",
  placeholder,
  inputStyle = {},
  onChange,
}: InputProps<K, string>) => {
  return (
    <Label
      className={`flex items-center gap-2 text-base font-medium ${labelClassName}`}
    >
      <span className="w-28">{label}</span>
      <Input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-[5rem] text-center h-8"
        style={inputStyle}
      />
    </Label>
  )
}
