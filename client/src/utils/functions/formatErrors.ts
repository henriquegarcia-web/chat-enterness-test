export const throwSignupError = (response: number) => {
  switch (response) {
    case 400:
      return 'Usuário já cadastrado'
    case 500:
      return 'Erro ao processar a solicitação de cadastro'

    default:
      return 'Erro interno no servidor'
  }
}

export const throwSigninError = (response: number) => {
  switch (response) {
    case 401:
      return 'Usuário não registrado'
    case 404:
      return 'Senha incorreta'
    case 500:
      return 'Erro ao processar a solicitação de login'

    default:
      return 'Erro interno no servidor'
  }
}
