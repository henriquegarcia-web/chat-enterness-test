interface INotSelectedChat {}

const NotSelectedChat = ({}: INotSelectedChat) => {
  return (
    <div className="flex flex-col items-center gap-1 text-center">
      <h3 className="text-2xl font-bold tracking-tight">Inicie uma Conversa</h3>
      <p className="text-sm text-muted-foreground">
        Escolha uma das salas disponíveis para começar a conversar.
      </p>
    </div>
  )
}

export default NotSelectedChat
