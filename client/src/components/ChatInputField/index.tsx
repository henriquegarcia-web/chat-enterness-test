import { useState } from 'react'

import { Send, Loader2 } from 'lucide-react'

import { InputField } from '@/components'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { useChat } from '@/contexts/ChatContext'

import { ISubmitMessageForm } from '@/@types/api'

const submitMessageSchema = Yup.object().shape({
  message: Yup.string()
    .required()
    .max(255, 'A mensagem não pode ter mais de 255 dígitos')
})

interface IChatInputField {}

const ChatInputField = ({}: IChatInputField) => {
  const { toast } = useToast()
  const { handleSendMessage, currentRoom } = useChat()

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
      const response = await handleSendMessage(data.message)

      if (response) {
        reset()
      }
    } catch (error) {
      toast({
        title: 'Falha',
        description: 'Falha ao enviar a mensagem'
      })
    } finally {
      setSubmitMessageIsLoading(false)
    }
  }

  return (
    <form
      className="flex w-full items-center space-x-2"
      onSubmit={handleSubmit(handleSubmitMessage)}
    >
      <InputField
        id="message"
        placeholder="Digite sua mensagem ..."
        withoutErrors
        autoComplete={false}
        withoutFocus
        withEmojiPicker
        disabled={!currentRoom}
        control={control}
      />
      <Button
        type="submit"
        variant="outline"
        size="icon"
        disabled={!isValid || submitMessageIsLoading || !currentRoom}
      >
        {submitMessageIsLoading ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="h-5 w-5" />
        )}
      </Button>
    </form>
  )
}

export default ChatInputField
