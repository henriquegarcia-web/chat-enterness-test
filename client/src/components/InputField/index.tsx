import { ChangeEvent, useState } from 'react'
import { Controller, FieldError } from 'react-hook-form'

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
      rules={{
        required: 'Este campo é obrigatório'
      }}
      render={({ field, fieldState: { error } }) => (
        <div className="relative flex flex-col space-y-2.5 content-center">
          {!!label && label !== '' && <Label htmlFor={id}>{label}</Label>}
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
          {error && <span className="text-red-500">{error.message}</span>}
        </div>
        //   <InputField
        //     label="Usuário"
        //     id="userNick"
        //     placeholder="Digite seu ID de usuário"
        //     error={error}
        //     value={field.value}
        //     onChange={field.onChange}
        //   />
      )}
    />
  )
}

export default InputField
