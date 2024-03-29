import { useRef, useState } from 'react'
import { Controller } from 'react-hook-form'

import { FiEye, FiEyeOff } from 'react-icons/fi'
import { SmilePlus } from 'lucide-react'

import EmojiPicker, { EmojiClickData } from 'emoji-picker-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import useClickOutside from '@/hooks/useClickOutside'

interface IInputField {
  control: any
  label?: string
  id: string
  placeholder: string
  disabled?: boolean
  typePassword?: boolean
  withoutErrors?: boolean
  withoutFocus?: boolean
  autoComplete?: boolean
  withEmojiPicker?: boolean
}

const InputField = ({
  control,
  label,
  id,
  placeholder,
  disabled = false,
  typePassword = false,
  withoutErrors = false,
  withoutFocus = false,
  autoComplete = true,
  withEmojiPicker = false
}: IInputField) => {
  const [passwordIsVisible, setPasswordIsVisible] = useState(false)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [emoji, setEmoji] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const emojiContainerRef = useRef<HTMLInputElement>(null)

  const tooglePassword = () => setPasswordIsVisible(!passwordIsVisible)

  const inputType = typePassword
    ? passwordIsVisible
      ? 'text'
      : 'password'
    : 'text'

  const handleEmojiClick = (emojiObject: EmojiClickData) => {
    const { emoji } = emojiObject
    const input = inputRef.current

    if (input && input.value !== undefined) {
      const startPos = input.selectionStart || 0
      const endPos = input.selectionEnd || 0

      const textBefore = input.value.substring(0, startPos)
      const textAfter = input.value.substring(endPos, input.value.length)

      const newValue = textBefore + emoji + textAfter
      setEmoji('')
      if (input) {
        input.value = newValue
        const newCursorPosition = startPos + emoji.length
        input.selectionStart = newCursorPosition
        input.selectionEnd = newCursorPosition
        input.focus()
      }
    }
  }

  useClickOutside({
    active: showEmojiPicker,
    containerRef: emojiContainerRef,
    onClickOutside: () => {
      setShowEmojiPicker(false)
      setEmoji('')
    }
  })

  return (
    <Controller
      name={id}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-1 flex-col space-y-2.5">
          {!!label && label !== '' && <Label htmlFor={id}>{label}</Label>}
          <div className="relative flex items-center space-x-2">
            {withEmojiPicker && (
              <div className="relative">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  disabled={disabled}
                >
                  <SmilePlus className="h-5 w-5" />
                </Button>
                {showEmojiPicker && (
                  <div
                    className="absolute bottom-[100%] mb-2"
                    ref={emojiContainerRef}
                  >
                    <EmojiPicker
                      // @ts-ignore
                      theme="dark"
                      searchDisabled
                      allowExpandReactions={false}
                      onEmojiClick={handleEmojiClick}
                    />
                  </div>
                )}
              </div>
            )}

            <Input
              id={id}
              placeholder={placeholder}
              value={field.value + emoji}
              onChange={field.onChange}
              type={inputType}
              autoComplete={autoComplete ? 'on' : 'off'}
              className={withoutFocus ? 'focus-visible:ring-0' : ''}
              ref={inputRef}
              disabled={disabled}
            />
            {typePassword && (
              <span className="password-icon" onClick={tooglePassword}>
                {passwordIsVisible ? <FiEyeOff /> : <FiEye />}
              </span>
            )}
          </div>
          {error && !withoutErrors && (
            <span className="text-xs text-red-500">{error.message}</span>
          )}
        </div>
      )}
    />
  )
}

export default InputField
