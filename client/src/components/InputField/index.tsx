import { ChangeEvent, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { FiEye, FiEyeOff } from 'react-icons/fi'

interface IInputField {
  label?: string
  id: string
  placeholder: string
  error?: FieldError | undefined
  typePassword?: boolean
  value: string
  onChange: (value: ChangeEvent<HTMLInputElement>) => void
}

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const InputField = ({
  label,
  id,
  placeholder,
  error,
  typePassword = false,
  value,
  onChange
}: IInputField) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)

  const tooglePassword = () => setPasswordIsVisible(!passwordIsVisible)

  return (
    <div className="relative flex flex-col space-y-2.5 content-center">
      {!!label && label !== '' && <Label htmlFor={id}>{label}</Label>}
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={passwordIsVisible ? 'text' : 'password'}
      />
      {typePassword && (
        <span className="password-icon" onClick={tooglePassword}>
          {passwordIsVisible ? <FiEyeOff /> : <FiEye />}
        </span>
      )}
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  )
}

export default InputField
