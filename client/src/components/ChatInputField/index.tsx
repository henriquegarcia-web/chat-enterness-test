import { useState } from 'react'

import { SmilePlus, Send } from 'lucide-react'

import { InputField } from '@/components'
import { Button } from '@/components/ui/button'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { ISubmitMessageForm } from '@/@types/api'

const submitMessageSchema = Yup.object().shape({
  message: Yup.string()
    .required()
    .max(255, 'A mensagem não pode ter mais de 255 dígitos')
})

interface IChatInputField {}

const ChatInputField = ({}: IChatInputField) => {
  const [submitMessageIsLoading, setSubmitMessageIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } =
    useForm<ISubmitMessageForm>({
      defaultValues: {
        message: ''
      },
      mode: 'onChange',
      resolver: yupResolver(submitMessageSchema)
    })

  const { isValid } = formState

  const handleSubmitMessage = async (data: ISubmitMessageForm) => {
    setSubmitMessageIsLoading(true)

    try {
      // const response = await handleSubmitMessage(data)
      const response = true

      if (response) {
        reset()
      }

      // toast({
      //   title: response.success ? 'Sucesso' : 'Falha',
      //   description: response.msg
      // })
    } catch (error) {
      // toast({
      //   title: 'Falha',
      //   description: customError.message
      // })
    } finally {
      setSubmitMessageIsLoading(false)
    }
  }

  return (
    <div className="flex w-full items-center space-x-2">
      <Button variant="outline" size="icon">
        <SmilePlus className="h-5 w-5" />
      </Button>
      <InputField
        id="userName"
        placeholder="Digite sua mensagem ..."
        control={control}
      />
      <Button variant="outline" size="icon">
        <Send className="h-5 w-5" />
      </Button>
    </div>
  )
}

export default ChatInputField
