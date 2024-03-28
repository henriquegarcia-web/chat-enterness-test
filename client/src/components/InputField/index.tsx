import { FieldError } from 'react-hook-form'

interface IInputField {
  label?: string
  id: string
  placeholder: string
  error?: FieldError | undefined
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputField = ({
  label,
  id,
  placeholder,
  error,
  ...props
}: IInputField) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {!!label && label !== '' && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} placeholder={placeholder} {...props} />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export default InputField
