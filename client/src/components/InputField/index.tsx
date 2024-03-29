import { useState } from 'react'
import { Controller } from 'react-hook-form'

import { FiEye, FiEyeOff } from 'react-icons/fi'

interface IInputField {
  control: any
  label?: string
  id: string
  placeholder: string
  typePassword?: boolean
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputField = ({
  control,
  label,
  id,
  placeholder,
  typePassword = false
}: IInputField) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const tooglePassword = () => setPasswordIsVisible(!passwordIsVisible)

  const inputType = typePassword
    ? passwordIsVisible
      ? 'text'
      : 'password'
    : 'text'

  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-1 flex-col space-y-2.5">
          {!!label && label !== '' && <Label htmlFor={id}>{label}</Label>}
          <div className="relative flex items-center">
            <Input
              id={id}
              placeholder={placeholder}
              value={field.value}
              onChange={field.onChange}
              type={inputType}
            />
            {typePassword && (
              <span className="password-icon" onClick={tooglePassword}>
                {passwordIsVisible ? <FiEyeOff /> : <FiEye />}
              </span>
            )}
          </div>
          {error && (
            <span className="text-xs text-red-500">{error.message}</span>
          )}
        </div>
      )}
    />
  )
}

export default InputField
