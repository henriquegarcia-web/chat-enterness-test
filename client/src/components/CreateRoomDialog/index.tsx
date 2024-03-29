import { useState } from 'react'

import { Dialog, InputField } from '@/components'
import { useToast } from '@/components/ui/use-toast'

import { useChat } from '@/contexts/ChatContext'

import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { ICreateRoomForm } from '@/@types/api'

const createRoomSchema = Yup.object().shape({
  roomName: Yup.string()
    .required()
    .max(20, 'O nome não pode ter mais de 20 dígitos')
  // roomId: Yup.string()
  //   .required()
  //   .max(10, 'O id não pode ter mais de 10 dígitos')
})

interface ICreateRoomDialog {}

const CreateRoomDialog = ({}: ICreateRoomDialog) => {
  const { toast } = useToast()
  const { handleCreateRoom } = useChat()

  const [createRoomIsLoading, setCreateRoomIsLoading] = useState(false)

  const { control, handleSubmit, reset, formState } = useForm<ICreateRoomForm>({
    defaultValues: {
      roomName: ''
      // roomId: ''
    },
    mode: 'onChange',
    resolver: yupResolver(createRoomSchema)
  })

  const { isValid } = formState

  const handleCreateRoomForm = async (data: ICreateRoomForm) => {
    setCreateRoomIsLoading(true)

    try {
      const response = await handleCreateRoom({
        roomName: data.roomName
      })

      console.log(response)
      // const response = true

      // if (response) {
      //   // window.location.reload()
      //   reset()
      // }

      // toast({
      //   title: response.success ? 'Sucesso' : 'Falha',
      //   description: response.msg
      // })
    } catch (error) {
      // const customError = error as ICustomErrorAuthForm
      // toast({
      //   title: 'Falha',
      //   description: customError.message
      // })
    } finally {
      setCreateRoomIsLoading(false)
    }
  }

  return (
    <Dialog
      title="Criar sala"
      legend="Preencha os dados abaixo para criar uma sala"
      triggerLabel="Criar sala"
      inputLabel="Criar"
      inputDisabled={!isValid || createRoomIsLoading}
      onSubmit={handleSubmit(handleCreateRoomForm)}
    >
      <InputField
        label="Nome da sala"
        id="roomName"
        placeholder="Digite o nome da sala"
        control={control}
      />
      {/* <InputField
        label="ID da sala"
        id="roomId"
        placeholder="Digite o ID da sala"
        control={control}
      /> */}
    </Dialog>
  )
}

export default CreateRoomDialog
