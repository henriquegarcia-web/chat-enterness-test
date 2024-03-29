# Realtime Chat - SERVIDOR

## Instalação e Uso

### Configuração do Banco de Dados MySQL com XAMPP

1. Inicie o XAMPP:

   > Certifique-se de que o XAMPP esteja instalado e em execução. Inicie o Apache e o MySQL no painel de controle do XAMPP.

2. Acesse o phpMyAdmin:

   > Abra o navegador da web e acesse o phpMyAdmin. O endereço padrão costuma ser http://localhost/phpmyadmin.

3. Criação do Banco de Dados:

   > No phpMyAdmin, clique em "Banco de dados" no menu superior e crie um novo banco de dados com o nome `chat_enterness_test`.

### Configuração do Projeto

1. Para instalar as dependências do servidor (back-end), navegue até a pasta "server":

   > Na raiz do projeto: `cd server` e em seguida `npm install` ou `yarn`

2. Crie um arquivo .env na raiz da pasta 'server' com os dados:

   `DB_HOST=localhost` <br/>
   `DB_USER=root` <br/>
   `DB_PASSWORD=` <br/>
   `DB_NAME=chat_enterness_test` <br/>
   `SERVER_PORT=5000` <br/>
   `CLIENT_PORT=5173` <br/>
   `SECRET_TOKEN_KEY=A1B2C3D4E5F6G7H8I9J0`

3. Inicie o servidor de desenvolvimento:

   > Dentro da pasta 'server': `npm run dev` ou `yarn dev`

4. Abra seu navegador da web:

   > Visite `http://localhost:5000` para visualizar o servidor.
