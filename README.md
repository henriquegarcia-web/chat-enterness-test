# Realtime Chat | Teste Técnico ENTERness

> Desenvolvido por: **[Henrique Garcia](https://www.linkedin.com/in/henrique-garcia-dev/)** <br/>
> Empresa: **[ENTERness](https://www.enterness.com/site/)** <br/>
> Data de início: **28/03/2024** <br/>
> Data de término: **29/03/2024**

## Overview

**Acesse a aplicação [clicando aqui]()**

RealtimeChat é uma aplicação web que oferece funcionalidades de chat em tempo real. Desenvolvida utilizando React.js, Node.js, Socket.io e MySQL, permite aos usuários realizar cadastro, login, criar salas de conversa e interagir instantaneamente com outros participantes. Com foco na eficiência e simplicidade, o RealtimeChat proporciona uma experiência de comunicação em tempo real de forma direta e intuitiva.

## Funcionalidades

- Cadastro e Login de usuários.
- Criação de salas de chat.
- Chat em tempo real entre usuários na mesma sala.
- Navegação por salas de chat existentes.
- Design responsivo para uma experiência do usuário consistente em dispositivos variados.
- Funcionalidade de busca de salas de chat por nome.
- Indicadores visuais de status de conexão e atividade do usuário.
- Loaders durante o processo de autenticação e carregamento de salas de chat.

## Tecnologias e Bibliotecas Utilizadas

- React
- TypeScript
- Shadcn/UI
- React Hook Form
- React Icons
- Axios
- Node.js
- Socket.io
- MySQL

## Instalação e Uso

1. Clone o repositório:

   `git clone https://github.com/henriquegarcia-web/chat-enterness-test.git`

2. Navegue até o diretório do projeto:

   `cd chat-enterness-test`

3. Demais configurações estão indicadas nos READMEs das pastas 'client' e 'server'.

## Agradecimentos

- Agradecimento especial à empresa [ENTERness](https://www.enterness.com/site/) por disponibilizar o teste.

## Bugs Identificados

- Ao inserir um emoji, se não houver um texto após o emoji, ele é excluído ao fechar o modal do EmojiPicker.
- Responsividade da listagem de salas não foi 100% estruturada.
